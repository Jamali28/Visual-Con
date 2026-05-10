import { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Creator Workflow Templates | Visual Idea',
  description: 'Download workflow templates and productivity resources designed specifically for content creators.',
};

export default function WorkflowPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Workflow Templates</h1>
          <p className="text-xl text-gray-600 mb-8">
            Streamline your creation process with our upcoming library of planning templates and resource guides.
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
