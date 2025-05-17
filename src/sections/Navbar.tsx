"use client";

import Zg0ulLogo from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Header() {
  const pathname = usePathname();

  // Function to determine if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-center">
      <div className="w-full">
        <header className="portfolio-header">
          <div className="container flex w-full items-center justify-center py-2 max-md:py-1 md:justify-between">
            <Link href="/" className="flex items-center">
              <Zg0ulLogo />
            </Link>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-2">
                <li>
                  <Link
                    href="/about"
                    className={`nav-item ${isActive("/about") ? "nav-item-active" : ""}`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/awards"
                    className={`nav-item ${isActive("/awards") ? "nav-item-active" : ""}`}
                  >
                    <span>Awards</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className={`nav-item ${isActive("/projects") ? "nav-item-active" : ""}`}
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resume"
                    className={`nav-item ${isActive("/resume") ? "nav-item-active" : ""}`}
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Header;
