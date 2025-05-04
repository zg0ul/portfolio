import type { Metadata } from "next";
import "./globals.css";
import "./animation.css";
import NextTopLoader from "nextjs-toploader";
import Header from "@/sections/Navbar";
import PortfolioFooter from "@/sections/footer";
import { Toaster } from "sonner";
import ClickSpark from "@/components/ui/click-spark";
import { StarsBackground } from "@/components/ui/stars-background";

export const metadata: Metadata = {
  title: "zg0ul's portfolio",
  description: "A Portfolio website for Mohammad Zgoul (zg0ul)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth" data-theme="dark">
      <body>
        <NextTopLoader
          color="#90a3bc"
          initialPosition={0.2}
          easing="ease"
          speed={300}
          showSpinner={false}
          height={2}
          shadow="0 0 20px #90a3bc, 0 0 10px #90a3bc"
          zIndex={100}
        />
        <ClickSpark
          sparkColor="#90a3bc"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Header />
          <StarsBackground />

          {children}
          <PortfolioFooter />
          <Toaster position="top-right" richColors closeButton />
        </ClickSpark>
      </body>
    </html>
  );
}
