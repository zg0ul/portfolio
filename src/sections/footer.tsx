import Image from "next/image";
import Link from "next/link";
import { LuMail } from "react-icons/lu";
import { BackgroundBeams } from "../components/ui/background-beams";
import SocialLinks from "@/components/SocialLinks";

const PortfolioFooter = () => {
  return (
    <footer className="relative overflow-x-hidden">
      {/* Background with beam effect */}
      <div className="absolute inset-0 overflow-hidden mask-t-from-60% mask-t-to-95%">
        <BackgroundBeams />
      </div>

      {/* Content container */}
      <div className="container">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
            {/* Left Section - Logo and Description */}
            <div className="lg:col-span-6">
              <Link href="/">
                <Image
                  src="/z-logo.png"
                  alt="zg0ul's Logo"
                  width={50}
                  height={50}
                  className="mb-4"
                />
              </Link>

              <p className="text-foreground mb-6 max-w-md text-sm leading-relaxed">
                Full-stack engineer building seamless web, mobile, and
                AI-powered experiences
              </p>

              <SocialLinks />

              {/* Copyright - Hidden on mobile, shown on desktop */}
              <div className="text-foreground/50 mt-6 hidden text-sm lg:block">
                © {new Date().getFullYear()} zg0ul. All rights reserved.
              </div>
            </div>

            {/* Right Section - Links and Contacts */}
            <div className="lg:col-span-6 lg:flex lg:justify-end">
              <div className="grid grid-cols-3 gap-6 sm:gap-8 lg:w-auto lg:gap-12">
                {/* Links */}
                <div className="col-span-1">
                  <h3 className="text-foreground mb-4 text-lg font-semibold">
                    Links
                  </h3>
                  <ul className="space-y-3">
                    <FooterLink href="/about">About</FooterLink>
                    <FooterLink href="/resume">Resume</FooterLink>
                    <FooterLink href="/projects">Projects</FooterLink>
                    <FooterLink href="/awards">Awards</FooterLink>
                    <li>
                      <Link
                        href="https://github.com/zg0ul/portfolio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground/80 hover:text-neon text-sm transition-all duration-300"
                      >
                        This Site
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contacts */}
                <div className="col-span-2">
                  <h3 className="text-foreground mb-4 text-lg font-semibold">
                    Contact
                  </h3>
                  <ul className="space-y-3">
                    <FooterLink href="mailto:mohammad@zg0ul.com">
                      <span className="flex items-center">
                        <LuMail className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          mohammad@zg0ul.com
                        </span>
                      </span>
                    </FooterLink>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright - Shown on mobile only */}
          <div className="text-foreground/50 border-foreground/5 mt-8 border-t pt-8 text-center text-sm lg:hidden">
            © {new Date().getFullYear()} zg0ul. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper component for footer links
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <Link
        href={href}
        className="text-foreground/80 hover:text-neon decoration-foreground/20 trabsition-all text-sm decoration-2 underline-offset-4 transition-all duration-300 hover:translate-x-5 hover:underline"
      >
        {children}
      </Link>
    </li>
  );
};

export default PortfolioFooter;
