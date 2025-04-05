"use client";

import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterComponent = () => {
  return (
    <Typewriter
      options={{
        strings: [
          "Mechatronics Engineer",
          "Software Engineer",
          "Flutter Developer",
        ],
        autoStart: true,
        loop: true,
        delay: 75,
      }}
    />
  );
};

export default TypewriterComponent;
