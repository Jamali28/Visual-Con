import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Visual Idea | Create Your Account',
  description: 'Sign up for Visual Idea to start generating viral content ideas and growing your social media presence today.',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
