"use client";

import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { IdeaCard } from "@/components/dashboard/idea-card";
import { useState, useEffect } from "react";
import { Search, Lock } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface ContentIdea {
  id: string;
  title: string;
  description: string;
  niche: string;
  isPremium: boolean;
  type?: string | null;
  hook?: string | null;
  caption?: string | null;
}

export default function LibraryPage() {
  const { data: session } = useSession();
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const userRole = (session?.user as any)?.role || "FREE";

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/ideas`);
        setIdeas(response.data);
      } catch (error) {
        console.error("Failed to fetch ideas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  const filteredIdeas = ideas.filter(idea => 
    idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
    idea.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Inspiration Library</h1>
          <p className="text-gray-600">Explore our full database of viral hooks, post templates, and reels ideas.</p>
        </div>

        <div className="relative max-w-xl mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search niches, keywords, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
          />
        </div>

        {userRole === "FREE" && (
          <div className="mb-12 relative">
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-3xl border border-dashed border-indigo-200 p-10 text-center">
              <Lock className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Full Library is Locked</h3>
              <p className="text-gray-600 mb-6 max-w-md">The content library is a premium feature. Upgrade to Pro to unlock 500+ viral ideas and templates.</p>
              <Link
                href="/upgrade"
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg"
              >
                Unlock Full Access
              </Link>
            </div>
            
            {/* Blurred background content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-30 grayscale pointer-events-none">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-20 w-full bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {userRole !== "FREE" && (
          <>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
                {filteredIdeas.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <p className="text-gray-500">No matching ideas found.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
