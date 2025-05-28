import Portrait from "@/components/about/portrait";
import SocialLinks from "@/components/SocialLinks";
import React from "react";

function AboutPageHero() {
  return (
    <section className="relative mb-24">
      <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between">
        {/* Text Content */}
        <div className="h-full w-full px-4 lg:px-0 lg:text-left">
          <h1 className="gradient-title mb-6 text-xl font-extrabold md:text-3xl lg:text-4xl">
            I'm Mohammad - Tech-Savvy Engineer
          </h1>

          <p className="text-text-400 mb-8 text-base leading-normal tracking-wide md:text-lg lg:text-xl">
            I'm Mohammad Zgoul (zg0ul), a software engineer with a mechatronics
            background. Entirely self-taught in programming, I specialize in
            Flutter development while exploring web technologies like Next.js.
            I'm passionate about continuous learning and creating technology
            that makes a difference.
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
        <div className="flex h-full w-full justify-center p-2 md:w-xl lg:w-3xl lg:justify-end">
          <Portrait />
        </div>
      </div>
    </section>
  );
}

export default AboutPageHero;
