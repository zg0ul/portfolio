import Socials from "@/components/Socials";
import TechStack from "@/components/TechStack";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { MapPin } from "lucide-react";
import React from "react";

const PortfolioPage: React.FC = () => (
  <div className="flex flex-col justify-center items-center">
    <div className="">
      {/* <DotBackground /> */}
      <StarsBackground />
      <ShootingStars />

      <section className="hero-section">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="title-container">
            <div className="flex justify-around items-center text-lg">
              <div className="flex items-center gap-1">
                <MapPin />
                <p className="">Amman, Jordan</p>
              </div>
              <div className="w-auto h-[40] px-5 border flex justify-center items-center rounded-full border-[#38A349] bg-[#12321E] ">
                <div className="size-[10] bg-[#38A349] rounded-full mr-2" />
                <span className="text-[#38A349] font-bold">Open to work</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight mb-8">
              <span className="text-primary">Hey! </span>
              <span>I&apos;M Mohammad Zgoul</span>
              <ContainerTextFlip />
            </h2>

            <p className="text-md md:text-xl lg:text-2xl font-light leading-tight mb-8">
              I love building all sorts of software, <br />
              from web applications to mobile apps.
            </p>
            <Socials />

            {/* <div className="action-buttons">
        <button className="btn btn-primary">Projects</button>
        <button className="btn btn-secondary">About Me</button>
      </div> */}
          </div>
        </div>
      </section>
    </div>
    <TechStack />
  </div>
);

export default PortfolioPage;
