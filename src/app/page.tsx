'use client';

import { useState } from 'react';
import {
  Shield, GitBranch, MessageSquare, FileText, Zap, ArrowRight,
  CheckCircle2, AlertTriangle, Terminal, Code2, Eye, Bot,
  ChevronDown, ExternalLink, Github, Cpu, Workflow, Clock,
  Target, Award, Sparkles, ArrowDown
} from 'lucide-react';

/* ─── Agent Data ─── */
const agents = [
  {
    id: 'sentinel',
    name: 'Sentinel',
    role: 'Pipeline Guardian',
    colorClass: 'agent-sentinel',
    icon: Shield,
    description: 'Monitors CI/CD pipelines, diagnoses failures, and auto-generates fix merge requests.',
    triggers: ['Pipeline failure', 'Security scan alert', '@sentinel mention'],
    capabilities: [
      'Reads job logs and identifies root cause',
      'Searches codebase for relevant files',
      'Generates targeted fixes',
      'Creates branches, commits, and MRs',
      'Reports findings as issue comments',
    ],
    example: {
      trigger: 'Pipeline #1847 failed — test_auth.py::test_login_redirect',
      action: 'Sentinel reads logs → finds assertion error on redirect URL → patches test fixture → opens MR sentinel/fix-auth-redirect',
    },
  },
  {
    id: 'triage',
    name: 'Triage',
    role: 'Issue Manager',
    colorClass: 'agent-triage',
    icon: Target,
    description: 'Categorizes, labels, estimates, and prioritizes incoming issues automatically.',
    triggers: ['New issue created', '@triage mention', 'Bulk triage request'],
    capabilities: [
      'Analyzes issue title and description',
      'Checks for duplicate issues',
      'Labels by type: bug, feature, security, docs',
      'Sets priority P0–P3 and complexity XS–XL',
      'Suggests assignee based on file ownership',
    ],
    example: {
      trigger: 'New issue: "Login page crashes on Safari 17"',
      action: 'Triage reads issue → labels bug, browser-compat, P1 → estimates M → checks for dupes → assigns frontend team → posts structured analysis',
    },
  },
  {
    id: 'reviewer',
    name: 'Reviewer',
    role: 'Code Quality',
    colorClass: 'agent-reviewer',
    icon: Eye,
    description: 'Reviews merge requests for security vulnerabilities, performance, and code quality.',
    triggers: ['MR created', '@reviewer mention', 'Assigned as reviewer'],
    capabilities: [
      'Analyzes every file in the diff',
      'Detects security vulnerabilities',
      'Identifies performance regressions',
      'Checks error handling and edge cases',
      'Posts line-specific review comments',
    ],
    example: {
      trigger: 'MR !234: "Add user search endpoint"',
      action: 'Reviewer reads diff → finds SQL injection in search query → flags missing rate limiting → suggests parameterized query → requests changes',
    },
  },
  {
    id: 'scribe',
    name: 'Scribe',
    role: 'Documentation',
    colorClass: 'agent-scribe',
    icon: FileText,
    description: 'Maintains project documentation by analyzing merged changes and updating docs.',
    triggers: ['MR merged', '@scribe mention', 'Documentation audit'],
    capabilities: [
      'Analyzes merged MR diffs',
      'Updates README, API docs, changelogs',
      'Follows existing documentation style',
      'Creates doc update MRs automatically',
      'Generates architecture documentation',
    ],
    example: {
      trigger: 'MR !234 merged: new /api/search endpoint',
      action: 'Scribe reads diff → updates API docs with new endpoint → adds changelog entry → opens MR scribe/update-search-docs',
    },
  },
];

/* ─── Flow Steps ─── */
const flowSteps = [
  { agent: 'Triage', colorClass: 'agent-triage', action: 'Analyzes the event, categorizes, sets priority', icon: Target },
  { agent: 'Sentinel', colorClass: 'agent-sentinel', action: 'Diagnoses root cause, generates fix, opens MR', icon: Shield },
  { agent: 'Reviewer', colorClass: 'agent-reviewer', action: 'Reviews the fix for quality & security', icon: Eye },
  { agent: 'Scribe', colorClass: 'agent-scribe', action: 'Updates documentation, changelog', icon: FileText },
];

