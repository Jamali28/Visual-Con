"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { IdeaCard } from "@/components/dashboard/idea-card";
import { useState, useEffect } from "react";
import { Search, Filter, Sparkles } from "lucide-react";
import axios from "axios";

const NICHES = ["All", "Fitness", "Fashion", "Business", "Tech", "Food"];

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

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [selectedNiche, setSelectedNiche] = useState("All");
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/ideas?daily=true&niche=${selectedNiche === "All" ? "" : selectedNiche}`);
        setIdeas(response.data);
      } catch (error) {
        console.error("Failed to fetch ideas", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchIdeas();
    }
  }, [selectedNiche, status]);

  if (status === "loading") return null;

  const userRole = (session?.user as any)?.role || "FREE";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Ideas</h1>
            <p className="text-gray-500">Your daily dose of viral content concepts</p>
          </div>

          <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
            {NICHES.map((niche) => (
              <button
                key={niche}
                onClick={() => setSelectedNiche(niche)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  selectedNiche === niche
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {niche}
              </button>
            ))}
          </div>
        </div>

        {userRole === "FREE" && (
          <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="text-indigo-900 text-sm">
                <span className="font-bold">Upgrade to Pro</span> to unlock unlimited ideas and full library access.
              </p>
            </div>
            <Link 
              href="/upgrade"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
            >
              Upgrade Now
            </Link>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white rounded-2xl border border-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, index) => {
              // Lock ideas after index 2 for free users
              const isLocked = userRole === "FREE" && index >= 3;
              return (
                <IdeaCard 
                  key={idea.id} 
                  idea={idea} 
                  isLocked={isLocked}
                />
              );
            })}
            {ideas.length === 0 && (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500">No ideas found for this niche yet.</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
