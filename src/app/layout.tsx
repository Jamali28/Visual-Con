import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visual Idea | Content Creation Tools & Viral Ideas for Creators",
  description: "Visual Idea helps content creators discover viral hooks, captions, and AI tools for social media growth. Elevate your creator workflow with daily content ideas.",
  keywords: ["creator tools", "content creation ideas", "viral hooks", "social media growth", "AI tools for creators", "influencer resources", "TikTok content ideas", "Instagram growth"],
  authors: [{ name: "Visual Idea" }],
  creator: "Visual Idea",
  publisher: "Visual Idea",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://visualidea.netlify.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Visual Idea | Tools & Viral Ideas for Content Creators",
    description: "The ultimate resource platform for creators. Get viral hooks, content ideas, and AI tools to scale your social media.",
    url: "https://visualidea.netlify.app",
    siteName: "Visual Idea",
    images: [
      {
        url: "/idea.png",
        width: 800,
        height: 600,
        alt: "Visual Idea - Creator Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Idea | Content Creation Tools & Viral Ideas",
    description: "Scale your social media with daily viral ideas and creator resources.",
    images: ["/idea.png"],
  },
  icons: {
    icon: "/idea.png",
    apple: "/idea.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Visual Idea",
              "url": "https://visualidea.netlify.app",
              "description": "Tools and resources for content creators to scale their social media with viral ideas and AI utilities.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://visualidea.netlify.app/library?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <AuthProvider>
          <Toaster position="bottom-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
