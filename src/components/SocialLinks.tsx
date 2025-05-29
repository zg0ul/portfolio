"use client";

import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { SlSocialLinkedin, SlSocialYoutube } from "react-icons/sl";
import { FiGithub } from "react-icons/fi";
import { SiInstagram } from "react-icons/si";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";
import { usePageTracking } from "@/components/AnalyticsTracker";

interface SocialLink {
  name: string;
  href: string;
  icon: IconType;
}

export const socialLinkVariants = {
  variant: {
    default:
      "bg-navy-700 border-2 border-navy-500 hover:border-neon-4 text-text-600 hover:text-neon-4 hover:scale-105 transition-transform hover:bg-navy-800",
    outline:
      "bg-transparent border border-gray-700/50 text-text-600 hover:text-neon-4 hover:border-neon-4 hover:scale-105 transition-transform",
    ghost:
      "bg-transparent text-text-600 hover:text-white hover:scale-105 transition-transform",
  },
  size: {
    sm: "h-8 w-8 rounded-md",
    md: "h-10 w-10 rounded-lg",
    lg: "h-12 w-12 rounded-xl",
    xl: "h-14 w-14 rounded-2xl",
  },
  iconSize: {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
    xl: "h-7 w-7",
  },
};

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  variant?: keyof typeof socialLinkVariants.variant;
  size?: keyof typeof socialLinkVariants.size;
  showLabels?: boolean;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  className,
  iconClassName,
  variant = "default",
  size = "md",
  showLabels = false,
}) => {
  const { trackExternalLink } = usePageTracking();

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      href: "https://github.com/zg0ul",
      icon: FiGithub,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/zg0ul",
      icon: SlSocialLinkedin,
    },
    {
      name: "Twitter",
      href: "https://x.com/zg0ul",
      icon: BsTwitterX,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/zg0ul",
      icon: SiInstagram,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@zg0ul",
      icon: SlSocialYoutube,
    },
  ];

  const handleSocialClick = (platform: string, href: string) => {
    trackExternalLink(href, platform);
  };

  return (
    <div
      className={cn(
        "border-navy-500 flex w-fit items-center gap-7 rounded-xl border-2 border-dashed p-4",
        className,
      )}
    >
      {socialLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleSocialClick(link.name, link.href)}
          className={cn(
            "bg-navy-300 flex items-center justify-center transition-all duration-300",
            socialLinkVariants.size[size],
            socialLinkVariants.variant[variant],
          )}
          aria-label={link.name}
        >
          <link.icon
            className={cn(socialLinkVariants.iconSize[size], iconClassName)}
          />
          {showLabels && (
            <span className="ml-2 text-sm font-medium">{link.name}</span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;
