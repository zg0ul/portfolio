import Bento from "@/sections/home/Bento";
import ContactForm from "@/sections/home/ContactForm";
import Hero from "@/sections/home/Hero";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import React from "react";

const PortfolioPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <Hero />

    <Bento />

    <FeaturedProjects />

    <ContactForm />
  </div>
);

export default PortfolioPage;
