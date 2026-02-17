'use client';

import {
  Shield, Target, Eye, FileText, Workflow, ArrowRight,
  AlertTriangle, CheckCircle2, Bug, Lock, GitBranch,
  Terminal, Zap, Clock, ArrowLeft
} from 'lucide-react';

const scenarios = [
  {
    id: 'pipeline-fix',
    title: 'Pipeline Fix Flow',
    description: 'CI pipeline fails → agents diagnose, fix, review, and document — all autonomously.',
    color: '#f97316',
    trigger: 'Pipeline #1847 fails on main branch',
    steps: [
      {
        agent: 'Triage',
        icon: Target,
        color: '#06b6d4',
        action: 'Categorizes as test_failure, sets P1 priority, estimates S complexity',
        output: 'Structured analysis posted as issue comment',
      },
      {
        agent: 'Sentinel',
        icon: Shield,
        color: '#f97316',
        action: 'Reads job logs, finds assertion error in test_login_redirect, identifies redirect URL mismatch',
        output: 'Creates branch sentinel/fix-auth-redirect, commits fix, opens MR !892',
      },
      {
        agent: 'Reviewer',
        icon: Eye,
        color: '#a855f7',
        action: 'Reviews MR diff, validates fix matches production config, checks for security implications',
        output: 'Approves MR with detailed review comment',
      },
      {
        agent: 'Scribe',
        icon: FileText,
        color: '#22c55e',
        action: 'Detects auth configuration change, updates docs/auth.md and CHANGELOG.md',
        output: 'Opens documentation MR !893',
      },
    ],
    outcome: 'Pipeline fixed in 24 seconds. Two MRs ready for human merge. Full audit trail.',
    timeToFix: '24s',
  },
  {
    id: 'security-vuln',
    title: 'Security Vulnerability Response',
    description: 'SAST scan detects SQL injection → agents remediate and verify the fix.',
    color: '#ef4444',
    trigger: 'GitLab SAST detects SQL injection in user_search.py',
    steps: [
      {
        agent: 'Triage',
        icon: Target,
        color: '#06b6d4',
        action: 'Identifies as security/critical, sets P0 priority, flags for immediate action',
        output: 'Labels: security, P0-critical, sql-injection. Assigns security team.',
      },
      {
        agent: 'Sentinel',
        icon: Shield,
        color: '#f97316',
        action: 'Reads SAST report, locates vulnerable f-string query, generates parameterized query fix',
        output: 'Creates branch sentinel/fix-sqli-user-search, opens MR !894',
      },
      {
        agent: 'Reviewer',
        icon: Eye,
        color: '#a855f7',
        action: 'Security-focused review: validates parameterization, checks for other injection vectors, reviews input validation',
        output: 'Approves with security review stamp. Notes additional hardening suggestions.',
      },
      {
        agent: 'Scribe',
        icon: FileText,
        color: '#22c55e',
        action: 'Updates SECURITY.md with vulnerability disclosure, adds to CHANGELOG, updates API security docs',
        output: 'Opens documentation MR !895 with security advisory',
      },
    ],
    outcome: 'Critical vulnerability patched in under 30 seconds. Security advisory documented.',
    timeToFix: '28s',
  },
  {
    id: 'new-feature',
    title: 'Feature Issue Triage',
    description: 'New feature request → analyzed, categorized, estimated, and assigned automatically.',
    color: '#06b6d4',
    trigger: 'Issue #342: "Add bulk export for project data to CSV"',
    steps: [
      {
        agent: 'Triage',
        icon: Target,
        color: '#06b6d4',
        action: 'Analyzes request, categorizes as feature/data-export, checks for duplicates, estimates complexity',
        output: 'Labels: feature, data-export, P2-medium, L-large. No duplicates. Suggests backend team.',
      },
    ],
    outcome: 'Issue fully categorized and ready for sprint planning in 3 seconds.',
    timeToFix: '3s',
  },
  {
    id: 'code-review',
    title: 'Automated Code Review',
    description: 'New MR opened → comprehensive review for quality, security, and performance.',
    color: '#a855f7',
    trigger: 'MR !900: "Implement user notification preferences API"',
    steps: [
      {
        agent: 'Reviewer',
        icon: Eye,
        color: '#a855f7',
        action: 'Reads 12 changed files, analyzes new API endpoints, checks auth patterns, validates error handling',
        output: '4 review comments: missing rate limit on /preferences, no input validation on notification_type, unused import, suggest adding integration test. Verdict: Request Changes.',
      },
    ],
    outcome: 'Thorough code review in 8 seconds. Specific, actionable feedback with line references.',
    timeToFix: '8s',
  },
];

export default function ScenariosPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center">
              <Workflow className="w-4 h-4 text-[#818cf8]" />
            </div>
            <span className="font-semibold text-lg">DevFlow</span>
          </a>
          <a href="/" className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </a>
        </div>
      </nav>

      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Demo <span className="gradient-text">Scenarios</span>
            </h1>
            <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
              Real-world scenarios showing how DevFlow agents collaborate to solve problems.
            </p>
          </div>

          <div className="space-y-12">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="rounded-2xl border border-[#27272a] bg-[#18181b] overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-[#27272a]">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-xl sm:text-2xl font-bold">{scenario.title}</h2>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 shrink-0">
                      <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span className="text-xs font-medium text-[#22c55e]">{scenario.timeToFix}</span>
                    </div>
                  </div>
                  <p className="text-[#a1a1aa]">{scenario.description}</p>
                </div>

                {/* Trigger */}
                <div className="px-6 sm:px-8 py-4 bg-[#09090b]/50 border-b border-[#27272a]">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#eab308] shrink-0" />
                    <span className="text-sm font-medium text-[#eab308]">Trigger:</span>
                    <span className="text-sm text-[#a1a1aa]">{scenario.trigger}</span>
                  </div>
                </div>

                {/* Steps */}
                <div className="p-6 sm:p-8 space-y-4">
                  {scenario.steps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex flex-col items-center shrink-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${step.color}15`, border: `1px solid ${step.color}30` }}
                        >
                          <step.icon className="w-5 h-5" style={{ color: step.color }} />
                        </div>
                        {i < scenario.steps.length - 1 && (
                          <div className="w-px flex-1 bg-[#27272a] mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <h4 className="font-semibold mb-1" style={{ color: step.color }}>
                          {step.agent}
                        </h4>
                        <p className="text-sm text-[#a1a1aa] mb-2">{step.action}</p>
                        <div className="flex items-start gap-2 text-xs text-[#71717a]">
                          <ArrowRight className="w-3 h-3 mt-0.5 shrink-0" />
                          <span>{step.output}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Outcome */}
                <div className="px-6 sm:px-8 py-4 bg-[#22c55e]/5 border-t border-[#27272a]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
                    <span className="text-sm text-[#22c55e]">{scenario.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-[#71717a]">
          DevFlow — GitLab AI Hackathon 2026 · Powered by Anthropic Claude
        </div>
      </footer>
    </div>
  );
}
