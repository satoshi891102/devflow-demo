# DevFlow Demo Video Script (3 min max)

## Shot 1: Hook (0:00 - 0:15)

**Visual:** Split screen — left shows a pipeline failing, right shows a developer's Slack blowing up with notifications.

**Voiceover:**
> "Your pipeline just broke. Your inbox is full. Your sprint is behind. What if your GitLab had a team of AI agents that handled all of this — automatically?"

## Shot 2: Introduce DevFlow (0:15 - 0:30)

**Visual:** DevFlow logo animation → zoom out to show the 4 agents in a connected diagram.

**Voiceover:**
> "Meet DevFlow — four specialized AI agents that work together as your virtual DevOps team. Sentinel fixes pipelines. Triage manages issues. Reviewer checks code quality. Scribe maintains documentation. They don't wait for you to ask — they react to GitLab events and take autonomous action."

## Shot 3: Live Demo — Pipeline Fix (0:30 - 1:30)

**Visual:** Screen recording of GitLab UI

1. Show the failing pipeline (#1847, test stage failing)
2. Show the DevFlow orchestration flow activating
3. **Triage** posts a comment: categorizes as P1, test_failure, estimates S complexity
4. **Sentinel** reads job logs, creates branch `sentinel/fix-auth-redirect`, opens MR !892
5. **Reviewer** reviews the MR, posts approval comment
6. **Scribe** creates documentation update MR !893
7. Show the timeline: all 4 agents acted in under 30 seconds

**Voiceover:**
> "Watch what happens when Pipeline 1847 fails. The DevFlow orchestration kicks in automatically. Triage categorizes the failure as P1. Sentinel reads the job logs, finds the root cause — a redirect URL mismatch — creates a fix branch and opens a merge request. Reviewer validates the fix and approves. Scribe updates the changelog and authentication docs. Total time: 24 seconds. Zero human intervention."

## Shot 4: Live Demo — Security (1:30 - 2:15)

**Visual:** Screen recording showing SAST detection and agent response.

1. SAST scan detects SQL injection in `app.py`
2. **Triage** flags as P0-critical, security, sql-injection
3. **Sentinel** generates parameterized query fix, opens security MR
4. **Reviewer** performs security-focused review
5. **Scribe** creates security advisory in SECURITY.md

**Voiceover:**
> "Security vulnerabilities get the same treatment. When the SAST scan detects a SQL injection, Triage immediately flags it as P0 critical. Sentinel patches the vulnerable query with parameterized inputs. Reviewer validates the fix is complete. Scribe generates a security advisory. Your vulnerability is documented and patched before you finish your coffee."

## Shot 5: The Flow (2:15 - 2:40)

**Visual:** Show the `flow.yaml` file, then animate the data flowing between agents.

**Voiceover:**
> "Under the hood, DevFlow uses GitLab's custom flow YAML to orchestrate agents. Each agent has specialized tools and prompts. Context flows from one agent to the next — Triage's analysis informs Sentinel's fix, Sentinel's changes feed Reviewer's review, and everything flows to Scribe for documentation. It's not four independent bots — it's a coordinated team."

## Shot 6: Closing (2:40 - 3:00)

**Visual:** DevFlow logo with key stats.

**Voiceover:**
> "DevFlow: Four agents. One flow. Your entire DevOps lifecycle — automated. Built for the GitLab AI Hackathon, powered by Anthropic Claude, running on GitLab Duo Agent Platform."

**Text on screen:**
- 4 Custom Agents
- 1 Orchestration Flow  
- 15+ GitLab Tools
- Full SDLC Coverage
- "DevFlow — Your AI DevOps Team"

---

## Production Notes

- Record at 1080p minimum, 4K preferred
- Use GitLab's dark theme for visual consistency
- Keep terminal font size large (16px+) for readability
- Background music: subtle, tech-forward (like Linear's demo videos)
- Voiceover: clear, confident, not rushed
- Captions: yes, for accessibility
