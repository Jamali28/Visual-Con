import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viral Content Ideas & Hook Library | Visual Idea',
  description: 'Explore our comprehensive library of viral content ideas, scroll-stopping hooks, and captions designed for creator growth.',
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
