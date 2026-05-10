import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Visual Idea | Web Design & Branding Agency in Pakistan",
  description: "Visual Idea provides web design, branding, UI/UX, and creative digital solutions for businesses in Pakistan. Scale your business with high-impact digital experiences.",
  keywords: ["web design Pakistan", "UI UX design Pakistan", "branding agency Pakistan", "creative agency Karachi", "affordable web design", "modern website design"],
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
    title: "Visual Idea | Web Design & Branding Agency in Pakistan",
    description: "Creative digital agency specializing in web design, branding, and UI/UX solutions in Pakistan.",
    url: "https://visualidea.netlify.app",
    siteName: "Visual Idea",
    images: [
      {
        url: "/idea.png",
        width: 800,
        height: 600,
        alt: "Visual Idea Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Idea | Web Design & Branding Agency in Pakistan",
    description: "Creative digital agency specializing in web design, branding, and UI/UX solutions in Pakistan.",
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
              "@type": "Organization",
              "name": "Visual Idea",
              "url": "https://visualidea.netlify.app",
              "logo": "https://visualidea.netlify.app/idea.png",
              "description": "Visual Idea provides web design, branding, UI/UX, and creative digital solutions for businesses in Pakistan.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Pakistan"
              },
              "sameAs": [
                "https://www.linkedin.com/company/visualidea",
                "https://twitter.com/visualidea"
              ]
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
