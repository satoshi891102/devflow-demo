# SPEC: DevFlow — AI DevOps Team for GitLab

## Pivot from "Guardian" to "DevFlow"

The hackathon example projects include "Journey 6: Security Sentinel" which is close to our original Guardian concept. To differentiate and maximize winning potential, we're building something broader and more impressive:

**DevFlow** — A multi-agent flow that orchestrates an AI DevOps team through the full software development lifecycle.

## The Problem

Development teams spend 60%+ of their time on non-coding work: triaging issues, writing tests, reviewing code, fixing CI/CD failures, updating docs, and handling security alerts. Each task requires context-switching and cognitive overhead.

## The Solution

DevFlow is a GitLab custom flow that orchestrates 4+ specialized AI agents working together as a virtual DevOps team:

1. **Sentinel Agent** — Monitors pipelines, detects failures, and auto-creates fix MRs
2. **Scribe Agent** — Generates and maintains documentation using Knowledge Graph
3. **Reviewer Agent** — Reviews MRs for quality, security, and best practices
4. **Triage Agent** — Categorizes, labels, and prioritizes incoming issues

These agents don't just respond to chat — they react to GitLab triggers and take autonomous action.

## Why This Wins

### Anthropic Category ($13,500)
- Demonstrates deep Claude reasoning across multiple specialized agents
- Shows Claude's code understanding, analysis, and generation capabilities
- Multi-agent coordination showcases Claude's ability to handle complex workflows

### Grand Prize ($15,000)
- Goes beyond single-agent demos — shows the full power of Agent Platform flows
- Solves real, daily pain for development teams
- Matches their vision: "building a digital teammate for every developer"

### Most Impactful ($5,000)
- Covers the ENTIRE SDLC, not just one niche
- Every GitLab team could benefit immediately

## Target Prizes (Priority Order)
1. **Anthropic Grand Prize** — $10,000
2. **Grand Prize** — $15,000
3. **Most Impactful** — $5,000
4. **Most Technically Impressive** — $5,000

Best case: $25,000+ (Grand + Anthropic Grand)

## Technical Approach

### Custom Agents (4+)
Each agent has:
- Specialized system prompt
- Selected tools appropriate to its role
- Clear trigger conditions

### Custom Flow (1+)
- Orchestrates agents in response to pipeline events
- Demonstrates multi-agent coordination
- E.g., "Pipeline fails → Sentinel diagnoses → creates MR → Reviewer reviews → Scribe updates docs"

### Key Requirements Checklist
- [x] At least one custom public agent ✅ (building 4+)
- [x] At least one custom public flow ✅ (the orchestration)
- [ ] Project in GitLab AI Hackathon group
- [ ] Public, open source licensed
- [ ] Demo video (3 min)
- [ ] Text description

## Timeline (37 days)

| Week | Focus |
|------|-------|
| Week 1 (Feb 16-22) | Access, env setup, first agent (Sentinel) working |
| Week 2 (Feb 23-Mar 1) | Remaining agents, flow orchestration |
| Week 3 (Mar 2-8) | Integration testing, edge cases, polish |
| Week 4 (Mar 9-15) | Documentation, demo video, submission prep |
| Week 5 (Mar 16-22) | Buffer + polish |
| Final (Mar 23-25) | Submit |

## BLOCKER: Need Human Action
- **Fill out access form**: https://forms.gle/EeCH2WWUewK3eGmVA
- **Register on Devpost**: https://gitlab.devpost.com/register
- These require personal account authentication
