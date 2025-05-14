import { motion } from "framer-motion";
import React from "react";
import { MainMenusGradientCard } from "@/components/ui/animated_card";

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  location?: string;
  description: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "AI Engineer Intern",
    company: "SAGER", // Replace with actual company name
    duration: "Jan 2025 - Present", // Replace with actual dates
    location: "Amman, Jordan",
    description: [
      "Developed computer vision and geospatial AI solutions for ultra-HD aerial mapping applications",
      "Built custom motion detection system using YOLOv9 for polygon-based vehicle tracking with multi-class identification",
      "Developed UAE license plate detection model with custom post-processing algorithms for multi-emirate plate recognition",
      "Created CNN models from scratch and implemented custom image processing algorithms without external libraries",
      'Built "Searchable Images" - NextJS/TypeScript application with Gemini AI integration for automatic image categorization',
      'Developed "Searchable Maps" - Interactive geospatial query system using PostgreSQL/PostGIS with natural language processing',
      "Processed geospatial data using Python (rasterio), QGIS, and x-anylabeling for map annotation",
      "Transformed GeoJSON data to structured database formats for efficient spatial queries",
    ],
    skills: [
      "Computer Vision",
      "YOLOv9",
      "CNN",
      "Python",
      "PostgreSQL",
      "PostGIS",
      "Next.js",
      "TypeScript",
      "Gemini AI",
      "QGIS",
      "Leaflet.js",
    ],
  },

  {
    title: "Fabrication Engineer Intern",
    company: "Orange Jordan",
    duration: "Jul 2022 - Nov 2022",
    location: "Amman, Jordan",
    description: [
      "Divided into teams to build a project with the theme: Tech for Good",
      "Built a pair of glasses that help blind people read by converting written content into audible content",
      "Designed reading glasses using Fusion360 with features ensuring smooth reading experience",
      "Led team design efforts, learning 3D modeling, 3D printing, and Laser Cutting techniques",
    ],
    skills: [
      "3D Modeling",
      "Computer-Aided Design (CAD)",
      "Fusion360",
      "3D Printing",
      "Laser Cutting",
    ],
  },
];

const ExperienceCard: React.FC<{
  experience: ExperienceItem;
  index: number;
}> = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pb-8 pl-8 last:pb-0"
    >
      {/* Timeline line */}
      <div className="absolute top-0 left-0 h-full w-px bg-gray-700" />

      {/* Timeline dot aligned with title */}
      <div className="absolute top-[1.75rem] left-[-4px] h-2 w-2 rounded-full bg-blue-500" />

      {/* Bento Card */}
      <MainMenusGradientCard
        className="w-full"
      >
        <div className="z-10 p-6">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {experience.title}
              </h3>
              <p className="text-lg text-blue-400">{experience.company}</p>
              {experience.location && (
                <p className="text-sm text-gray-400">{experience.location}</p>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-400 sm:mt-0">
              {experience.duration}
            </p>
          </div>

          <ul className="mb-4 space-y-2">
            {experience.description.map((item, i) => (
              <li key={i} className="flex text-gray-300">
                <span className="mr-2 text-blue-400">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-navy-700/50 border-navy-600 rounded-full border px-3 py-1 text-xs text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </MainMenusGradientCard>
    </motion.div>
  );
};

const AboutPageExperience: React.FC = () => {
  return (
    <section className="container mb-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="mb-12 text-center text-4xl font-bold text-white">
            Professional Experience
          </h2>

          <div className="relative">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={index}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPageExperience;
