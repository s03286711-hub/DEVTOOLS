import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { siteConfig } from '@/lib/site';
import { Header, Footer } from '@/components/SiteChrome';
import ScrollReveal from '@/components/ScrollReveal';
import CookieConsent from '@/components/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'DevX Tool — Free Online Developer Tools & Utility Guides',
    template: '%s | DevX Tool',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    'DevX Tool',
    'devx tool',
    'developer tools',
    'online developer utilities',
    'JSON formatter',
    'text diff checker',
    'Base64 encoder decoder',
    'URL encoder decoder',
    'regex tester online',
    'UUID v4 generator',
    'SHA256 hash generator',
    'JWT decoder',
    'unix timestamp converter',
    'password generator',
    'color converter contrast checker',
  ],
  authors: [{ name: 'DevX Tool Team', url: siteConfig.url }],
  creator: 'DevX Tool',
  publisher: 'DevX Tool',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'DevX Tool — Free Online Developer Tools & Utility Guides',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary',
    title: 'DevX Tool — Free Online Developer Tools & Utility Guides',
    description: siteConfig.description,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="googleb35642988ece0ba2" />
        <meta name="google-adsense-account" content="ca-pub-1887267392383699" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1887267392383699"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollReveal />
        <CookieConsent />
      </body>
    </html>
  );
}
