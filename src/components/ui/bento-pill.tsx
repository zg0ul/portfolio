import React from "react";

function BentoPill({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="group mr-auto flex w-fit items-center rounded-3xl border-[2px] border-white/5 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent px-5 py-2 text-sm text-gray-400">
      {children}
    </h2>
  );
}

export default BentoPill;
