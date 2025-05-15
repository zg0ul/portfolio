import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import Image from "next/image";
import portrait from "@/assets/images/portrait.jpeg";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { motion } from "motion/react";

export default function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]"
    >
      <CardContainer className="aspect-square w-full p-2 sm:p-4">
        <CardBody className="relative h-full w-full">
          <div className="border-neon flex h-full w-full items-center justify-center rounded-lg border sm:border-2">
            {/* Background canvas effect - positioned absolute */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <CanvasRevealEffect /* used for the background noise dots effect */
                animationSpeed={5}
                containerClassName="bg-background w-full h-full"
                colors={[
                  [134, 213, 98], // neon green
                  [179, 229, 156], // neon blue
                ]}
                dotSize={2}
                showGradient={false}
              />
            </div>
            {/* Border and content container */}
            <CardItem
              className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg p-2 sm:p-4"
              translateZ={50}
            >
              <Image
                src={portrait}
                alt="Portrait"
                width={450}
                height={450}
                className="shadow-navy-800 border-neon-10 relative z-10 h-full w-full rounded-lg border object-cover shadow-xl sm:rounded-xl sm:shadow-2xl"
                priority
                draggable="false"
              />
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
