"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

const specialties = [
  { text: "Flutter ⭐", color: "from-blue-400/20 to-cyan-400/20" },
  { text: "AI", color: "from-purple-400/20 to-pink-400/20" },
  { text: "Frontend", color: "from-green-400/20 to-emerald-400/20" },
  { text: "Mechatronics", color: "from-orange-400/20 to-red-400/20" },
  { text: "Full-Stack (Nextjs)", color: "from-indigo-400/20 to-blue-400/20" },
];

// Generate subtle random rotations for each card
const getRandomRotation = (index: number) => {
  // Use index as seed for consistent randomness
  const seed = index * 12.345;
  const random = Math.sin(seed) * 10000;
  return (random - Math.floor(random)) * 12 - 6; // Range: -6 to +6 degrees
};

export interface ExpandableRoleContainerProps {
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the expand/collapse animation in seconds */
  animationDuration?: number;
}

export function AnimatedCareerContainer({
  className,
  textClassName,
}: ExpandableRoleContainerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollObserverRef = useRef<IntersectionObserver | null>(null);

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect mobile device
  useEffect(() => {
    if (!isClient) return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [isClient]);

  // Handle click outside to close on mobile
  useEffect(() => {
    if (!isMobile || !isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    // Add slight delay to prevent immediate closing when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobile, isExpanded]);

  // Calculate positions with screen bounds consideration
  const getPosition = useCallback(
    (index: number, total: number) => {
      if (!isClient) return { x: 0, y: 0 };

      // Define exact positions for each card
      const positions = isMobile
        ? [
            // Mobile positions - more compact and centered
            { x: 0, y: -70 }, // Flutter - top center
            { x: -60, y: -45 }, // AI - top left
            { x: 60, y: -45 }, // Frontend - top right
            { x: -60, y: 45 }, // Mechatronics - bottom left
            { x: 60, y: 45 }, // Full-Stack - bottom right
          ]
        : [
            // Desktop positions
            { x: 0, y: -120 }, // Flutter - top center
            { x: -140, y: -90 }, // AI - top left
            { x: 140, y: -90 }, // Frontend - top right
            { x: -100, y: 80 }, // Mechatronics - bottom left
            { x: 100, y: 80 }, // Full-Stack - bottom right
          ];

      return positions[index] || { x: 0, y: 0 };
    },
    [isMobile, isClient],
  );

  // Setup scroll observer for mobile
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    scrollObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && isExpanded) {
            setIsExpanded(false);
          }
        });
      },
      {
        rootMargin: "-20% 0px",
        threshold: 0.1,
      },
    );

    scrollObserverRef.current.observe(containerRef.current);

    return () => {
      if (scrollObserverRef.current) {
        scrollObserverRef.current.disconnect();
      }
    };
  }, [isMobile, isExpanded]);

  // Handle interactions
  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, 50);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 100);
  }, [isMobile]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile) {
        e.stopPropagation(); // Prevent the click from bubbling up
        setIsExpanded(!isExpanded);
      }
    },
    [isMobile, isExpanded],
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  if (!isClient) {
    // Server-side render fallback
    return (
      <div
        className="relative inline-block"
        style={{ minHeight: "120px", minWidth: "300px" }}
      >
        <div
          className={cn(
            "text-text-500 relative mt-1 inline-block rounded-lg pt-2 pb-3 text-center text-2xl font-bold md:text-5xl",
            "[background:linear-gradient(to_bottom,#0d1321,#152030)]",
            "shadow-[inset_0_-1px_#86d562,inset_0_0_0_2px_hsla(101,58%,61%,1),_0_4px_8px_#86D56241]",
            className,
          )}
        >
          <div
            className={cn("inline-block px-6", textClassName)}
            style={{ color: "#f3efe0" }}
          >
            Software Engineer
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      style={{
        minHeight: "80px",
        minWidth: isMobile ? "280px" : "300px",
      }}
    >
      {/* Main Container */}
      <motion.div
        className={cn(
          "text-text-500 relative mt-1 inline-block cursor-pointer rounded-lg pt-2 pb-3 text-center text-2xl font-bold md:text-5xl",
          "[background:linear-gradient(to_bottom,#0d1321,#152030)]",
          "shadow-[inset_0_-1px_#86d562,inset_0_0_0_2px_hsla(101,58%,61%,1),_0_4px_8px_#86D56241]",
          "transition-all duration-300 will-change-transform",
          "hover:shadow-[inset_0_-1px_#86d562,inset_0_0_0_2px_hsla(101,58%,61%,1),_0_8px_16px_#86D56261]",
          "active:scale-95",
          className,
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        animate={{
          scale: isExpanded ? 1.02 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className={cn("inline-block px-6", textClassName)}
          animate={{
            color: isExpanded ? "#86d562" : "#f3efe0",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          Software Engineer
        </motion.div>

        {/* Subtle ripple effect for mobile - inside the container */}
        {isMobile && !isExpanded && (
          <>
            {/* Ripple animation */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-lg"
              animate={{
                boxShadow: [
                  "inset 0 0 0 0px rgba(134, 213, 98, 0.3)",
                  "inset 0 0 0 4px rgba(134, 213, 98, 0.1)",
                  "inset 0 0 0 0px rgba(134, 213, 98, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />

            {/* Gentle pulse glow */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-lg"
              animate={{
                boxShadow: [
                  "0 0 10px rgba(134, 213, 98, 0.1)",
                  "0 0 20px rgba(134, 213, 98, 0.2)",
                  "0 0 10px rgba(134, 213, 98, 0.1)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </motion.div>

      {/* Expanded Specialty Containers */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: isMobile ? "280px" : "500px",
          height: isMobile ? "200px" : "500px",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        {specialties.map((specialty, index) => {
          const position = getPosition(index, specialties.length);
          const randomRotation = getRandomRotation(index);

          return (
            <motion.div
              key={specialty.text}
              className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "text-text-500 rounded-lg px-2 py-1 text-center text-xs font-bold whitespace-nowrap md:px-4 md:py-2 md:text-sm lg:text-lg",
                "[background:linear-gradient(to_bottom,#0d1321,#152030)]",
                "shadow-[inset_0_-1px_#86d562,inset_0_0_0_1px_hsla(101,58%,61%,0.8),_0_4px_12px_#86D56231]",
                "cursor-pointer will-change-transform",
                "hover:shadow-[inset_0_-1px_#86d562,inset_0_0_0_2px_hsla(101,58%,61%,1),_0_8px_16px_#86D56241]",
                "before:absolute before:inset-0 before:rounded-lg before:transition-opacity before:duration-300",
                `before:bg-gradient-to-br before:${specialty.color}`,
                "before:opacity-0 hover:before:opacity-100",
                // Enhanced backdrop effect for better separation
                "backdrop-blur-sm",
                "after:absolute after:inset-0 after:-z-10 after:scale-110 after:rounded-lg after:bg-black/40 after:blur-md",
              )}
              style={{
                // Additional black background with blur for better separation
                filter: isExpanded
                  ? "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5))"
                  : "none",
              }}
              initial={{
                opacity: 0,
                scale: 0.3,
                x: 0,
                y: 0,
                rotate: randomRotation - 15,
              }}
              animate={
                isExpanded
                  ? {
                      opacity: 1,
                      scale: 1,
                      x: position.x,
                      y: position.y,
                      rotate: randomRotation,
                      pointerEvents: "auto" as const,
                    }
                  : {
                      opacity: 0,
                      scale: 0.3,
                      x: 0,
                      y: 0,
                      rotate: randomRotation - 15,
                      pointerEvents: "none" as const,
                    }
              }
              transition={{
                duration: 0.5,
                delay: isExpanded
                  ? index * 0.08
                  : (specialties.length - index - 1) * 0.04,
                ease: [0.34, 1.56, 0.64, 1],
                opacity: { duration: 0.3 },
                scale: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
                rotate: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.08,
                      rotate: randomRotation + (Math.random() - 0.5) * 4, // Slight random wobble on hover
                      transition: {
                        duration: 0.3,
                        rotate: { duration: 0.6, ease: "easeInOut" },
                      },
                    }
                  : {}
              }
              onMouseEnter={!isMobile ? handleMouseEnter : undefined}
              onMouseLeave={!isMobile ? handleMouseLeave : undefined}
            >
              {/* Black blurred background for better separation */}
              <motion.div
                className="absolute inset-0 -z-10 rounded-lg bg-black/60 blur-md"
                animate={{
                  scale: isExpanded ? 1.2 : 1,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div className="relative z-10">
                {specialty.text}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Background Effect */}
      <motion.div
        className="pointer-events-none fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          zIndex: isExpanded ? 1 : -1,
          background:
            "radial-gradient(circle at 50% 50%, rgba(134, 213, 98, 0.03) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
