import PublisherNews, { publisherMetadata } from '@/components/PublisherNews';
export const metadata = publisherMetadata('google');
export default function GoogleNewsPage() { return <PublisherNews publisher="google" />; }
