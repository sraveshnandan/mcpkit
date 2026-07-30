import './global.css';

import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';

import { defaultMetadata, siteDescription, siteName } from '@/lib/metadata';
import { basePath, repoName, repoOwner, siteUrl } from '@/lib/runtime-config';

const display = Geist({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

const body = Geist({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
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
      <body className="min-h-screen bg-[var(--background)] font-body text-[var(--foreground)] antialiased">
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