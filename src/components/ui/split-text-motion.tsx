"use client";

import { useEffect, useRef, useState } from "react";
import { motion, Variants, useInView } from "motion/react";

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
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
  });

  // Parse text into words and letters
  const words = text.split(" ").map((word) => word.split(""));

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
        duration: 0.5,
        ease: easing,
      },
    }),
  };

  // Container variants for smooth coordination
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      setShouldAnimate(true);
      if (onLetterAnimationComplete) {
        // Calculate total animation time and call callback
        const totalLetters = text.replace(/\s/g, "").length;
        const totalTime = totalLetters * delay + 500; // 500ms for last letter duration
        setTimeout(onLetterAnimationComplete, totalTime);
      }
    }
  }, [isInView, delay, text, onLetterAnimationComplete]);

  // Reset animation when component remounts (page navigation)
  useEffect(() => {
    setShouldAnimate(false);
  }, [text]); // Reset when text changes (component remount)

  return (
    <motion.p
      ref={ref}
      className={`split-parent inline overflow-hidden ${className}`}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
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
          <span style={{ display: "inline-block", width: "0.1em" }}>
            &nbsp;
          </span>
        </span>
      ))}
    </motion.p>
  );
};

export default SplitText;
