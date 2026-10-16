import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { siteConfig } from '@/lib/site';
import { Header, Footer } from '@/components/SiteChrome';
import ScrollReveal from '@/components/ScrollReveal';

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
  alternates: {
    canonical: './',
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
    card: 'summary_large_image',
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
  potentialAction: {
    '@type': 'SearchAction',
    target: `${siteConfig.url}/#tools`,
    'query-input': 'required name=search_term_string',
  },
};

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'DevX Tool — Free Online Developer Suite',
  url: siteConfig.url,
  description: siteConfig.description,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires HTML5 support',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'JSON Formatter & Validator',
    'Online Regex Tester & Debugger',
    'Text Diff Checker',
    'Base64 Encoder & Decoder',
    'URL Encoder & Decoder',
    'SHA Hash Generator (SHA-256, SHA-512)',
    'JWT Decoder & Debugger',
    'Unix Timestamp & Epoch Converter',
    'UUID v4 Generator in bulk',
    'Strong Random Password Generator',
    'Color Converter & Contrast Checker',
    '100% Client-side privacy-first execution',
  ],
};

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What developer tools are available on DevX Tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'DevX Tool offers 11 free utilities: JSON Formatter & Validator, Regex Tester, Text Diff Checker, Base64 Encoder/Decoder, URL Encoder/Decoder, SHA Hash Generator, JWT Decoder, Unix Timestamp Converter, UUID Generator, Password Generator, and Color Converter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is DevX Tool free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, DevX Tool is 100% free with no subscription, no sign-up, and no usage limitations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does DevX Tool store or log my sensitive data (like JSON or JWTs)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. DevX Tool runs entirely in your web browser using client-side JavaScript APIs. Your code, tokens, passwords, and data are never sent to or stored on any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use DevX Tool on mobile or tablet devices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, all DevX Tool utilities are fully responsive and work seamlessly across smartphones, tablets, laptops, and desktop computers.',
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollReveal />
      </body>
    </html>
  );
}
