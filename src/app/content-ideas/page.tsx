import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Viral Content Ideas for Creators | Visual Idea',
  description: 'Discover trending content ideas, viral hooks, and scroll-stopping concepts for your social media channels.',
};

export default function ContentIdeasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Viral Content Ideas</h1>
          <p className="text-xl text-gray-600 mb-8">
            We are currently indexing thousands of viral hooks and content concepts. This section will be live soon to help you scale your reach!
          </p>
          <div className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold inline-block">
            Coming Soon
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
