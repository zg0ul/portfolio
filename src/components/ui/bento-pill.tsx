import React from "react";

function BentoPill({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="group border-navy-600 from-navy-800 via-navy-700 text-navy-200 mr-auto flex w-fit items-center rounded-full border-2 bg-gradient-to-tr to-transparent px-2 py-2 text-xs sm:px-5 md:text-sm">
      {children}
    </h2>
  );
}

export default BentoPill;
