import PublisherNews, { publisherMetadata } from '@/components/PublisherNews';
export const metadata = publisherMetadata('microsoft');
export default function MicrosoftNewsPage() { return <PublisherNews publisher="microsoft" />; }
