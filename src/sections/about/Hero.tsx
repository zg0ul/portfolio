import Portrait from "@/components/about/portrait";
import SocialLinks from "@/components/SocialLinks";
import { motion } from "framer-motion";
import React from "react";

function AboutPageHero() {
  return (
    <section className="relative mb-24">
      <div className="relative z-10 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center md:flex-row md:items-center md:justify-between"
        >
          <div className="mb-8 px-4 md:mb-0">
            <h1 className="gradient-title mb-6 text-2xl font-bold md:text-4xl">
              I'm Mohammad — Tech-Savvy Engineer
            </h1>

            <p className="text-text-400 mb-8 text-lg">
              I'm Mohammad Zgoul, I go by zg0ul online, an engineer passionate
              about bridging AI, hardware, and software to build meaningful
              technology. My journey has taken me through developing computer
              vision systems, geospatial AI solutions, assistive tech, and
              full-stack applications. I enjoy approaching problems from
              multiple angles, drawing on my background in machine learning,
              Python, Flutter, and Next.js. Right now, I'm focused on Flutter
              development, constantly learning and aiming to create solutions
              that make a real difference.
            </p>
            <SocialLinks size="xl" />
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Portrait />
            {/* <Image
                  src="/assets/profile-photo.jpg"
                  alt="Mohammad Zgoul"
                  fill
                  className="object-cover"
                  priority
                /> */}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutPageHero;
