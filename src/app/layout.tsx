import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
