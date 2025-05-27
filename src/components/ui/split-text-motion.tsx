"use client";

import { useEffect } from "react";
import { motion, useAnimation, Variants } from "motion/react";

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; transform: string };
  animationTo?: { opacity: number; transform: string };
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text = "",
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  easing = "easeInOut",
  threshold = 0,
  rootMargin = "0px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  // Parse text into words and letters
  const words = text.split(" ").map((word) => word.split(""));
  const controls = useAnimation();

  // Define letter animation variants
  const letterVariants: Variants = {
    hidden: {
      opacity: animationFrom.opacity,
      transform: animationFrom.transform,
    },
    visible: (i: number) => ({
      opacity: animationTo.opacity,
      transform: animationTo.transform,
      transition: {
        delay: i * (delay / 1000),
        duration: 0.3,
        ease: easing,
      },
    }),
  };

  useEffect(() => {
    const handleAnimation = async () => {
      await controls.start("visible");
      if (onLetterAnimationComplete) {
        onLetterAnimationComplete();
      }
    };

    handleAnimation();
  }, [controls, onLetterAnimationComplete]);

  return (
    <motion.p
      className={`split-parent inline overflow-hidden ${className}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
      initial="hidden"
      viewport={{ once: true, amount: 0.1 }}
      whileInView="visible"
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.map((letter, letterIndex) => {
            const index =
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) +
              letterIndex;

            return (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                className="inline-block will-change-transform"
              >
                {letter}
              </motion.span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}>
            &nbsp;
          </span>
        </span>
      ))}
    </motion.p>
  );
};

export default SplitText;