/* ─── Nav ─── */
function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center">
            <Workflow className="w-4 h-4 text-[#818cf8]" />
          </div>
          <span className="font-semibold text-lg">DevFlow</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#a1a1aa]">
          <a href="#agents" className="hover:text-[#fafafa] transition-colors">Agents</a>
          <a href="#flow" className="hover:text-[#fafafa] transition-colors">Flow</a>
          <a href="#architecture" className="hover:text-[#fafafa] transition-colors">Architecture</a>
          <a href="#demo" className="hover:text-[#fafafa] transition-colors">Demo</a>
        </div>
        <a
          href="https://gitlab.devpost.com/"
          target="_blank"
          rel="noopener"
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg transition-colors"
        >
          Hackathon <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366f1]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative">
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 text-sm text-[#818cf8]">
            <Award className="w-4 h-4" />
            GitLab AI Hackathon 2026
          </div>
        </div>

        <h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Your AI
          <br />
          <span className="gradient-text">DevOps Team</span>
        </h1>

        <p className="text-center text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-12">
          Four specialized agents that work together as a virtual DevOps team.
          They don&apos;t just chat — they react to GitLab events and take autonomous action.
        </p>

        {/* Agent pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f97316]/10 border border-[#f97316]/20">
            <Shield className="w-4 h-4 text-[#f97316]" />
            <span className="text-sm font-medium text-[#f97316]">Sentinel</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/20">
            <Target className="w-4 h-4 text-[#06b6d4]" />
            <span className="text-sm font-medium text-[#06b6d4]">Triage</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20">
            <Eye className="w-4 h-4 text-[#a855f7]" />
            <span className="text-sm font-medium text-[#a855f7]">Reviewer</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20">
            <FileText className="w-4 h-4 text-[#22c55e]" />
            <span className="text-sm font-medium text-[#22c55e]">Scribe</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#agents"
            className="px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            Explore Agents <ArrowDown className="w-4 h-4" />
          </a>
          <a
            href="/scenarios"
            className="px-6 py-3 bg-[#18181b] hover:bg-[#27272a] border border-[#27272a] rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" /> View Scenarios
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Custom Agents', value: '4', icon: Bot },
            { label: 'Orchestration Flow', value: '1', icon: Workflow },
            { label: 'GitLab Tools', value: '15+', icon: Code2 },
            { label: 'Autonomous Actions', value: '∞', icon: Zap },
          ].map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-[#18181b]/50 border border-[#27272a]">
              <s.icon className="w-5 h-5 text-[#818cf8] mx-auto mb-2" />
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-[#71717a] mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Agent colors map ─── */
const agentColors: Record<string, { bg: string; bgActive: string; border: string; borderActive: string; text: string; glow: string }> = {
  sentinel: {
    bg: 'bg-[#f97316]/10',
    bgActive: 'bg-[#f97316]/15',
    border: 'border-[#f97316]/20',
    borderActive: 'border-[#f97316]/30',
    text: 'text-[#f97316]',
    glow: 'shadow-[0_0_20px_rgba(249,115,22,0.15)]',
  },
  triage: {
    bg: 'bg-[#06b6d4]/10',
    bgActive: 'bg-[#06b6d4]/15',
    border: 'border-[#06b6d4]/20',
    borderActive: 'border-[#06b6d4]/30',
    text: 'text-[#06b6d4]',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  },
  reviewer: {
    bg: 'bg-[#a855f7]/10',
    bgActive: 'bg-[#a855f7]/15',
    border: 'border-[#a855f7]/20',
    borderActive: 'border-[#a855f7]/30',
    text: 'text-[#a855f7]',
    glow: 'shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  },
  scribe: {
    bg: 'bg-[#22c55e]/10',
    bgActive: 'bg-[#22c55e]/15',
    border: 'border-[#22c55e]/20',
    borderActive: 'border-[#22c55e]/30',
    text: 'text-[#22c55e]',
    glow: 'shadow-[0_0_20px_rgba(34,197,94,0.15)]',
  },
};

/* ─── Agents Section ─── */
function AgentsSection() {
  const [active, setActive] = useState(0);
  const agent = agents[active];
  const c = agentColors[agent.id];

  return (
    <section id="agents" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet the Team</h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            Each agent is a specialist. Together, they cover the entire software development lifecycle.
          </p>
        </div>

        {/* Agent selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {agents.map((a, i) => {
            const ac = agentColors[a.id];
            const isActive = active === i;
            return (
              <button
                key={a.id}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  isActive
                    ? `${ac.bgActive} ${ac.borderActive} ${ac.text} ${ac.glow}`
                    : 'bg-[#18181b] border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46]'
                }`}
              >
                <a.icon className="w-4 h-4" />
                {a.name}
              </button>
            );
          })}
        </div>

        {/* Agent detail card */}
        <div className={`rounded-2xl border ${c.border} bg-[#18181b] overflow-hidden`}>
          <div className="p-8 sm:p-10">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
                <agent.icon className={`w-6 h-6 ${c.text}`} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{agent.name}</h3>
                <p className={`text-sm ${c.text}`}>{agent.role}</p>
              </div>
            </div>

            <p className="text-[#a1a1aa] text-lg mb-8">{agent.description}</p>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-[#71717a] uppercase tracking-wider mb-3">Triggers</h4>
                <div className="space-y-2">
                  {agent.triggers.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-sm">
                      <Zap className={`w-3.5 h-3.5 ${c.text}`} />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#71717a] uppercase tracking-wider mb-3">Capabilities</h4>
                <div className="space-y-2">
                  {agent.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${c.text} mt-0.5 shrink-0`} />
                      <span className="text-[#a1a1aa]">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="mt-8 p-5 rounded-xl bg-[#09090b]/50 border border-[#27272a]">
              <h4 className="text-sm font-semibold text-[#71717a] uppercase tracking-wider mb-3">Example Scenario</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#eab308] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-[#71717a]">Trigger</span>
                    <p className="text-sm">{agent.example.trigger}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs text-[#71717a]">Action</span>
                    <p className="text-sm text-[#a1a1aa]">{agent.example.action}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Flow Section ─── */
function FlowSection() {
  return (
    <section id="flow" className="py-24 bg-[#18181b]/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Orchestration Flow</h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            Agents chain together autonomously. One event triggers a full DevOps workflow.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Trigger */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20">
              <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
              <span className="font-medium">Pipeline #1847 Failed</span>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="w-px h-8 bg-[#27272a]" />
          </div>
          <div className="flex justify-center mb-8">
            <ArrowDown className="w-5 h-5 text-[#71717a]" />
          </div>

          {/* Flow steps */}
          <div className="space-y-4">
            {flowSteps.map((step, i) => {
              const sc = agentColors[step.agent.toLowerCase()];
              return (
                <div key={step.agent}>
                  <div className={`flex items-center gap-4 p-5 rounded-xl bg-[#18181b] border ${sc.border} hover:${sc.borderActive} transition-colors`}>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className={`w-8 h-8 rounded-lg ${sc.bg} flex items-center justify-center text-sm font-bold ${sc.text}`}>
                        {i + 1}
                      </div>
                      <step.icon className={`w-5 h-5 ${sc.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-sm font-semibold ${sc.text}`}>{step.agent}</span>
                      <p className="text-sm text-[#a1a1aa]">{step.action}</p>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-[#71717a] shrink-0 hidden sm:block" />
                    )}
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="w-px h-4 bg-[#27272a]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Result */}
          <div className="flex justify-center mt-8 mb-4">
            <div className="w-px h-8 bg-[#27272a]" />
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20">
              <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
              <span className="font-medium text-[#22c55e]">Pipeline Fixed, Docs Updated</span>
            </div>
          </div>
        </div>

        {/* Flow YAML preview */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#818cf8]" />
            flow.yaml
          </h3>
          <div className="code-block text-xs sm:text-sm">
            <pre className="text-[#a1a1aa]">{`version: "v1"
environment: ambient

components:
  - name: "triage_analysis"
    type: AgentComponent
    prompt_id: "triage_prompt"
    inputs:
      - from: "context:goal"
      - from: "context:project_id"
    toolset:
      - "get_issue"
      - "list_issues"
      - "update_issue"

  - name: "sentinel_fix"
    type: AgentComponent
    prompt_id: "sentinel_prompt"
    inputs:
      - from: "triage_analysis:output"
    toolset:
      - "get_pipeline"
      - "get_pipeline_jobs"
      - "create_merge_request"

  - name: "review_fix"
    type: AgentComponent
    prompt_id: "reviewer_prompt"
    inputs:
      - from: "sentinel_fix:output"
    toolset:
      - "get_merge_request_changes"
      - "create_merge_request_note"

  - name: "update_docs"
    type: AgentComponent
    prompt_id: "scribe_prompt"
    inputs:
      - from: "sentinel_fix:output"
      - from: "review_fix:output"
    toolset:
      - "get_repository_file"
      - "create_commit"
      - "create_merge_request"`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Architecture Section ─── */
function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Architecture</h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            Built on GitLab Duo Agent Platform with Claude as the reasoning engine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Event-Driven',
              icon: Zap,
              description: 'Agents react to real GitLab events — pipeline failures, new issues, MR creation — not just chat messages.',
              details: ['Pipeline webhooks', 'Issue events', 'MR lifecycle', '@mention triggers'],
            },
            {
              title: 'Multi-Agent Orchestration',
              icon: Workflow,
              description: 'Custom YAML flows chain agents together. Output from one agent becomes input for the next.',
              details: ['Sequential pipelines', 'Context passing', 'Conditional routing', 'Error handling'],
            },
            {
              title: 'Anthropic Claude',
              icon: Cpu,
              description: 'Every agent powered by Claude for nuanced code understanding, multi-step reasoning, and structured output.',
              details: ['Code analysis', 'Security detection', 'Natural language', 'Tool orchestration'],
            },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-[#6366f1]/20 transition-colors group">
              <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <item.icon className="w-5 h-5 text-[#818cf8]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-[#a1a1aa] text-sm mb-4">{item.description}</p>
              <ul className="space-y-1.5">
                {item.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs text-[#71717a]">
                    <div className="w-1 h-1 rounded-full bg-[#6366f1]" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="mt-12 p-6 rounded-2xl bg-[#18181b] border border-[#27272a]">
          <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'GitLab Duo', desc: 'Agent Platform' },
              { name: 'Anthropic Claude', desc: 'AI Reasoning' },
              { name: 'YAML Flows', desc: 'Orchestration' },
              { name: 'GitLab CI/CD', desc: 'Event Triggers' },
            ].map((t) => (
              <div key={t.name} className="p-3 rounded-xl bg-[#09090b]/50 border border-[#27272a] text-center">
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-[#71717a]">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Demo Section ─── */
function DemoSection() {
  return (
    <section id="demo" className="py-24 bg-[#18181b]/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">See It In Action</h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            A complete end-to-end scenario: pipeline breaks → agents fix it → code reviewed → docs updated.
          </p>
        </div>

        {/* Terminal demo */}
        <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#27272a] shadow-[0_0_20px_rgba(99,102,241,0.15),0_0_60px_rgba(99,102,241,0.05)]">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
              <div className="w-3 h-3 rounded-full bg-[#eab308]/60" />
              <div className="w-3 h-3 rounded-full bg-[#22c55e]/60" />
            </div>
            <span className="text-xs text-[#71717a] font-mono ml-2">devflow — gitlab events</span>
          </div>

          <div className="p-6 bg-[#09090b] font-mono text-sm space-y-3">
            <div>
              <span className="text-[#ef4444]">✗</span>{' '}
              <span className="text-[#71717a]">[14:23:01]</span>{' '}
              Pipeline <span className="text-[#818cf8]">#1847</span> failed on{' '}
              <span className="text-[#eab308]">main</span>
            </div>
            <div className="text-[#71717a]">  └─ Job: test_auth • Stage: test • Exit code: 1</div>

            <div className="h-px bg-[#27272a] my-4" />

            <div>
              <span className="text-[#06b6d4]">◆</span>{' '}
              <span className="text-[#71717a]">[14:23:03]</span>{' '}
              <span className="text-[#06b6d4] font-semibold">Triage</span>{' '}
              analyzing event...
            </div>
            <div className="text-[#71717a] pl-4">
              Type: test_failure • Priority: P1 • Complexity: S
              <br />
              Root: assertion error in test_login_redirect
            </div>

            <div className="h-px bg-[#27272a] my-4" />

            <div>
              <span className="text-[#f97316]">◆</span>{' '}
              <span className="text-[#71717a]">[14:23:08]</span>{' '}
              <span className="text-[#f97316] font-semibold">Sentinel</span>{' '}
              diagnosing failure...
            </div>
            <div className="text-[#71717a] pl-4">
              Reading job logs → Found redirect URL mismatch
              <br />
              Fix: Update test fixture redirect_uri
              <br />
              → Branch: <span className="text-[#818cf8]">sentinel/fix-auth-redirect</span>
              <br />
              → MR: <span className="text-[#818cf8]">!892</span> opened
            </div>

            <div className="h-px bg-[#27272a] my-4" />

            <div>
              <span className="text-[#a855f7]">◆</span>{' '}
              <span className="text-[#71717a]">[14:23:15]</span>{' '}
              <span className="text-[#a855f7] font-semibold">Reviewer</span>{' '}
              reviewing MR !892...
            </div>
            <div className="text-[#71717a] pl-4">
              ✓ Fix is correct — matches production redirect config
              <br />
              ✓ No security concerns
              <br />
              → <span className="text-[#22c55e]">Approved</span>
            </div>

            <div className="h-px bg-[#27272a] my-4" />

            <div>
              <span className="text-[#22c55e]">◆</span>{' '}
              <span className="text-[#71717a]">[14:23:22]</span>{' '}
              <span className="text-[#22c55e] font-semibold">Scribe</span>{' '}
              updating documentation...
            </div>
            <div className="text-[#71717a] pl-4">
              Updated: CHANGELOG.md, docs/auth.md
              <br />
              → MR: <span className="text-[#818cf8]">!893</span> opened
            </div>

            <div className="h-px bg-[#27272a] my-4" />

            <div>
              <span className="text-[#22c55e]">✓</span>{' '}
              <span className="text-[#71717a]">[14:23:25]</span>{' '}
              Pipeline fixed in <span className="text-[#22c55e] font-semibold">24 seconds</span>
              <span className="cursor-blink ml-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Differentiation Section ─── */
function DifferentiationSection() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why DevFlow Wins</h2>
          <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
            Most hackathon entries build one agent. We built a team.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: 'Multi-Agent vs Single-Agent',
              description: '4 specialized agents working in concert — not one agent trying to do everything.',
              icon: Bot,
            },
            {
              title: 'Flow Orchestration',
              description: 'Agents chain together autonomously via YAML flows. Real pipeline automation.',
              icon: Workflow,
            },
            {
              title: 'Full SDLC Coverage',
              description: 'Triage → Fix → Review → Document. The complete lifecycle, not just one step.',
              icon: GitBranch,
            },
            {
              title: 'Event-Driven, Not Chat-Driven',
              description: 'Reacts to real GitLab events. Your team works while you sleep.',
              icon: Zap,
            },
            {
              title: 'Claude-Native',
              description: 'Deep integration with Anthropic Claude for nuanced code understanding and multi-step reasoning.',
              icon: Sparkles,
            },
            {
              title: 'Production Ready',
              description: 'Not a proof of concept. Handles real codebases with real CI/CD pipelines.',
              icon: CheckCircle2,
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-5 rounded-xl bg-[#18181b] border border-[#27272a]">
              <item.icon className="w-5 h-5 text-[#818cf8] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-[#a1a1aa]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 border-t border-[#27272a]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Workflow className="w-5 h-5 text-[#818cf8]" />
          <span className="font-semibold text-lg">DevFlow</span>
        </div>
        <p className="text-sm text-[#71717a] mb-6">
          Built for the GitLab AI Hackathon 2026 · Powered by Anthropic Claude
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-[#71717a]">
          <a href="https://gitlab.devpost.com/" target="_blank" rel="noopener" className="hover:text-[#fafafa] transition-colors">
            Hackathon
          </a>
          <a href="https://gitlab.com/gitlab-ai-hackathon" target="_blank" rel="noopener" className="hover:text-[#fafafa] transition-colors">
            GitLab Group
          </a>
          <a href="https://about.gitlab.com/gitlab-duo/prompt-library/" target="_blank" rel="noopener" className="hover:text-[#fafafa] transition-colors">
            Prompt Library
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <AgentsSection />
      <FlowSection />
      <ArchitectureSection />
      <DemoSection />
      <DifferentiationSection />
      <Footer />
    </>
  );
}
