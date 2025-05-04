"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";

export function BentoCard({
  dark = false,
  className = "",
  graphic,
  fade = [],
}: {
  dark?: boolean;
  className?: string;
  graphic: React.ReactNode;
  fade?: ("top" | "bottom")[];
}) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "ring-navy-600 bg-transparent shadow-sm ring-1",
        "data:bg-transparent data-:ring-white/5",
      )}
    >
      <div className="relative h-80 shrink-0">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-950 group-data-[dark]:from-[-25%]" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-950 group-data-[dark]:from-[-25%]" />
        )}
      </div>
    </motion.div>
  );
}
