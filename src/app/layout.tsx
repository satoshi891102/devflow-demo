import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevFlow — AI DevOps Team for GitLab',
  description: 'Four specialized AI agents that form a virtual DevOps team. Sentinel fixes pipelines, Triage manages issues, Reviewer ensures code quality, Scribe maintains documentation.',
  openGraph: {
    title: 'DevFlow — AI DevOps Team for GitLab',
    description: 'Four specialized AI agents that form a virtual DevOps team.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grid-bg">{children}</body>
    </html>
  );
}
