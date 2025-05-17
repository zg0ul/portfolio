import AboutPageHero from "@/sections/about/Hero";
import AboutPageExperience from "@/sections/about/Experience";
import AboutPageEduction from "@/sections/about/Eduction";
import AboutPageVolunteering from "@/sections/about/Volunteering";
import AboutPageSkills from "@/sections/about/Skills";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Mohammad Zgoul (zg0ul) - Software Engineer specialized in web and mobile development",
  applicationName: "Mohammad Zgoul - Software Engineer",
  keywords: [
    "Mohammad Zgoul",
    "About Me",
    "Software Engineer",
    "Web Development",
    "Mobile Development",
    "Portfolio",
  ],
};

export default function AboutPage() {
  return (
    <main className="topPageMargin container mb-20 min-h-screen">
      {/* Hero Section with Background Beams */}
      <AboutPageHero />

      {/* Experience Section */}
      <AboutPageExperience />

      {/* Volunteering Section */}
      <AboutPageVolunteering />

      {/* Skills Section */}
      <AboutPageSkills />

      {/* Education Section */}
      <AboutPageEduction />
    </main>
  );
}
