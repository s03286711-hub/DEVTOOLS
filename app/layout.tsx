import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { siteConfig } from '@/lib/site';
import { Header, Footer } from '@/components/SiteChrome';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'DevToolbox — Free Online Developer Tools', template: '%s | DevToolbox' },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: ['online developer tools','JSON formatter','text diff','Base64 encoder','URL encoder','regex tester'],
  robots: { index: true, follow: true },
  openGraph: { type: 'website', siteName: siteConfig.name, title: 'DevToolbox — Free Online Developer Tools', description: siteConfig.description },
  twitter: { card: 'summary_large_image', title: 'DevToolbox — Free Online Developer Tools', description: siteConfig.description },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><head><meta name="google-adsense-account" content="ca-pub-1887267392383699" /><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1887267392383699" crossOrigin="anonymous"></script></head><body><Header />{children}<Footer /><ScrollReveal /></body></html>;
}
