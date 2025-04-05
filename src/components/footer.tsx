import React from "react";
import Image from "next/image";
import { BackgroundBeams } from "./ui/background-beams";

const PortfolioFooter = () => {
  return (
    <section className="relative h-100 w-full items-center justify-center overflow-clip mt-50 p-5 border-t border-dark-2">
      <BackgroundBeams />
      <Image
        src="/z-logo.svg"
        alt="Logo"
        width={50}
        height={50}
        className="absolute top-10 left-10 w-25 h-25 pointer-events-none"
      />
    </section>
  );
};

export default PortfolioFooter;
