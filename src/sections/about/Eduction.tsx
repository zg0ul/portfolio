import { motion } from "motion/react";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";

function AboutPageEducation() {
  return (
    <section className="container mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="section-title:small">Education</h2>

        {/* Education Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="from-neon-10/30 via-neon-10/20 absolute top-0 left-8 h-full w-0.5 bg-gradient-to-b to-transparent md:left-12"></div>

          {/* Education Entry */}
          <motion.div
            className="relative flex items-start gap-6 md:gap-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Timeline Dot */}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center md:h-24 md:w-24">
              <div className="border-neon-4/50 bg-navy-800 shadow-glow-sm relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-transform duration-300 hover:scale-110 md:h-12 md:w-12">
                <FaGraduationCap className="text-neon-4 h-4 w-4 md:h-5 md:w-5" />
              </div>
              {/* Year Badge */}
              <span className="text-neon-10/80 absolute -bottom-6 text-xs font-medium md:text-sm">
                2020 - 2025
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 pb-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {/* Degree Header */}
                <div className="mb-6">
                  <h3 className="text-text-300 mb-2 text-xl font-bold md:text-2xl">
                    Mechatronics Engineering
                  </h3>
                  <p className="text-navy-300 mt-1 text-lg">
                    The Hashemite University
                  </p>
                </div>

                {/* Description */}
                <p className="text-text-400 mb-6 text-lg leading-relaxed">
                  Graduated with honors, focusing on software development and
                  advanced programming concepts. Participated in programming
                  competitions and hackathons, showcasing problem-solving
                  abilities and teamwork.
                </p>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {[
                    "Data Structures",
                    "Algorithms",
                    "Software Engineering",
                    "Web Development",
                    "Mobile Development",
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="group relative"
                    >
                      <div className="bg-neon-10/5 group-hover:bg-neon-10/10 absolute inset-0 rounded-lg blur-xl transition-all"></div>
                      <div className="border-navy-600 bg-navy-700/50 hover:border-neon/30 hover:bg-navy-600/60 text-text-400 relative rounded-lg border px-4 py-2 text-center text-sm font-medium transition-all duration-200">
                        {skill}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutPageEducation;
