"use client";

// components/TechStack.tsx
import React, { useState } from "react";
import {
  FaJs,
  FaPhp,
  FaPython,
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaGit,
  FaGithub,
  FaBitbucket,
  FaWordpress,
  FaElementor,
} from "react-icons/fa";
import {
  SiTypescript,
  SiCplusplus,
  SiNextdotjs,
  SiIonic,
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiClerk,
  SiAdobephotoshop,
  SiAdobeillustrator,
} from "react-icons/si";
// import { TbBrandC } from "react-icons/tb";

// Define the skill interface
interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

const TechStack: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Tech skills data array
  const skills: Skill[] = [
    { name: "JavaScript", icon: <FaJs size={24} />, color: "#F7DF1E" },
    { name: "TypeScript", icon: <SiTypescript size={24} />, color: "#3178C6" },
    { name: "PHP", icon: <FaPhp size={24} />, color: "#777BB4" },
    { name: "Python", icon: <FaPython size={24} />, color: "#3776AB" },
    // { name: "C", icon: <TbBrandC size={24} />, color: "#A8B9CC" },
    { name: "C++", icon: <SiCplusplus size={24} />, color: "#00599C" },
    { name: "React", icon: <FaReact size={24} />, color: "#61DAFB" },
    { name: "Vue.js", icon: <FaVuejs size={24} />, color: "#4FC08D" },
    { name: "Next.js", icon: <SiNextdotjs size={24} />, color: "#000000" },
    { name: "Ionic", icon: <SiIonic size={24} />, color: "#3880FF" },
    { name: "Node.js", icon: <FaNodeJs size={24} />, color: "#339933" },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss size={24} />,
      color: "#06B6D4",
    },
    { name: "MySQL", icon: <SiMysql size={24} />, color: "#4479A1" },
    { name: "MongoDB", icon: <SiMongodb size={24} />, color: "#47A248" },
    { name: "Supabase", icon: <SiSupabase size={24} />, color: "#3ECF8E" },
    { name: "Clerk", icon: <SiClerk size={24} />, color: "#6C47FF" },
    { name: "Git", icon: <FaGit size={24} />, color: "#F05032" },
    { name: "GitHub", icon: <FaGithub size={24} />, color: "#181717" },
    { name: "BitBucket", icon: <FaBitbucket size={24} />, color: "#0052CC" },
    { name: "WordPress", icon: <FaWordpress size={24} />, color: "#21759B" },
    { name: "Elementor", icon: <FaElementor size={24} />, color: "#92003B" },
    {
      name: "Photoshop",
      icon: <SiAdobephotoshop size={24} />,
      color: "#31A8FF",
    },
    {
      name: "Illustrator",
      icon: <SiAdobeillustrator size={24} />,
      color: "#FF9A00",
    },
  ];

  return (
    <section className="py-16 container">
        <h2 className="text-white text-3xl font-bold mb-8">Tech Stack</h2>
        <div className="flex flex-wrap gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-center bg-dark-2/20 p-3 rounded-md transition-all duration-300 hover:shadow-md"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                style={{
                  color: hoveredSkill === skill.name ? skill.color : "white",
                }}
                className="transition-colors duration-300"
              >
                {skill.icon}
              </div>
              <span className="text-white ml-3 text-sm">{skill.name}</span>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TechStack;
