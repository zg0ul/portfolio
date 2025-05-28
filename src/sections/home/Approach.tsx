"use client";

import { AnimatedCard } from "@/components/ui/animated_card";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";
import * as motion from "motion/react-client";
import { Eye, Building2, Lightbulb } from "lucide-react";

const approachPrinciples = [
  {
    title: "Perfectionist",
    description:
      "I care deeply about the details. From layout to logic, I refine every piece until it feels just right—balanced, clean, and intentional.",
    icon: Eye,
    color: "from-blue-400/20 to-transparent",
    accentColor: "text-blue-400",
    borderColor: "hover:border-blue-400/30",
  },
  {
    title: "Builder-Mindset",
    description:
      "I approach problems like systems. I think big-picture, connect the dots, and turn ideas into real, working things—always with a purpose.",
    icon: Building2,
    color: "from-green-400/20 to-transparent",
    accentColor: "text-green-400",
    borderColor: "hover:border-green-400/30",
  },
  {
    title: "Curious Problem Solver",
    description:
      "I chase clarity. I ask why, explore how, and iterate until complex challenges feel simple and the solution feels inevitable.",
    icon: Lightbulb,
    color: "from-yellow-400/20 to-transparent",
    accentColor: "text-yellow-400",
    borderColor: "hover:border-yellow-400/30",
  },
];

const ApproachCard: React.FC<{
  principle: (typeof approachPrinciples)[0];
  index: number;
}> = ({ principle, index }) => {
  const IconComponent = principle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full will-change-transform"
    >
      <AnimatedCard
        className={`group h-full transition-all duration-300 ${principle.borderColor}`}
      >
        <div className="relative z-10 h-full p-6">
          {/* Icon with gradient background */}
          <div
            className={`relative mb-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r p-4 ${principle.color}`}
          >
            <IconComponent className={`h-8 w-8 ${principle.accentColor}`} />
          </div>

          {/* Title */}
          <h3 className="text-text-200 mb-4 text-xl font-bold lg:text-2xl">
            {principle.title}
          </h3>

          {/* Description */}
          <p className="text-text-300 leading-relaxed">
            {principle.description}
          </p>

          {/* Decorative gradient overlay */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${principle.color}`}
          />
        </div>
      </AnimatedCard>
    </motion.div>
  );
};

export default function Approach() {
  return (
    <section id="approach" className="container mb-38">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center will-change-transform"
      >
        <h2 className="section-title:small relative inline-block text-center">
          My Approach
          <AnimatedUnderline />
        </h2>

        <p className="section-description:small mx-auto mb-8 max-w-3xl text-center">
          How I approach every project and challenge
        </p>

        {/* Approach Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {approachPrinciples.map((principle, index) => (
            <ApproachCard
              key={principle.title}
              principle={principle}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
