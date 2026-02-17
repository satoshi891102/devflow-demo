'use client';

import {
  Workflow, ArrowLeft, CheckCircle2, Copy, ExternalLink,
  GitBranch, Terminal, FileText, Shield, Target, Eye,
  AlertCircle, ArrowRight
} from 'lucide-react';

const steps = [
  {
    number: 1,
    title: 'Request GitLab Access',
    description: 'Fill out the access form to join the GitLab AI Hackathon group.',
    action: {
      label: 'Fill Access Form',
      url: 'https://forms.gle/EeCH2WWUewK3eGmVA',
    },
    details: [
      'You\'ll get access to the GitLab AI Hackathon group',
      'This enables the Duo Agent Platform features',
      'Processing may take 24-48 hours',
    ],
  },
  {
    number: 2,
    title: 'Register on Devpost',
    description: 'Register for the hackathon on Devpost to be eligible for prizes.',
    action: {
      label: 'Register Now',
      url: 'https://gitlab.devpost.com/register',
    },
    details: [
      'Create a Devpost account if you don\'t have one',
      'Click "Register" on the hackathon page',
      'Deadline: March 25, 2026 @ 8:00pm SAST',
    ],
  },
  {
    number: 3,
    title: 'Fork the DevFlow Repository',
    description: 'Fork the DevFlow project into your GitLab AI Hackathon group space.',
    code: `# Clone the GitHub repo
git clone https://github.com/satoshi891102/devflow-demo.git
cd devflow-demo

# Push to GitLab (after access is granted)
git remote add gitlab https://gitlab.com/gitlab-ai-hackathon/devflow.git
git push gitlab main`,
    details: [
      'The project must be in the gitlab-ai-hackathon group',
      'It must be public with an open source license',
    ],
  },
  {
    number: 4,
    title: 'Configure Agents',
    description: 'Set up the 4 custom agents in GitLab Duo with their system prompts.',
    details: [
      'Navigate to Settings > AI Agents in your project',
      'Create each agent (Sentinel, Triage, Reviewer, Scribe)',
      'Paste the system prompts from the agents/ directory',
      'Configure the toolsets for each agent',
    ],
  },
  {
    number: 5,
    title: 'Deploy the Flow',
    description: 'Upload the orchestration flow YAML to connect the agents.',
    details: [
      'Navigate to Settings > AI Flows in your project',
      'Upload flow.yaml from the repository root',
      'Configure trigger events (pipeline failure, new issue, etc.)',
      'Test with a sample pipeline failure',
    ],
  },
  {
    number: 6,
    title: 'Run the Demo App',
    description: 'Deploy the TaskFlow demo app to test agent interactions.',
    code: `cd demo-app
pip install -r requirements.txt
python app.py

# The app has intentional vulnerabilities:
# - SQL injection in /tasks (POST) and /tasks/search
# - Hardcoded secrets
# - Weak password hashing (MD5)
# - Missing input validation
# - Debug mode enabled`,
    details: [
      'Push the demo app to trigger the CI/CD pipeline',
      'Watch Sentinel detect and fix the intentional bugs',
      'See Triage categorize the resulting issues',
    ],
  },
];

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
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
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Getting <span className="gradient-text">Started</span>
            </h1>
            <p className="text-[#a1a1aa] text-lg max-w-xl mx-auto">
              Set up DevFlow in your GitLab project in 6 steps.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-px bg-[#27272a]" />
                )}

                <div className="flex gap-5">
                  {/* Step number */}
                  <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center text-sm font-bold text-[#818cf8] shrink-0">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                    <p className="text-[#a1a1aa] mb-4">{step.description}</p>

                    {/* Action button */}
                    {step.action && (
                      <a
                        href={step.action.url}
                        target="_blank"
                        rel="noopener"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] rounded-lg text-sm font-medium transition-colors mb-4"
                      >
                        {step.action.label} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Code block */}
                    {step.code && (
                      <div className="mb-4 rounded-xl bg-[#18181b] border border-[#27272a] overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-[#27272a]">
                          <span className="text-xs text-[#71717a] font-mono">terminal</span>
                        </div>
                        <pre className="p-4 text-sm font-mono text-[#a1a1aa] overflow-x-auto">
                          {step.code}
                        </pre>
                      </div>
                    )}

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-[#71717a]">
                          <CheckCircle2 className="w-4 h-4 text-[#818cf8] mt-0.5 shrink-0" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next steps */}
          <div className="mt-12 p-6 rounded-2xl bg-[#18181b] border border-[#6366f1]/20">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#818cf8]" />
              Ready to Submit?
            </h3>
            <p className="text-[#a1a1aa] text-sm mb-4">
              Once your agents are configured and tested, prepare your submission:
            </p>
            <ul className="space-y-2 text-sm text-[#71717a]">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5" />
                Record a 3-minute demo video (see docs/DEMO_SCRIPT.md)
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5" />
                Write a project description on Devpost
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-3.5 h-3.5" />
                Submit before March 25, 2026 @ 8:00pm SAST
              </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-[#27272a]">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-[#71717a]">
          DevFlow — GitLab AI Hackathon 2026 · Powered by Anthropic Claude
        </div>
      </footer>
    </div>
  );
}
