"use client";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useMouse } from "../../hooks/usemouse";

export const AnimatedCard = ({
  title,
  description,
  withArrow = false,
  circleSize = 400,
  className,
  children,
}: {
  title?: string;
  description?: string;
  withArrow?: boolean;
  circleSize?: number;
  children?: ReactNode;
  className?: string;
}) => {
  const [mouse, parentRef] = useMouse();

  return (
    <div
      className="group border-navy-500 bg-navy-800 relative h-full transform-gpu overflow-hidden rounded-3xl border p-4 transition-transform hover:scale-[1.01]"
      ref={parentRef}
    >
      {withArrow && (
        <ArrowUpRightIcon className="absolute top-2 right-2 z-10 size-5 translate-y-4 text-neutral-300 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
      )}
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full blur-xl transition-transform duration-500 group-hover:scale-[3]",
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
      <div className="bg-navy-800/85 absolute inset-px rounded-3xl" />
      {children && (
        <div
          className={cn(
            "border-navy-500 relative grid overflow-hidden rounded-3xl",
            className,
          )}
        >
          {children}
        </div>
      )}
      {title && (
        <div className="relative pt-4 pb-2">
          <h3 className="body text-foreground text-xl">{title}</h3>
          <p className="body-light text-foreground/50 mt-2">{description}</p>
        </div>
      )}
    </div>
  );
};
