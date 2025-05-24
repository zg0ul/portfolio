"use client";

import { easeInOut, motion } from "framer-motion";
import { Home, User2, Award, PanelsTopLeft, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 2,
    label: "About",
    href: "/about",
    icon: <User2 className="h-5 w-5" />,
  },
  {
    id: 3,
    label: "Awards",
    href: "/awards",
    icon: <Award className="h-5 w-5" />,
  },
  {
    id: 4,
    label: "Projects",
    href: "/projects",
    icon: <PanelsTopLeft className="h-5 w-5" />,
  },
  {
    id: 5,
    label: "Resume",
    href: "/resume",
    icon: <FileText className="h-5 w-5" />,
  },
];

const Dock = () => {
  const pathname = usePathname();

  const [activeTab, setActiveTab] = useState<number | null>(
    navItems.find((item) => item.href === pathname)?.id || null,
  );

  useEffect(() => {
    setActiveTab(navItems.find((item) => item.href === pathname)?.id || null);
  }, [pathname]);

  const duration = 0.4;

  const dockVariants = {
    open: {
      width: "fit-content",
      opacity: 1,
      transition: {
        easeInOut,
        duration,
      },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: {
        easeInOut,
        duration,
      },
    },
  };

  const initialX = activeTab !== null ? (activeTab - 1) * 40 : 0;

  return (
    <motion.div
      variants={dockVariants}
      initial="closed"
      animate="open"
      style={{ bottom: "1rem" }}
      className="border-navy-600 bg-navy-800/90 fixed left-1/2 z-100 mx-auto w-fit -translate-x-1/2 rounded-2xl border p-1 backdrop-blur-sm md:hidden"
    >
      <div className="relative flex items-center">
        {activeTab !== null && (
          <motion.span
            className="bg-neon/20 absolute top-0 bottom-0 z-100 w-10 rounded-xl mix-blend-difference ring-0 outline-none"
            initial={{ translateX: initialX, opacity: 0, scale: 0 }}
            animate={{ translateX: (activeTab - 1) * 40, opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            scroll={true}
            onClick={() => setActiveTab(item.id)}
            className={`${
              activeTab === item.id
                ? "text-neon"
                : "text-foreground hover:text-neon"
            } group/dock relative flex h-10 w-10 items-center justify-center text-sm transition-all duration-300 ease-in-out focus-visible:outline-none`}
            style={{
              WebkitTapHighlightColor: "transparent",
            }}
            aria-label={item.label}
          >
            {item.icon}
            <span className="border-navy-600 bg-navy-700/80 text-foreground absolute -top-8 left-1/2 hidden -translate-x-1/2 -translate-y-2 scale-75 rounded-md border p-1 px-1.5 text-[10px] leading-none font-medium opacity-0 transition-all duration-200 ease-in-out group-hover/dock:translate-y-0 group-hover/dock:scale-100 group-hover/dock:opacity-100 md:block">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Dock;
