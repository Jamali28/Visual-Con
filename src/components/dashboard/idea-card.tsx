"use client";

import Link from "next/link";
import { useState } from "react";
import { Copy, Check, Lock, Sparkles } from "lucide-react";
import { toast } from "react-hot-toast";

interface IdeaCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    hook?: string | null;
    caption?: string | null;
    niche: string;
    isPremium: boolean;
  };
  isLocked?: boolean;
}

export const IdeaCard = ({ idea, isLocked = false }: IdeaCardProps) => {
  const [copiedHook, setCopiedHook] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  const copyToClipboard = async (text: string, type: 'hook' | 'caption') => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      if (type === 'hook') {
        setCopiedHook(true);
        toast.success("Hook copied to clipboard!");
        setTimeout(() => setCopiedHook(false), 2000);
      } else {
        setCopiedCaption(true);
        toast.success("Caption copied to clipboard!");
        setTimeout(() => setCopiedCaption(false), 2000);
      }
    } catch (err) {
      toast.error("Failed to copy text");
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border p-6 transition-all duration-300 ${isLocked ? 'border-gray-100 opacity-75' : 'border-gray-200 hover:shadow-lg hover:border-indigo-200'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
          {idea.niche}
        </span>
        {idea.isPremium && (
          <span className="flex items-center space-x-1 text-amber-500 text-xs font-bold">
            <Sparkles className="h-3 w-3" />
            <span>PREMIUM</span>
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{idea.title}</h3>
      <p className="text-gray-600 text-sm mb-6">{idea.description}</p>

      {isLocked ? (
        <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-4">
          <Lock className="h-8 w-8 text-gray-400" />
          <div>
            <p className="text-gray-900 font-bold">Unlock this content</p>
            <p className="text-gray-500 text-xs">Upgrade to Pro for full access</p>
          </div>
          <Link 
            href="/upgrade"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition"
          >
            Upgrade Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {idea.hook && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Viral Hook</label>
              <div className="relative group">
                <div className="bg-gray-50 rounded-xl p-3 pr-10 text-sm text-gray-700 italic border border-gray-100">
                  "{idea.hook}"
                </div>
                <button
                  onClick={() => copyToClipboard(idea.hook!, 'hook')}
                  className="absolute right-2 top-2 p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition"
                  title="Copy Hook"
                >
                  {copiedHook ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {idea.caption && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Caption</label>
              <div className="relative group">
                <div className="bg-gray-50 rounded-xl p-3 pr-10 text-sm text-gray-700 border border-gray-100 whitespace-pre-wrap">
                  {idea.caption}
                </div>
                <button
                  onClick={() => copyToClipboard(idea.caption!, 'caption')}
                  className="absolute right-2 top-2 p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition"
                  title="Copy Caption"
                >
                  {copiedCaption ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
