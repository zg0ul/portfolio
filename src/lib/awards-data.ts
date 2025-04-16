import orange1 from "@/assets/images/awards/orange1.jpg";
import orange2 from "@/assets/images/awards/orange2.jpg";
import orange3 from "@/assets/images/awards/orange3.jpeg";
import fvtu from "@/assets/images/awards/FVTU.jpg";
import gitex1 from "@/assets/images/awards/GITEX1.jpg";
import gitex2 from "@/assets/images/awards/GITEX2.jpg";
import gitex3 from "@/assets/images/awards/GITEX3.jpg";

export interface Award {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  images: {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
    alt: string;
  }[];
  icon: string; 
}

export function getAwardsData(): Award[] {
  // Process images to include dimensions and optimization data
  // This runs on the server side
  return [
    {
      id: 1,
      title: "Pitching competition - 2nd place",
      issuer: "IEEE Region 8 Entrepreneurship Committee",
      date: "Oct 2023",
      description:
        "Secured 2nd place at GITEX Dubai 2023 with SimTrAI in the prestigious IEEE Region 8 Entrepreneurship Committee's pitching competition. Led the development of an innovative AI-driven solution, competing against teams from across Europe, the Middle East, and Africa.",
      images: [
        {
          src: gitex1.src,
          width: gitex1.width,
          height: gitex1.height,
          blurDataURL: "", // Next.js can generate this
          alt: "GITEX Dubai 2023 - Image 1",
        },
        {
          src: gitex2.src,
          width: gitex2.width,
          height: gitex2.height,
          blurDataURL: "",
          alt: "GITEX Dubai 2023 - Image 2",
        },
        {
          src: gitex3.src,
          width: gitex3.width,
          height: gitex3.height,
          blurDataURL: "",
          alt: "GITEX Dubai 2023 - Image 3",
        },
      ],
      icon: "BsAward",
    },
    {
      id: 2,
      title: "FVTU Python Competition - 1st place",
      issuer: "IEEE BAU WIE",
      date: "Mar 2023",
      description:
        "Awarded first place for developing a Python-based ASCII conversion tool at FVTU (From Venus To Universe), a premier women's technology conference hosted by IEEE BAU Women in Engineering. Created an innovative GUI application that seamlessly converts between ASCII and English.",
      images: [
        {
          src: fvtu.src,
          width: fvtu.width,
          height: fvtu.height,
          blurDataURL: "",
          alt: "FVTU Python Competition",
        },
      ],
      icon: "BsTrophy",
    },
    {
      id: 3,
      title: "Orange Summer Challenge - 1st Place",
      issuer: "Orange Jordan",
      date: "Aug 2023",
      description:
        "Won first place in the Orange Summer challenge offered by Orange Jordan with project SARAB, smart AI-powered glasses to help read for the visually impaired.",
      images: [
        {
          src: orange1.src,
          width: orange1.width,
          height: orange1.height,
          blurDataURL: "",
          alt: "Orange Summer Challenge - Image 1",
        },
        {
          src: orange2.src,
          width: orange2.width,
          height: orange2.height,
          blurDataURL: "",
          alt: "Orange Summer Challenge - Image 2",
        },
        {
          src: orange3.src,
          width: orange3.width,
          height: orange3.height,
          blurDataURL: "",
          alt: "Orange Summer Challenge - Image 3",
        },
      ],
      icon: "BsTrophy",
    },
  ];
}
