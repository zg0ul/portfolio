import { FaRobot, FaCode, FaUsers } from "react-icons/fa";
import { IconType } from "react-icons/lib";

export interface VolunteeringItem {
  title: string;
  organization: string;
  icon: IconType;
  period: string;
  type: string;
  highlights: string[];
  skills?: string[];
  color: string;
  bgPattern?: string;
}

export const volunteeringData: VolunteeringItem[] = [
  {
    title: "Tech Support",
    organization: "Google Developer Groups | HU Campus",
    icon: FaCode,
    period: "Oct 2023 - Jan 2024",
    type: "Technical Education",
    highlights: [
      "Created and led an online Flutter workshop for 30+ students",
      "Put together beginner-friendly materials for learning mobile development",
      "Helped participants troubleshoot their first app projects",
    ],
    color: "from-blue-400 to-cyan-400",
    bgPattern: "opacity-10 bg-gradient-to-br from-blue-400/20 to-transparent",
  },
  {
    title: "Event Coordinator",
    organization: "IEEE Robotics & Automation Society | HU Chapter",
    icon: FaRobot,
    period: "Sep 2022 - Sep 2023",
    type: "Event Management & Technical Training",
    highlights: [
      "Helped organize Robotics Week that brought together 200+ students across campus",
      "Set up and ran interactive booths explaining mechatronics concepts to visitors",
      "Taught a hands-on Fusion360 CAD workshop for fellow engineering students",
    ],
    color: "from-purple-400 to-pink-400",
    bgPattern: "opacity-10 bg-gradient-to-br from-purple-400/20 to-transparent",
  },
  {
    title: "Event Coordinator & Content Developer",
    organization: "EICoM | Student Committee",
    icon: FaUsers,
    period: "Mar 2022 - Oct 2022",
    type: "Event Management & Academic Support",
    highlights: [
      "Helped with academic events focused on mechatronics engineering",
      "Ran interactive booths explaining Arduino and engineering concepts to visitors",
      "Shared my personal course notes with fellow mechatronics students",
      "Created study materials that helped 100+ students with their studies",
    ],
    color: "from-emerald-400 to-teal-400",
    bgPattern:
      "opacity-10 bg-gradient-to-br from-emerald-400/20 to-transparent",
  },
];
