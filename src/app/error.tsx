"use client";

import { MdError } from "react-icons/md";
import React from "react";

function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-6">
          <MdError color="red" className="size-50" />
        </div>
        <h1 className="mb-5 text-4xl font-bold">Oops! Something went wrong</h1>
        <button
          onClick={() => window.location.reload()}
          className="from-neon to-neon-4 hover:from-neon-4 hover:to-neon text-navy-900 text-neon-10 rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-bold transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default NotFound;
