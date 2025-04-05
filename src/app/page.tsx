import PortfolioFooter from "@/components/footer";
import Zg0ulLogo from "@/components/Logo";
import TechStack from "@/components/TechStack";
// import DotBackground from "@/components/ui/dot-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import TypewriterComponent from "@/components/ui/typer-writer-component";
import React from "react";

const PortfolioPage: React.FC = () => {
  return (
    <>
      <div className="h-(calc(var(--header-h) + var(--hero-h))) relative ">
        {/* <DotBackground /> */}
        <StarsBackground />
        <ShootingStars />
        <header className="portfolio-header">
          <Zg0ulLogo />

          <nav className="hidden md:block">
            <ul>
              <li>
                <a href="#projects" className="nav-link">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#resume" className="nav-link">
                  Resume
                </a>
              </li>
              <li>
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
              <li>
                <a href="#awards" className="nav-link">
                  Awards
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <section className="hero-section">
          <div className="title-container">
            <div className="flex justify-around items-center text-lg">
              <p className="">Amman, Jordan</p>
              <div className="w-auto h-[40] px-5 border flex justify-center items-center rounded-full border-[#38A349] bg-[#12321E] ">
                <div className="size-[10] bg-[#38A349] rounded-full mr-2" />
                <span className="text-[#38A349] font-bold">Open to work</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold leading-tight mb-8">
              <span className="text-primary">Hey! </span>{" "}
              <span>I&apos;M Mohammad Zgoul</span>
              <span>
                <TypewriterComponent />
              </span>
            </h2>

            <p className="text-md md:text-xl lg:text-2xl font-light leading-tight mb-8">
              I love building all sorts of software, <br />
              from web applications to mobile apps.
            </p>

            {/* <div className="action-buttons">
            <button className="btn btn-primary">Projects</button>
            <button className="btn btn-secondary">About Me</button>
          </div> */}
          </div>
        </section>
      </div>
      <TechStack />

      <PortfolioFooter />
    </>
  );
};

export default PortfolioPage;
