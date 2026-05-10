import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Content Idea Library | Visual Idea',
  description: 'Explore our comprehensive library of viral content ideas, hooks, and captions for social media growth.',
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
