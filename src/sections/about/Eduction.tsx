"use client";

import AnimatedUnderline from "@/components/ui/AnimatedUnderline";
import React, { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import * as motion from "motion/react-client";
import { FaRobot, FaCode, FaCogs } from "react-icons/fa";

function AboutPageEducation() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="container mb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center will-change-transform"
      >
        <h2 className="relative mb-8 inline-block text-center text-3xl font-bold">
          Education
          <AnimatedUnderline />
        </h2>

        {/* Education Timeline */}
        <div className="relative">
          {/* Vertical line with glow effect */}
          <div className="from-neon-10/50 via-neon-10/30 absolute top-0 left-8 h-full w-0.5 bg-gradient-to-b to-transparent md:left-12"></div>

          {/* Education Entry */}
          <motion.div
            className="relative flex items-start gap-6 md:gap-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Timeline Dot with enhanced glow */}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center md:h-24 md:w-24">
              <motion.div
                className="border-neon-4/70 bg-navy-800 relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 md:h-14 md:w-14"
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 15px rgba(80, 250, 123, 0.5)",
                }}
                animate={
                  isHovered
                    ? { boxShadow: "0 0 15px rgba(80, 250, 123, 0.5)" }
                    : {}
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <FaGraduationCap className="text-neon-4 h-5 w-5 md:h-6 md:w-6" />
              </motion.div>
              {/* Year Badge with enhanced styling */}
              <span className="bg-navy-700/50 text-neon-10/90 absolute -bottom-6 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm md:text-sm">
                2020 - 2025
              </span>
            </div>

            {/* Content with improved card styling */}
            <div className="flex-1 pb-16 text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-navy-600/50 bg-navy-800/30 will-change-opacity hover:border-neon-10/20 hover:shadow-glow-sm rounded-xl border p-6 shadow-lg backdrop-blur-sm"
              >
                {/* Degree Header with improved typography */}
                <div className="mb-6">
                  <h3 className="text-text-200 mb-2 text-2xl font-bold md:text-2xl">
                    Mechatronics Engineering
                  </h3>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <p className="text-navy-200 flex items-center text-lg">
                      The Hashemite University
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="bg-neon/15 text-neon shadow-glow-xs rounded-md px-3 py-1 text-sm font-medium">
                        GPA: 3.56/4.0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description with icons to visualize mechatronics */}
                <div className="mb-6">
                  <p className="text-text-300 mb-4 text-lg leading-relaxed">
                    Mechatronics engineering is an interdisciplinary field that
                    combines mechanical, electrical, and software engineering to
                    create innovative robotic and automated systems.
                  </p>

                  {/* Icons representing mechatronics disciplines */}
                  <div className="mt-6 flex justify-center gap-8">
                    <div className="flex flex-col items-center">
                      <div className="bg-navy-700 shadow-glow-xs mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <FaCogs className="text-neon-4 h-6 w-6" />
                      </div>
                      <span className="text-navy-200 text-sm">Mechanical</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-navy-700 shadow-glow-xs mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <FaCode className="text-neon-4 h-6 w-6" />
                      </div>
                      <span className="text-navy-200 text-sm">Software</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-navy-700 shadow-glow-xs mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <FaRobot className="text-neon-4 h-6 w-6" />
                      </div>
                      <span className="text-navy-200 text-sm">Robotics</span>
                    </div>
                  </div>
                </div>

                {/* Specialization */}
                <div className="bg-navy-700/50 rounded-lg p-4">
                  <h4 className="text-neon-10/90 mb-2 font-semibold">
                    Specialization
                  </h4>
                  <p className="text-text-400">
                    Focused on autonomous systems and robotics, combining
                    mechanical engineering principles with programming
                    expertise. Completed capstone project on Crack detection wall climbing robot.
                  </p>
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
