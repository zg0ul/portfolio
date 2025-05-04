"use client";
import { useMouse } from "@/components/hooks/usemouse";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";

export const BentoCard = ({
  withArrow = false,
  circleSize = 400,
  className,
  children,
}: {
  withArrow?: boolean;
  circleSize?: number;
  children?: ReactNode;
  className?: string;
}) => {
  const [mouse, parentRef] = useMouse();

  return (
    <div
      className="group bg-background border border-navy-600 relative h-full transform-gpu overflow-hidden rounded-[20px] p-4 transition-transform hover:scale-[1.01] active:scale-95"
      ref={parentRef}
    >
      {withArrow && (
        <ArrowUpRightIcon className="absolute top-2 right-2 z-10 size-5 translate-y-4 text-neutral-300 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
      )}
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-transform duration-500 group-hover:scale-[3]",
          mouse.elementX === null || mouse.elementY === null
            ? "opacity-0"
            : "opacity-100",
        )}
        style={{
          maskImage: `radial-gradient(${
            circleSize / 2
          }px circle at center, white, transparent)`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${mouse.elementX}px`,
          top: `${mouse.elementY}px`,
          background:
            "linear-gradient(135deg, #86D562, #9cdd7e, #b3e59c, #cbedbb)",
        }}
      />
      <div className="bg-navy-800/80 absolute inset-px rounded-[19px]" />
      {children && (
        <div
          className={cn(
            "border-navy-400 relative grid overflow-hidden rounded-[15px]",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
