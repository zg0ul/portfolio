"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const Zg0ulLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const fillColor = "#d4dbe5";

  return (
    <motion.svg
      height="50"
      viewBox="0 0 1100 500"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Left Bracket */}
      <motion.path
        d="M160.613,418.166,15.588,253.4V210.989L159.522,64.339v82.175L72.459,232.978l88.154,99.4Z"
        style={{
          fill: fillColor,
          stroke: fillColor,
          strokeMiterlimit: 10,
          strokeWidth: 4,
        }}
      />

      {/* Z */}
      <motion.path
        d="M318.584,367.06l13.247-14.525-.024,16.892.026,53.773H182.421V396.978l77.094-282.025H196.723l-11.031,10.44V59.871H328.536V86.194L250.119,367.058l53.877,0Z"
        style={{
          fill: fillColor,
          stroke: fillColor,
          strokeMiterlimit: 10,
          strokeWidth: 4,
        }}
      />

      {/* G, Ø, U, L */}
      <motion.g
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* G */}
        <motion.path
          d="M375.968,405.035q-16.8-19.406-24.9-59.075t-8.1-100.748q-.6-44.526,3-76.2t10.8-53.08q7.2-21.4,17.1-33.97t21.6-17.7a58.563,58.563,0,0,1,23.7-5.135q14.4,0,25.2,4.58a49.806,49.806,0,0,1,18.3,13.17,62.15,62.15,0,0,1,11.7,20.613l-18,46.379-1.8,5.153-4.2-1.145a34.089,34.089,0,0,1-2.1-10.879q-.307-6.294-5.1-14.315a34.24,34.24,0,0,0-5.4-5.153,21.884,21.884,0,0,0-6.6-3.435,23.706,23.706,0,0,0-7.2-1.145,18.151,18.151,0,0,0-10.8,3.426q-4.809,3.422-8.1,11.684t-5.7,22.232a319.9,319.9,0,0,0-3.6,35.34q-1.211,21.378-1.2,51.022,0,37.053,1.5,62.707a396.441,396.441,0,0,0,4.2,41.611q2.7,15.971,6.9,23.091t9.6,7.122a17.413,17.413,0,0,0,4.5-.564,15.291,15.291,0,0,0,3.6-1.422,14.341,14.341,0,0,0,2.7-2,18.61,18.61,0,0,0,2.4-2.845V287.02h-16.8V233.2h61.8V390.184q-13.206,18.277-28.2,26.267t-29.4,7.989Q392.759,424.44,375.968,405.035Z"
          style={{
            fill: fillColor,
            stroke: fillColor,
            strokeMiterlimit: 10,
            strokeWidth: 4,
          }}
        />

        {/* Ø */}
        <motion.path
          d="M559.569,424.44q-18.6,0-33.6-16.319t-24-56.4q-9-40.072-9-109.936,0-69.274,9-109.077t24-56.686q14.989-16.882,33.6-16.891,18.591,0,33.6,16.891,14.991,16.9,23.7,56.686,8.691,39.8,8.7,109.077,0,71.582-8.7,111.367-8.7,39.8-23.7,55.541T559.569,424.44Zm0-53.823q6.6,0,9.9-12.31,3.289-12.306,4.5-40.653t1.2-75.868q0-45.225-1.5-73.577t-4.8-41.8q-3.3-13.446-9.3-13.455-5.4,0-9,13.455t-5.4,41.8q-1.8,28.343-1.8,73.577,0,47.534,1.8,75.868t5.7,40.653Q554.765,370.626,559.569,370.617Z"
          style={{
            fill: fillColor,
            stroke: fillColor,
            strokeMiterlimit: 10,
            strokeWidth: 4,
          }}
        />

        <motion.polygon
          points="516.746 426.23 495.975 426.23 598.447 56.84 620.48 56.84 516.746 426.23"
          style={{ fill: fillColor }}
        />

        {/* U */}
        <motion.path
          d="M657.97,395.222q-12.011-29.351-12-89.777V59.132h57V63.16a14.9,14.9,0,0,0-4.5,7.481q-.9,4.033-.9,13.812V306.02q0,35.69,2.4,49.78,2.389,14.109,10.2,14.1,8.4,0,10.5-16.689t2.1-48.918V59.132h51.6V303.718q0,44.322-5.7,70.5-5.709,26.193-19.5,37.694-13.809,11.507-39,12.085Q669.965,424.565,657.97,395.222Z"
          style={{
            fill: fillColor,
            stroke: fillColor,
            strokeMiterlimit: 10,
            strokeWidth: 4,
          }}
        />

        {/* L */}
        <motion.path
          d="M798.369,59.132h57v4.1a15.249,15.249,0,0,0-4.5,7.614q-.9,4.1-.9,14.056V368.953h55.355l17.244-19.39v74.443h-124.2Z"
          style={{
            fill: fillColor,
            stroke: fillColor,
            strokeMiterlimit: 10,
            strokeWidth: 4,
          }}
        />
      </motion.g>

      {/* Right Bracket */}
      <motion.path
        d="M938.028,418.166V332.377l88.223-99.4-87.132-86.464V64.339l143.934,146.65V253.4Z"
        animate={{
          x: isHovered ? -585 : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        style={{
          fill: fillColor,
          stroke: fillColor,
          strokeMiterlimit: 10,
          strokeWidth: 4,
        }}
      />
    </motion.svg>
  );
};

export default Zg0ulLogo;
