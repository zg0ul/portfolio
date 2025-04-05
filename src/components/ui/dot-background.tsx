import { cn } from "@/lib/utils";
import React from "react";

export default function DotBackground() {
  return (
    <div className="absolute flex h-[100%] w-full items-center justify-center bg-dark-500 -z-1">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#3d424d_2px,transparent_2px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] bg-dark-500"></div>
    </div>
  );
}
