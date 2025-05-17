// filepath: /Users/zg0ul/Coding/SWE/Projects/portfolio/src/lib/awards-data.ts
// Using images from public folder instead of importing them directly
// This reduces the JavaScript bundle size and improves performance

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

// Image dimensions - based on actual image files in public/assets/images/awards
const imageDimensions = {
  orange1: { width: 1600, height: 747 },
  orange2: { width: 4032, height: 2268 },
  orange3: { width: 800, height: 422 },
  fvtu: { width: 4714, height: 4155 },
  gitex1: { width: 4032, height: 3024 },
  gitex2: { width: 4032, height: 3024 },
  gitex3: { width: 2666, height: 2084 }
};

export function getAwardsData(): Award[] {
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
          src: "/assets/images/awards/GITEX1.jpg",
          width: imageDimensions.gitex1.width,
          height: imageDimensions.gitex1.height,
          blurDataURL: "", // Next.js can generate this
          alt: "GITEX Dubai 2023 - Image 1",
        },
        {
          src: "/assets/images/awards/GITEX2.jpg",
          width: imageDimensions.gitex2.width,
          height: imageDimensions.gitex2.height,
          blurDataURL: "",
          alt: "GITEX Dubai 2023 - Image 2",
        },
        {
          src: "/assets/images/awards/GITEX3.jpg",
          width: imageDimensions.gitex3.width,
          height: imageDimensions.gitex3.height,
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
          src: "/assets/images/awards/FVTU.jpg",
          width: imageDimensions.fvtu.width,
          height: imageDimensions.fvtu.height,
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
          src: "/assets/images/awards/orange1.jpg",
          width: imageDimensions.orange1.width,
          height: imageDimensions.orange1.height,
          blurDataURL: "",
          alt: "Orange Summer Challenge - Image 1",
        },
        {
          src: "/assets/images/awards/orange2.jpg",
          width: imageDimensions.orange2.width,
          height: imageDimensions.orange2.height,
          blurDataURL: "",
          alt: "Orange Summer Challenge - Image 2",
        },
        {
          src: "/assets/images/awards/orange3.jpeg",
          width: imageDimensions.orange3.width,
          height: imageDimensions.orange3.height,
          blurDataURL: "",
          alt: "Orange Summer Challenge - Image 3",
        },
      ],
      icon: "BsTrophy",
    },
  ];
}
