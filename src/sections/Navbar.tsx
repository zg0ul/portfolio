import Zg0ulLogo from "@/components/Logo";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="fixed top-0 z-10 flex w-full items-center justify-center">
      <div className="w-full md:container md:px-4">
        <header className="portfolio-header">
          <div className="flex w-full items-center justify-center py-2 max-md:py-1 md:justify-between">
            <Link href="/" className="flex items-center">
              <Zg0ulLogo />
            </Link>

            <nav className="hidden md:block">
              <ul>
                <li>
                  <Link href="/about" className="nav-item">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/awards" className="nav-item">
                    <span>Awards</span>
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="nav-item">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/resume" className="nav-item">
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
