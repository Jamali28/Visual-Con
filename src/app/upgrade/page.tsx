"use client";

import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CheckCircle, Zap, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export default function UpgradePage() {
  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role || "FREE";

  const PRO_CHECKOUT_URL = process.env.NEXT_PUBLIC_PRO_PLAN_CHECKOUT_URL || "https://whop.com/checkout/your-product";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Unlock the Full Power of VisualIdea</h1>
          <p className="text-xl text-gray-600">Join 500+ creators scaling their content with Pro access.</p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="bg-indigo-600 p-8 text-center text-white">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-2 text-indigo-100">Pro Plan</h2>
            <div className="text-6xl font-extrabold mb-4">$19<span className="text-xl font-normal text-indigo-200">/mo</span></div>
            <p className="text-indigo-100 italic">"The only content tool I actually use daily."</p>
          </div>

          <div className="p-10 space-y-8">
            <ul className="space-y-4">
              {[
                "Unlimited daily viral ideas",
                "Full access to the Content Library",
                "Premium hooks designed for retention",
                "Optimized captions for all niches",
                "Priority support",
                "Early access to new features"
              ].map((feature) => (
                <li key={feature} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            {userRole === "PRO" ? (
              <div className="text-center p-4 bg-green-50 border border-green-100 rounded-2xl text-green-700 font-bold">
                You are currently a PRO member!
              </div>
            ) : (
              <Link
                href={PRO_CHECKOUT_URL}
                className="block w-full text-center bg-indigo-600 text-white py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition transform hover:scale-[1.02]"
              >
                Upgrade to Pro via Whop
              </Link>
            )}

            <p className="text-center text-gray-400 text-sm">
              Secure payments powered by Whop. Cancel anytime.
            </p>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit mx-auto mb-6">
              <Zap className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">Instant Activation</h3>
            <p className="text-gray-500 text-sm">Your account is upgraded the second you complete the purchase.</p>
          </div>
          <div className="text-center">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit mx-auto mb-6">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">Secure Billing</h3>
            <p className="text-gray-500 text-sm">We use Whop for secure payment processing and subscription management.</p>
          </div>
          <div className="text-center">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-fit mx-auto mb-6">
              <Sparkles className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold mb-2">Fresh Ideas Daily</h3>
            <p className="text-gray-500 text-sm">Unlimited access means you'll always have something viral to post.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
