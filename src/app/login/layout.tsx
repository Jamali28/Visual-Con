import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Visual Idea',
  description: 'Log in to your Visual Idea account to access your dashboard and saved content ideas.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
