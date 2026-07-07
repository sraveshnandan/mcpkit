import './global.css';

import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { defaultMetadata, siteDescription, siteName } from '@/lib/metadata';
import { basePath, repoName, repoOwner, siteUrl } from '@/lib/runtime-config';

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata = defaultMetadata;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
      description: siteDescription,
    },
    {
      '@type': 'SoftwareSourceCode',
      name: siteName,
      url: siteUrl,
      codeRepository: `https://github.com/${repoOwner}/${repoName}`,
      description: siteDescription,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'Node.js',
      license: `https://github.com/${repoOwner}/${repoName}/blob/main/LICENSE`,
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg)] font-body text-[var(--ink)] antialiased">
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(structuredData)}
        </Script>
        <RootProvider search={{ options: { type: 'static', api: `${basePath}/search-index.json` } }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
