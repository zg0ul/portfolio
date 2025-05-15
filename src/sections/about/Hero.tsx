import Portrait from "@/components/about/portrait";
import SocialLinks from "@/components/SocialLinks";
import React from "react";

function AboutPageHero() {
  return (
    <section className="relative mb-24">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Text Content */}
        <div className="w-full px-4 text-center lg:w-1/2 lg:px-0 lg:text-left">
          <h1 className="gradient-title mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">
            I'm Mohammad — Tech-Savvy Engineer
          </h1>

          <p className="text-text-400 mb-8 text-base leading-relaxed md:text-lg lg:text-xl">
            I'm Mohammad Zgoul, I go by zg0ul online, an engineer passionate
            about bridging AI, hardware, and software to build meaningful
            technology. My journey has taken me through developing computer
            vision systems, geospatial AI solutions, assistive tech, and
            full-stack applications. I enjoy approaching problems from multiple
            angles, drawing on my background in machine learning, Python,
            Flutter, and Next.js. Right now, I'm focused on Flutter development,
            constantly learning and aiming to create solutions that make a real
            difference.
          </p>

          {/* Social Links - Centered on mobile, left-aligned on desktop */}
          <div className="flex justify-center lg:justify-start">
            <div className="hidden md:block">
              <SocialLinks size="xl" />
            </div>
            <div className="block md:hidden">
              <SocialLinks size="md" />
            </div>
          </div>
        </div>

        {/* Portrait - Below text on mobile, side-by-side on desktop */}
        <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
          <Portrait />
        </div>
      </div>
    </section>
  );
}

export default AboutPageHero;
