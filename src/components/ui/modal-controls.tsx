import React from "react";
import { twMerge } from "tailwind-merge";

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "close";

interface ModalControlsProps extends React.ComponentProps<"button"> {
  position?: Position;
}

function ModalControls({
  className,
  children,
  onClick,
  position = "top-right",
  ...props
}: ModalControlsProps) {
  // Define position classes based on the position prop
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    left: "left-4 top-1/2 -translate-y-1/2",
    right: "right-4 top-1/2 -translate-y-1/2",
    close: "top-4 right-4",
  };

  // Get the appropriate position class
  const positionClass = positionClasses[position];

  // Additional styles for specific positions
  const additionalStyles =
    position === "close" ? "bg-opacity-70 hover:bg-opacity-90" : "";

  return (
    <button
      onClick={onClick}
      className={twMerge(
        `absolute ${positionClass} z-10 text-foreground bg-navy-700 rounded-full p-2 hover:bg-navy-500 transition cursor-pointer border-teal-400 border ${additionalStyles}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default ModalControls;
