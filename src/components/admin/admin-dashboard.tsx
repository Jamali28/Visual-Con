"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { 
  Plus, 
  Search, 
  Trash2, 
  Users, 
  Lightbulb, 
  Crown, 
  Filter,
  Clock,
  Layout,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Stats {
  totalIdeas: number;
  totalUsers: number;
  totalPremium: number;
}

interface ContentIdea {
  id: string;
  title: string;
  description: string;
  niche: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  type?: string | null;
  hook?: string | null;
  caption?: string | null;
}

export default function AdminDashboard({ 
  initialIdeas, 
  stats: initialStats 
}: { 
  initialIdeas: ContentIdea[]; 
  stats: Stats 
}) {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [nicheFilter, setNicheFilter] = useState("All");
  const [stats, setStats] = useState(initialStats);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    niche: "Fitness",
    isPremium: false,
    hook: "",
    caption: "",
    type: "Reel"
  });

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          idea.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesNiche = nicheFilter === "All" || idea.niche === nicheFilter;
      return matchesSearch && matchesNiche;
    });
  }, [ideas, searchQuery, nicheFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create idea");

      const newIdea = await res.json();
      setIdeas([newIdea, ...ideas]);
      setStats(prev => ({
        ...prev,
        totalIdeas: prev.totalIdeas + 1,
        totalPremium: formData.isPremium ? prev.totalPremium + 1 : prev.totalPremium
      }));
      
      setFormData({
        title: "",
        description: "",
        niche: "Fitness",
        isPremium: false,
        hook: "",
        caption: "",
        type: "Reel"
      });
      toast.success("Content Idea published successfully!");
    } catch (error) {
      toast.error("Could not save the idea. Please check the fields.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, isPremium: boolean) => {
    if (!confirm("Are you sure you want to delete this content idea? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/ideas?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setIdeas(ideas.filter((i) => i.id !== id));
      setStats(prev => ({
        ...prev,
        totalIdeas: prev.totalIdeas - 1,
        totalPremium: isPremium ? prev.totalPremium - 1 : prev.totalPremium
      }));
      toast.success("Idea removed from library");
    } catch (error) {
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StatCard 
          title="Total Ideas" 
          value={stats.totalIdeas} 
          icon={<Lightbulb className="w-6 h-6 text-amber-500" />}
          description="Total generated content"
          color="bg-amber-50"
          delay={0.1}
        />
        <StatCard 
          title="Active Users" 
          value={stats.totalUsers} 
          icon={<Users className="w-6 h-6 text-blue-500" />}
          description="Users on the platform"
          color="bg-blue-50"
          delay={0.2}
        />
        <StatCard 
          title="Premium Content" 
          value={stats.totalPremium} 
          icon={<Crown className="w-6 h-6 text-indigo-500" />}
          description="Pro-only ideas"
          color="bg-indigo-50"
          delay={0.3}
        />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <motion.div 
          className="xl:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden sticky top-8">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Content
              </h2>
              <p className="text-indigo-100 text-sm mt-1">Fill in the details to create a new content idea.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Content Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Morning Habits for Success"
                  className="w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 p-3 border transition-all outline-none"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Detailed Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="What is this idea about? Explain the concept..."
                  className="w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 p-3 border transition-all outline-none resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Niche</label>
                  <select
                    className="w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-white outline-none"
                    value={formData.niche}
                    onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  >
                    {["Fitness", "Fashion", "Business", "Tech", "Food"].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Format</label>
                  <select
                    className="w-full rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 p-3 border bg-white outline-none"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    {["Reel", "Post", "Story"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${formData.isPremium ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-200 text-gray-500'}`}>
                    <Crown className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Premium Content</p>
                    <p className="text-xs text-gray-500">Only visible to Pro users</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isPremium: !formData.isPremium })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${formData.isPremium ? 'bg-indigo-600' : 'bg-gray-300'}`}
                >
                  <motion.div 
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full`}
                    animate={{ x: formData.isPremium ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    style={{ left: '4px' }}
                  />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                {loading ? "Publishing..." : "Publish Content Idea"}
              </motion.button>
            </form>
          </div>
        </motion.div>

        <motion.div 
          className="xl:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col h-[850px]">
            <div className="p-6 border-b border-gray-100 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-indigo-600" />
                  Content Library
                </h2>
                
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text"
                      placeholder="Search ideas..."
                      className="pl-10 pr-4 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-sm w-full md:w-64 outline-none border transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select 
                      className="pl-10 pr-8 py-2 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl text-sm outline-none border transition-all appearance-none"
                      value={nicheFilter}
                      onChange={(e) => setNicheFilter(e.target.value)}
                    >
                      <option>All</option>
                      <option>Fitness</option>
                      <option>Fashion</option>
                      <option>Business</option>
                      <option>Tech</option>
                      <option>Food</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {filteredIdeas.length === 0 ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="bg-gray-50 p-6 rounded-full mb-4">
                      <Search className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">No ideas found</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">Try adjusting your filters or create a new content idea to get started.</p>
                  </motion.div>
                ) : (
                  filteredIdeas.map((idea) => (
                    <motion.div 
                      layout
                      key={idea.id} 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="group bg-white hover:bg-gray-50/50 p-4 border border-gray-100 rounded-2xl transition-all duration-200 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-xl flex-shrink-0 ${getNicheColor(idea.niche)}`}>
                          <div className="w-6 h-6 flex items-center justify-center font-bold text-lg">
                            {idea.niche.charAt(0)}
                          </div>
                        </div>
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 truncate">{idea.title}</h3>
                            {idea.isPremium && (
                              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md uppercase tracking-wider flex items-center gap-1">
                                <Crown className="w-2.5 h-2.5" />
                                Pro
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-1">{idea.description}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(idea.createdAt).toLocaleDateString()}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="font-medium text-gray-500 uppercase">{idea.type || 'REEL'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleDelete(idea.id, idea.isPremium)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete idea"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, description, color, delay }: { 
  title: string; 
  value: number; 
  icon: React.ReactNode; 
  description: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-center gap-5 transition-transform hover:scale-[1.02] duration-200"
    >
      <div className={`p-4 rounded-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-gray-900">{value}</h3>
          <span className="text-[10px] font-bold text-green-500 bg-green-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">Live</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

function getNicheColor(niche: string) {
  switch (niche) {
    case "Fitness": return "bg-red-50 text-red-600";
    case "Fashion": return "bg-pink-50 text-pink-600";
    case "Business": return "bg-blue-50 text-blue-600";
    case "Tech": return "bg-slate-50 text-slate-600";
    case "Food": return "bg-orange-50 text-orange-600";
    default: return "bg-gray-50 text-gray-600";
  }
}
