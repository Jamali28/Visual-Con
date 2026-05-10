"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowRight, CheckCircle, Sparkles, Zap, Shield, Rocket } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow overflow-x-hidden">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-indigo-50/30 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Tools & Resources for <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                  Content Creators
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Visual Idea helps creators discover viral hooks, content ideas, and AI tools to scale their social media. We provide the resources you need for better content creation, audience growth, and creator productivity.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                href="/register"
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center space-x-2 shadow-lg shadow-indigo-200"
              >
                <span>Start Creating for Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/library"
                className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
              >
                Explore Library
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Creator Tools Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">The Ultimate Creator Toolkit</h2>
              <p className="text-xl text-gray-600">Everything you need to stop staring at a blank screen and start growing.</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-indigo-100 p-3 rounded-xl w-fit mb-6">
                  <Sparkles className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Viral Content Ideas</h3>
                <p className="text-gray-600">Get fresh, data-backed content concepts tailored to your niche every 24 hours. Never run out of things to post again.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-violet-100 p-3 rounded-xl w-fit mb-6">
                  <Zap className="h-6 w-6 text-violet-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">AI Creator Tools</h3>
                <p className="text-gray-600">Leverage the power of AI to generate high-converting hooks, captions, and scripts that stop the scroll and boost retention.</p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-blue-100 p-3 rounded-xl w-fit mb-6">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Growth Resources</h3>
                <p className="text-gray-600">Access battle-tested strategies and workflow templates designed for YouTubers, TikTokers, and Instagram influencers.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* The Value Section */}
        <section className="py-24 px-4 bg-indigo-900 text-white overflow-hidden relative">
          <motion.div 
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  From Zero to Viral: <br/>
                  <span className="text-indigo-300">The Creator's Roadmap</span>
                </h2>
                <div className="space-y-8">
                  {[
                    { num: 1, title: "Pick Your Niche", desc: "Whether it's Business, Fitness, or Tech, we filter out the noise and show you exactly what's working in your specific market right now." },
                    { num: 2, title: "Deploy Proven Hooks", desc: "Access our database of psychological triggers and scroll-stopping hooks that have been verified to hold attention in 2026." },
                    { num: 3, title: "Scale with Consistency", desc: "Stop the \"Post and Ghost\" cycle. With daily ideas, you build the muscle of daily posting, which is the only real secret to viral growth." }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 }}
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-500/20 border border-indigo-400/30 rounded-full flex items-center justify-center font-bold text-xl text-indigo-300">
                        {item.num}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-indigo-100/70 text-lg">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-indigo-600 rounded-2xl p-6 mb-8 shadow-inner">
                  <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-2">Today's Featured Pro Strategy</p>
                  <h3 className="text-2xl font-bold mb-4">The "Problem-First" Viral Framework</h3>
                  <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-indigo-200 font-bold mb-1 uppercase">Step 1: The Hook</p>
                      <p className="font-medium text-white italic">"Your job might be automated, but these 5 skills will never be."</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-indigo-200 font-bold mb-1 uppercase">Step 2: The Value</p>
                      <p className="text-sm text-indigo-100">Deliver 5 rapid-fire points that provide immediate utility to the viewer.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl border border-white/5">
                      <p className="text-xs text-indigo-200 font-bold mb-1 uppercase">Step 3: The CTA</p>
                      <p className="text-sm text-indigo-100">Ask a question to trigger the algorithm's engagement ranking.</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-indigo-200 mb-6 font-medium italic">"VisualIdea turned my 2-hour brainstorming session into a 5-minute selection process."</p>
                  <Link href="/register" className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 active:scale-95">
                    Unlock All Pro Frameworks <ArrowRight className="w-4 h-4"/>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Simple, Transparent Pricing</h2>
              <p className="text-gray-600">Choose the plan that works for you</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <motion.div 
                className="bg-white p-10 rounded-3xl border border-gray-200 flex flex-col hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-extrabold mb-6">$0<span className="text-lg font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-600">3 ideas per day</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-400">
                    <CheckCircle className="h-5 w-5 opacity-20" />
                    <span>Full library access</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-400">
                    <CheckCircle className="h-5 w-5 opacity-20" />
                    <span>Premium hooks & captions</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="w-full py-3 text-center border border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition active:scale-95"
                >
                  Current Plan
                </Link>
              </motion.div>

              {/* Pro Plan */}
              <motion.div 
                className="bg-indigo-600 p-10 rounded-3xl border border-indigo-700 flex flex-col relative overflow-hidden shadow-2xl transform md:scale-105"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Popular
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <div className="text-4xl font-extrabold mb-6 text-white">$19<span className="text-lg font-normal text-indigo-200">/mo</span></div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center space-x-3 text-white">
                    <CheckCircle className="h-5 w-5 text-indigo-300" />
                    <span>Unlimited daily ideas</span>
                  </li>
                  <li className="flex items-center space-x-3 text-white">
                    <CheckCircle className="h-5 w-5 text-indigo-300" />
                    <span>Full library access</span>
                  </li>
                  <li className="flex items-center space-x-3 text-white">
                    <CheckCircle className="h-5 w-5 text-indigo-300" />
                    <span>Premium hooks & captions</span>
                  </li>
                  <li className="flex items-center space-x-3 text-white">
                    <CheckCircle className="h-5 w-5 text-indigo-300" />
                    <span>New niches added weekly</span>
                  </li>
                </ul>
                <Link
                  href="/upgrade"
                  className="w-full py-3 text-center bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg active:scale-95"
                >
                  Upgrade to Pro
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
