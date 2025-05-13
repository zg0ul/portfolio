"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Linkedin, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";

export default function AboutPage() {
  return (
    <main className="topPageMargin container mb-20 min-h-screen">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center md:flex-row md:items-start md:justify-between"
          >
            <div className="mb-8 md:mb-0 md:max-w-2xl">
              <h1 className="gradient-title mb-6 text-5xl font-bold md:text-6xl">
                I&apos;m Mohammad Zgoul. Full Stack Developer & Aviation
                Enthusiast.
              </h1>
              <p className="text-text-400 mb-8 text-lg">
                A passionate software engineer dedicated to crafting clean,
                scalable web and mobile applications. With a background in
                Computer Science and a love for technology, I develop solutions
                that bridge the gap between user needs and technical excellence.
                Based in Amman, Jordan.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/resume" target="_blank">
                  <Button className="border-navy-600 bg-navy-800/70 hover:border-neon/40 hover:bg-navy-800/90 hover:text-neon flex items-center gap-2 rounded-lg border px-5 py-2.5">
                    <FileText className="h-4 w-4" />
                    Resume
                  </Button>
                </Link>
                <Link href="https://github.com/zg0ul" target="_blank">
                  <Button className="border-navy-600 bg-navy-800/70 hover:border-neon/40 hover:bg-navy-800/90 hover:text-neon flex items-center gap-2 rounded-lg border px-5 py-2.5">
                    <SiGithub className="h-4 w-4" />
                    GitHub
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/zg0ul/" target="_blank">
                  <Button className="border-navy-600 bg-navy-800/70 hover:border-neon/40 hover:bg-navy-800/90 hover:text-neon flex items-center gap-2 rounded-lg border px-5 py-2.5">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </Button>
                </Link>
                <Link href="mailto:m.zgoul25@gmail.com">
                  <Button className="from-neon to-neon-4 hover:from-neon-4 hover:to-neon text-navy-900 flex items-center gap-2 rounded-full bg-gradient-to-r px-5 py-2.5 transition-all">
                    <Mail className="h-4 w-4" />
                    Contact Me
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-80 w-80 overflow-hidden rounded-3xl">
              <Image
                src="/assets/profile-photo.jpg"
                alt="Mohammad Zgoul"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills & Technologies Section */}
      <section className="mb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="mb-6 text-3xl font-bold">Skills & Technologies</h2>
            <div className="border-navy-600 bg-navy-800/50 rounded-xl border p-8 backdrop-blur-sm">
              <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-6 text-3xl font-bold">Professional Experience</h2>

            <div className="border-navy-600 bg-navy-800/50 mb-8 rounded-xl border p-8 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    Junior Software Engineer
                  </h3>
                  <p className="text-blue-400">Vortex Systems</p>
                </div>
                <p className="text-text-400 text-sm">Jan 2023 - Present</p>
              </div>
              <ul className="text-text-400 mb-4 space-y-2">
                <li>
                  • Developed and maintained web applications using React.js,
                  Next.js and Node.js
                </li>
                <li>
                  • Created mobile applications with Flutter, implementing state
                  management with Riverpod
                </li>
                <li>
                  • Integrated AWS services including Lambda, S3, and
                  CloudFormation
                </li>
                <li>
                  • Collaborated with UI/UX designers to implement responsive,
                  accessible interfaces
                </li>
                <li>
                  • Participated in code reviews and implemented CI/CD pipelines
                  for continuous deployment
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  React.js
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Next.js
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Flutter
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Node.js
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  AWS
                </span>
              </div>
            </div>

            <div className="border-navy-600 bg-navy-800/50 mb-8 rounded-xl border p-8 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    Flutter Developer Intern
                  </h3>
                  <p className="text-blue-400">StarAppz</p>
                </div>
                <p className="text-text-400 text-sm">May 2022 - Aug 2022</p>
              </div>
              <ul className="text-text-400 mb-4 space-y-2">
                <li>
                  • Built cross-platform mobile applications with Flutter and
                  Dart
                </li>
                <li>
                  • Implemented responsive UI designs and custom animations
                </li>
                <li>• Integrated RESTful APIs and Firebase services</li>
                <li>
                  • Participated in Agile development processes and daily
                  standups
                </li>
                <li>
                  • Collaborated with senior developers to optimize application
                  performance
                </li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Flutter
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Dart
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Firebase
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  UI/UX
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="mb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="mb-6 text-3xl font-bold">Education</h2>

            <div className="border-navy-600 bg-navy-800/50 rounded-xl border p-8 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">
                    Bachelor of Science in Computer Science
                  </h3>
                  <p className="text-blue-400">University of Petra</p>
                </div>
                <p className="text-text-400 text-sm">2019 - 2023</p>
              </div>
              <p className="text-text-400 mb-4">
                Graduated with honors, focusing on software development and
                advanced programming concepts. Participated in programming
                competitions and hackathons, showcasing problem-solving
                abilities and teamwork.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Data Structures
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Algorithms
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Software Engineering
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Web Development
                </span>
                <span className="border-navy-600 bg-navy-700/50 rounded-full border px-3 py-1 text-xs">
                  Mobile Development
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* My Approach Section */}
      <section className="mb-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="mb-6 text-3xl font-bold">My Approach</h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="border-navy-600 bg-navy-800/50 rounded-xl border p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-blue-400">
                  User-Centered Design
                </h3>
                <p className="text-text-400">
                  I believe in creating applications that prioritize user
                  experience. Every feature is crafted with the end-user in
                  mind, ensuring intuitive and accessible interfaces.
                </p>
              </div>

              <div className="border-navy-600 bg-navy-800/50 rounded-xl border p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-blue-400">
                  Clean Architecture
                </h3>
                <p className="text-text-400">
                  I'm committed to writing clean, maintainable code with proper
                  architecture patterns. This ensures scalability and makes
                  future updates more efficient.
                </p>
              </div>

              <div className="border-navy-600 bg-navy-800/50 rounded-xl border p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-blue-400">
                  Continuous Learning
                </h3>
                <p className="text-text-400">
                  Technology evolves rapidly, and I'm dedicated to staying at
                  the forefront. I actively pursue new skills and best practices
                  to deliver cutting-edge solutions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Beyond Coding Section */}
      <section>
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="mb-6 text-3xl font-bold">Beyond Coding</h2>

            <div className="border-navy-600 bg-navy-800/50 rounded-xl border p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Aviation Enthusiast
                  </h3>
                  <p className="text-text-400 mb-4">
                    When not coding, I'm passionate about aviation. I spend
                    hours on flight simulators and tracking real flights,
                    fascinated by the engineering marvels that connect our
                    world. This interest in aviation highlights my meticulous
                    attention to detail and love for complex systems – qualities
                    that carry over to my development work.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold text-blue-400">
                    Continuous Personal Projects
                  </h3>
                  <p className="text-text-400 mb-4">
                    I'm always working on personal projects to explore new
                    technologies and sharpen my skills. These projects range
                    from mobile apps to web platforms, each serving as a
                    playground for innovation and learning. Building things from
                    scratch gives me insights that enhance my professional work.
                  </p>
                  <div className="flex">
                    <Link href="/projects">
                      <Button className="border-navy-600 bg-navy-800/70 hover:border-neon/40 hover:bg-navy-800/90 hover:text-neon flex items-center gap-2 rounded-lg border px-5 py-2.5">
                        <ExternalLink className="h-4 w-4" />
                        View My Projects
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
