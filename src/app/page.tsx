import TechStack from "@/components/TechStack";
import Bento from "@/sections/home/Bento";
import ContactForm from "@/sections/home/ContactForm";
import Hero from "@/sections/home/Hero";
import React from "react";

const PortfolioPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <Hero />

    <Bento />

    <TechStack />

    <ContactForm />
  </div>
);

export default PortfolioPage;
