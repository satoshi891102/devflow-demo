# Architecture — DevFlow: AI DevOps Team

## Overview

DevFlow is a multi-agent system built on GitLab Duo Agent Platform. It consists of 4 custom agents and 1 orchestration flow that together form an AI DevOps team.

## System Design

```
┌─────────────────────────────────────────────────┐
│                  GitLab Events                   │
│  Pipeline fail │ New issue │ New MR │ @mention   │
└────────┬────────┬─────────┬────────┬────────────┘
         │        │         │        │
         ▼        ▼         ▼        ▼
┌─────────────────────────────────────────────────┐
│          DevFlow Orchestrator (Flow)             │
│  YAML-defined routing + component orchestration  │
└────┬────────┬──────────┬──────────┬─────────────┘
     │        │          │          │
     ▼        ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Sentinel│ │ Triage │ │Reviewer│ │ Scribe │
│ Agent  │ │ Agent  │ │ Agent  │ │ Agent  │
└────────┘ └────────┘ └────────┘ └────────┘
│Fix CI/CD│ │Label,  │ │Review  │ │Generate│
│pipelines│ │assign, │ │code,   │ │docs,   │
│auto-fix │ │priorite│ │security│ │update  │
│create MR│ │estimate│ │suggest │ │README  │
└─────────┘ └────────┘ └────────┘ └────────┘
```

## Component Details

### 1. Sentinel Agent (Pipeline Guardian)
**Trigger:** Pipeline failure, security scan alerts
**Tools:**
- `get_pipeline` — read pipeline status
- `get_pipeline_jobs` — read job details & logs
- `get_repository_file` — read source code
- `find_files` — locate relevant files
- `blob_search` — search codebase
- `create_file` / `create_commit` — write fixes
- `create_merge_request` — submit fix MR
- `create_issue_note` — report findings

**System Prompt Core:**
```
You are Sentinel, a DevOps pipeline specialist. When a pipeline fails:
1. Analyze the failed job logs to identify root cause
2. Categorize: config error, dependency issue, test failure, security alert
3. Search the codebase for the relevant files
4. Generate a fix and create a commit
5. Open a merge request with clear explanation
6. Add a note to the original issue/MR explaining what happened
```

### 2. Triage Agent (Issue Manager)
**Trigger:** New issue created, @triage mention
**Tools:**
- `get_issue` — read issue details
- `list_issues` — check for duplicates
- `update_issue` — add labels, assign, set priority
- `create_issue_note` — comment with analysis
- `blob_search` — search codebase for related code

**System Prompt Core:**
```
You are Triage, an issue management specialist. When a new issue arrives:
1. Analyze the issue title and description
2. Check for duplicate issues
3. Categorize: bug, feature, enhancement, security, documentation
4. Set priority labels: P0 (critical), P1 (high), P2 (medium), P3 (low)
5. Estimate complexity: XS, S, M, L, XL
6. Suggest assignment based on file ownership patterns
7. Add a structured triage comment with your analysis
```

### 3. Reviewer Agent (Code Quality)
**Trigger:** MR created, @reviewer mention, assign as reviewer
**Tools:**
- `get_merge_request` — read MR details
- `get_merge_request_changes` — read diff
- `get_repository_file` — read full files
- `find_files` — locate related files
- `create_merge_request_note` — post review comments
- `blob_search` — search for patterns

**System Prompt Core:**
```
You are Reviewer, a code quality and security specialist. When reviewing an MR:
1. Read the MR description and understand the intent
2. Analyze every changed file in the diff
3. Check for: security vulnerabilities, performance issues, code smells,
   missing error handling, test coverage gaps
4. Post specific, actionable review comments with line references
5. Provide an overall assessment: approve, request changes, or needs discussion
6. Always explain WHY something is an issue, not just what
```

### 4. Scribe Agent (Documentation)
**Trigger:** MR merged, @scribe mention
**Tools:**
- `get_merge_request` — read merged MR
- `get_merge_request_changes` — read what changed
- `get_repository_file` — read existing docs
- `list_repository_tree` — understand project structure
- `create_file` / `create_commit` — update docs
- `create_merge_request` — submit doc update MR

**System Prompt Core:**
```
You are Scribe, a documentation specialist. When code changes are merged:
1. Analyze the merged MR to understand what changed
2. Check if existing documentation needs updating
3. Generate/update: README, API docs, architecture docs, changelogs
4. Follow the project's existing documentation style
5. Create a documentation MR with clear commit messages
```

### 5. DevFlow Orchestrator (Custom Flow)
**Trigger:** @devflow mention, or chained from individual agent completions
**YAML Definition:** See `flow.yaml`

The orchestrator chains agents together for complex scenarios:
- **Pipeline Fix Flow:** Pipeline fails → Sentinel diagnoses → creates fix MR → Reviewer reviews → Scribe updates docs
- **Feature Flow:** Issue created → Triage categorizes → Developer implements → Reviewer reviews → Scribe documents
- **Security Flow:** Security scan alert → Sentinel analyzes → creates remediation MR → Reviewer validates fix

## Tech Stack
- **Platform:** GitLab Duo Agent Platform (Premium/Ultimate)
- **AI Model:** Anthropic Claude (default in hackathon sandbox)
- **Execution:** GitLab Runner (platform compute)
- **Configuration:** YAML flow definitions + system prompts
- **Triggers:** GitLab events (mention, assign, assign_reviewer)

## Project Structure
```
devflow/
├── README.md                  # Project overview & setup
├── LICENSE                    # MIT or Apache 2.0
├── AGENTS.md                  # Project-level agent config
├── docs/
│   ├── architecture.md        # This document
│   ├── agents.md              # Agent detailed descriptions
│   └── demo-script.md         # Demo video script
├── examples/
│   ├── sample-app/            # Sample app to demonstrate agents on
│   │   ├── .gitlab-ci.yml     # CI/CD pipeline (intentional issues for demo)
│   │   ├── src/               # Sample source code
│   │   └── tests/             # Sample tests
│   └── scenarios/             # Demo scenarios
│       ├── pipeline-fix.md
│       ├── issue-triage.md
│       ├── code-review.md
│       └── doc-generation.md
└── screenshots/               # For submission
```

## Differentiation from Example Projects

The hackathon provides "Journey 6: Security Sentinel" as an example. DevFlow differs:

1. **Multi-agent vs single-agent** — 4 specialized agents working in concert
2. **Flow orchestration** — agents chain together autonomously
3. **Full SDLC coverage** — not just security, but triage, review, and docs
4. **Practical daily use** — solves real problems every developer faces
5. **Extensible pattern** — shows how to build an AI team, not just one agent

## Anthropic Prize Strategy

Since all agents in the hackathon sandbox use Anthropic models by default:
- Demonstrate Claude's strengths: nuanced code understanding, multi-step reasoning, structured output
- Show diverse Claude capabilities across 4 different agent roles
- The orchestration flow shows Claude coordinating with itself across agents
- Include detailed analysis of how Claude's capabilities enable each agent's behavior
