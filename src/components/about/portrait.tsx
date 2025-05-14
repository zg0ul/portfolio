"use client";
import React from "react";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Image from "next/image";
import portrait from "@/assets/images/portrait.jpeg";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export default function Portrait() {
  return (
    <CardContainer className="h-120 w-120 p-4">
      <CardBody className="relative h-full w-full">
        <div className="border-neon flex h-full w-full items-center justify-center rounded-lg border-2">
          {/* Background canvas effect - positioned absolute */}
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <CanvasRevealEffect /* used for the background noise dots effect */
              animationSpeed={3}
              containerClassName="bg-background w-full h-full"
              colors={[
                [134, 213, 98], // neon green
                [179, 229, 156], // neon blue
              ]}
              dotSize={3}
              showGradient={false}
            />
          </div>
          {/* Border and content container */}
          <CardItem
            className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg"
            translateZ={75}
          >
            <Image
              src={portrait}
              alt="Portrait"
              width={400}
              height={400}
              className="shadow-navy-800 border-neon-10 relative z-10 rounded-xl border object-cover shadow-2xl"
              priority
              draggable="false"
            />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
