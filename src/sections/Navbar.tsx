import Zg0ulLogo from "@/components/Logo";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="flex justify-center items-center fixed top-3 w-full z-10 ">
      <div className="container">
        <header className="portfolio-header ">
          <div className=" flex justify-between items-center w-full">
            <Link href="/" className="flex items-center">
              <Zg0ulLogo />
            </Link>

            <nav className="hidden md:block">
              <ul>
                <li>
                  <a href="#projects" className="nav-item">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#about" className="nav-item">
                    About
                  </a>
                </li>
                <li>
                  <a href="#resume" className="nav-item">
                    Resume
                  </a>
                </li>
                <li>
                  <a href="#contact" className="nav-item">
                    Contact
                  </a>
                </li>
                <li>
                  <Link href="/awards" className="nav-item">
                    <span>Awards</span>
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
