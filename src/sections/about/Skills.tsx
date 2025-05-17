"use client";

import AnimatedUnderline from "@/components/ui/AnimatedUnderline";
import * as motion from "motion/react-client";

interface SkillType {
  category: string;
  skills: string[];
  color: string;
}

const skillsData: SkillType[] = [
  {
    category: "Engineering",
    skills: [
      "3D Printing / CAD Design",
      "Fusion 360 / AutoCAD",
      "Laser Cutting",
      "Circuit Design",
      "Arduino / Raspberry Pi",
    ],
    color: "from-emerald-400/20 to-transparent",
  },
  {
    category: "Web Development",
    skills: [
      "React.js / Next.js",
      "TypeScript / JavaScript",
      "Node.js / Express",
      "Tailwind CSS / Material UI",
      "PostgreSQL / MongoDB / Supabase",
    ],
    color: "from-blue-400/20 to-transparent",
  },
  {
    category: "Mobile Development",
    skills: [
      "Flutter / Dart",
      "Riverpod / Provider State Management",
      "Firebase Integration",
      "Cross-platform Development",
      "Native Features Integration",
    ],
    color: "from-cyan-400/20 to-transparent",
  },
  {
    category: "AI & Machine Learning",
    skills: [
      "LLM Integration (OpenAI, Gemini)",
      "PyTorch / TensorFlow",
      "NLP / Computer Vision",
      "Data Processing",
      "AI-powered Application Development",
    ],
    color: "from-purple-400/20 to-transparent",
  },
];

export default function AboutPageSkills() {
  return (
    <section className="container mb-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center will-change-transform"
        >
          <h2 className="section-title:small relative mb-8 inline-block text-center">
            Skills & Technologies
            <AnimatedUnderline />
          </h2>

          <div className="mt-4 grid gap-8 md:grid-cols-2">
            {skillsData.map((skillSet) => (
              <motion.div
                key={skillSet.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="border-navy-600 bg-navy-800/30 overflow-hidden rounded-xl border backdrop-blur-sm"
              >
                <div
                  className={`relative bg-gradient-to-r px-6 py-4 ${skillSet.color}`}
                >
                  <h3 className="text-foreground text-xl font-bold">
                    {skillSet.category}
                  </h3>
                </div>
                <ul className="p-6 pt-4">
                  {skillSet.skills.map((skill, index) => (
                    <li key={index} className="mb-2 flex items-start">
                      <span className="bg-neon mt-1.5 mr-2 inline-block h-1.5 w-1.5 rounded-full"></span>
                      <span className="text-foreground/90">{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
