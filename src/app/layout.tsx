import type { Metadata } from "next";
import "@/app/globals.css";

import NextTopLoader from "nextjs-toploader";
import Header from "@/sections/Navbar";
import PortfolioFooter from "@/sections/footer";
import { Toaster } from "sonner";
import ClickSpark from "@/components/ui/click-spark";
import { StarsBackground } from "@/components/ui/stars-background";
import MobileDock from "@/components/MobileDock";
import AnalyticsTracker from "@/components/AnalyticsTracker"; // Add this import
import { Roboto } from "next/font/google";
import { Suspense } from "react";
import { baseUrl } from "./sitemap";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
  title: {
    template: "%s | Mohammad Zgoul - Software Engineer",
    default: "Mohammad Zgoul - Software Engineer & Flutter Developer",
  },
  description:
    "Mechatronics engineer turned software developer specializing in Flutter, AI, and full-stack web development. Based in Amman, Jordan.",
  keywords: [
    "Mohammad Zgoul",
    "zg0ul",
    "Software Engineer",
    "Flutter Developer",
    "Full Stack Developer",
    "AI Engineer",
    "Mechatronics",
    "Next.js",
    "React",
    "Amman Jordan",
    "Portfolio",
  ],
  authors: [{ name: "Mohammad Zgoul", url: "https://zg0ul.com" }],
  creator: "Mohammad Zgoul",
  publisher: "Mohammad Zgoul",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zg0ul.com",
    siteName: "Mohammad Zgoul - Software Engineer",
    title: "Mohammad Zgoul - Software Engineer & Flutter Developer",
    description:
      "Mechatronics engineer turned software developer specializing in Flutter, AI, and full-stack web development.",
    images: [
      {
        url: "https://pmerpfdlvkhayhritnhy.supabase.co/storage/v1/object/public/images//portfolio%20thumbnail.png",
        width: 1920,
        height: 1080,
        alt: "Mohammad Zgoul - Software Engineer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Zgoul - Software Engineer",
    description:
      "Mechatronics engineer turned software developer specializing in Flutter, AI, and full-stack web development.",
    creator: "@zg0ul",
    images: [
      "https://pmerpfdlvkhayhritnhy.supabase.co/storage/v1/object/public/images//portfolio%20thumbnail.png",
    ], // Use absolute URL
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
  alternates: {
    canonical: "https://zg0ul.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`bg-background scroll-smooth ${roboto.className} antialiased`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <link rel="icon" href="/icon.png" sizes="any" />
      <body>
        <NextTopLoader
          color="#86d562"
          initialPosition={0.2}
          easing="ease"
          speed={300}
          showSpinner={false}
          height={2}
          shadow="0 0 20px #4a5769, 0 0 10px #687282"
          zIndex={100}
        />
        <ClickSpark
          sparkColor="#b3e59c"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          {/* Add Analytics Tracker */}
          <Suspense fallback={null}>
            <AnalyticsTracker />
          </Suspense>

          <Header />
          <StarsBackground />
          {/* Mobile Navigation Dock */}
          <MobileDock />
          <div className="relative overflow-x-clip">
            <div className="glow-primary" />
            <div className="glow-secondary" />
            {children}
          </div>
          <PortfolioFooter />
          <Toaster position="top-right" richColors closeButton />
        </ClickSpark>
      </body>
    </html>
  );
}
