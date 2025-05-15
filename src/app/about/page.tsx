"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BentoCard } from "@/components/ui/bento-card";
import AboutPageHero from "@/sections/about/Hero";
import AboutPageExperience from "@/sections/about/Experience";
import AboutPageEduction from "@/sections/about/Eduction";
import AboutPageVolunteering from "@/sections/about/Volunteering";

export default function AboutPage() {
  return (
    <main className="topPageMargin container mb-20 min-h-screen">
      {/* Hero Section with Background Beams */}
      <AboutPageHero />

      {/* Experience Section */}
      <AboutPageExperience />

      {/* Volunteering Section */}
      <AboutPageVolunteering />

      {/* Skills & Technologies Section with Bento Cards */}
      <section className="container mb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-10 text-center text-4xl font-bold">
              Skills & Technologies
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BentoCard withArrow>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Frontend Development
                  </h3>
                  <ul className="text-text-400 space-y-2">
                    <li>• React.js / Next.js</li>
                    <li>• TypeScript / JavaScript</li>
                    <li>• Tailwind CSS / Material UI</li>
                    <li>• HTML5 / CSS3</li>
                    <li>• Redux / Context API</li>
                  </ul>
                </div>
              </BentoCard>

              <BentoCard withArrow>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Backend Development
                  </h3>
                  <ul className="text-text-400 space-y-2">
                    <li>• Node.js / Express</li>
                    <li>• AWS Services</li>
                    <li>• Java / Python</li>
                    <li>• REST API Design</li>
                    <li>• Serverless Functions</li>
                  </ul>
                </div>
              </BentoCard>

              <BentoCard withArrow>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Mobile Development
                  </h3>
                  <ul className="text-text-400 space-y-2">
                    <li>• Flutter / Dart</li>
                    <li>• State Management (Riverpod, Provider)</li>
                    <li>• Firebase Integration</li>
                    <li>• Cross-platform Development</li>
                    <li>• Native Features Integration</li>
                  </ul>
                </div>
              </BentoCard>

              <BentoCard withArrow>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Database & Storage
                  </h3>
                  <ul className="text-text-400 space-y-2">
                    <li>• PostgreSQL / MySQL</li>
                    <li>• MongoDB / Firestore</li>
                    <li>• Supabase</li>
                    <li>• Redis</li>
                    <li>• AWS S3</li>
                  </ul>
                </div>
              </BentoCard>

              <BentoCard withArrow>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    DevOps & Tools
                  </h3>
                  <ul className="text-text-400 space-y-2">
                    <li>• Git / GitHub Actions</li>
                    <li>• Docker / Kubernetes</li>
                    <li>• CI/CD Pipelines</li>
                    <li>• AWS / Digital Ocean</li>
                    <li>• Vercel / Netlify</li>
                  </ul>
                </div>
              </BentoCard>

              <BentoCard withArrow>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Other Skills
                  </h3>
                  <ul className="text-text-400 space-y-2">
                    <li>• Test-Driven Development</li>
                    <li>• Agile Methodologies</li>
                    <li>• Problem Solving</li>
                    <li>• Technical Documentation</li>
                    <li>• Team Collaboration</li>
                  </ul>
                </div>
              </BentoCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <AboutPageEduction />

      {/* My Approach Section */}
      <section className="container mb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-10 text-center text-4xl font-bold">
              My Approach
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <BentoCard>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    User-Centered Design
                  </h3>
                  <p className="text-text-400">
                    I believe in creating applications that prioritize user
                    experience. Every feature is crafted with the end-user in
                    mind, ensuring intuitive and accessible interfaces.
                  </p>
                </div>
              </BentoCard>

              <BentoCard>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Clean Architecture
                  </h3>
                  <p className="text-text-400">
                    I'm committed to writing clean, maintainable code with
                    proper architecture patterns. This ensures scalability and
                    makes future updates more efficient.
                  </p>
                </div>
              </BentoCard>

              <BentoCard>
                <div className="z-10 flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Continuous Learning
                  </h3>
                  <p className="text-text-400">
                    Technology evolves rapidly, and I'm dedicated to staying at
                    the forefront. I actively pursue new skills and best
                    practices to deliver cutting-edge solutions.
                  </p>
                </div>
              </BentoCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beyond Coding Section */}
      <section className="container">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="mb-10 text-center text-4xl font-bold">
              Beyond Coding
            </h2>

            <div className="relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 z-0">
                <BackgroundBeams />
              </div>

              <div className="relative z-10 p-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <BentoCard>
                    <div className="z-10 flex h-full flex-col p-6">
                      <h3 className="mb-4 text-xl font-semibold text-blue-400">
                        Aviation Enthusiast
                      </h3>
                      <p className="text-text-400 mb-4">
                        When not coding, I'm passionate about aviation. I spend
                        hours on flight simulators and tracking real flights,
                        fascinated by the engineering marvels that connect our
                        world. This interest in aviation highlights my
                        meticulous attention to detail and love for complex
                        systems – qualities that carry over to my development
                        work.
                      </p>
                    </div>
                  </BentoCard>

                  <BentoCard>
                    <div className="z-10 flex h-full flex-col p-6">
                      <h3 className="mb-4 text-xl font-semibold text-blue-400">
                        Continuous Personal Projects
                      </h3>
                      <p className="text-text-400 mb-4">
                        I'm always working on personal projects to explore new
                        technologies and sharpen my skills. These projects range
                        from mobile apps to web platforms, each serving as a
                        playground for innovation and learning. Building things
                        from scratch gives me insights that enhance my
                        professional work.
                      </p>
                      <div className="mt-auto flex">
                        <Link href="/projects">
                          <Button className="border-navy-600 bg-navy-800/70 hover:border-neon/40 hover:bg-navy-800/90 hover:text-neon flex items-center gap-2 rounded-lg border px-5 py-2.5">
                            <ExternalLink className="h-4 w-4" />
                            View My Projects
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </BentoCard>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
