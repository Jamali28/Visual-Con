import { Sparkles } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                VisualIdea
              </span>
            </div>
            <p className="text-gray-500 max-w-xs">
              Daily content ideas, hooks, and captions to help you grow your social media presence effortlessly.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-500 hover:text-indigo-600">Dashboard</a></li>
              <li><a href="/library" className="text-gray-500 hover:text-indigo-600">Content Library</a></li>
              <li><a href="/#pricing" className="text-gray-500 hover:text-indigo-600">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600">Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} VisualIdea. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
