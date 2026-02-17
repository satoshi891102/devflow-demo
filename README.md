# DevFlow — AI DevOps Team for GitLab

> Four specialized AI agents that work together as a virtual DevOps team on GitLab's Duo Agent Platform.

**Built for the [GitLab AI Hackathon 2026](https://gitlab.devpost.com/)**

## 🤖 The Team

| Agent | Role | Trigger |
|-------|------|---------|
| **Sentinel** | Pipeline Guardian | Pipeline failures, security scan alerts |
| **Triage** | Issue Manager | New issues, triage requests |
| **Reviewer** | Code Quality | New MRs, review assignments |
| **Scribe** | Documentation | Merged MRs, doc audit requests |

## 🔄 How It Works

DevFlow orchestrates agents via a custom YAML flow:

```
Pipeline Fails → Triage (categorize) → Sentinel (fix) → Reviewer (verify) → Scribe (document)
```

Each agent has specialized tools and prompts. They pass context to each other automatically.

## 🏆 Target Prizes

- **Anthropic Grand Prize** — $10,000
- **Grand Prize** — $15,000
- **Most Impactful** — $5,000

## 📂 Project Structure

```
devflow/
├── agents/          # Agent system prompts
├── flow.yaml        # Orchestration flow definition
├── demo-app/        # Sample app for demonstrations
├── src/             # Showcase site (Next.js)
└── docs/            # Architecture & scenarios
```

## 🚀 Showcase Site

Visit [devflow-demo-mu.vercel.app](https://devflow-demo-mu.vercel.app) for the interactive showcase.

## Tech Stack

- **Platform:** GitLab Duo Agent Platform
- **AI Model:** Anthropic Claude
- **Orchestration:** Custom YAML Flows
- **Triggers:** GitLab CI/CD Events

## License

MIT
