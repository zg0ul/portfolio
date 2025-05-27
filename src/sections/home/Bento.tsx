import { Marquee } from "@/components/ui/marquee";
import { Atom, Languages, MapPin, Target, Timer } from "lucide-react";
import Image from "next/image";
import { FaRegKeyboard } from "react-icons/fa";
import { BentoCard } from "@/components/ui/bento-card";
import { AnimatedCard } from "@/components/ui/animated_card";
import GitHubContributionGraph from "@/components/GitHubContributionGraph";
import BentoPill from "@/components/ui/bento-pill";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiJavascript,
  SiNodedotjs,
  SiGit,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiVercel,
  SiFigma,
} from "react-icons/si";

export default function Bento() {
  const techStacks = [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "JavaScript", icon: SiJavascript },
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Python", icon: SiPython },
    { name: "TensorFlow", icon: SiTensorflow },
    { name: "PyTorch", icon: SiPytorch },
    { name: "Flutter", icon: SiFlutter },
    { name: "Dart", icon: SiDart },
    { name: "Firebase", icon: SiFirebase },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "Git", icon: SiGit },
    { name: "Docker", icon: SiDocker },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Supabase", icon: SiSupabase },
    { name: "Vercel", icon: SiVercel },
    { name: "Figma", icon: SiFigma },
  ];

  const TypingSpeedCard = () => (
    <BentoCard className="relative h-full overflow-hidden">
      <div className="mb-4">
        <BentoPill>
          <FaRegKeyboard className="mr-2 inline h-4 w-4 duration-300" />
          Typing Speed
        </BentoPill>
      </div>

      {/* Background large number */}
      <div className="pointer-events-none absolute inset-0 flex -translate-x-15 items-center justify-center">
        <h3 className="text-foreground/5 text-[6rem] font-bold blur-xs select-none sm:text-[8rem] xl:text-[10rem]">
          70
        </h3>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 flex h-full flex-col justify-center">
        <div className="body-bold text-foreground flex items-baseline">
          <h3 className="text-5xl font-bold sm:text-7xl md:text-8xl xl:text-8xl">
            70
          </h3>
          <p className="ml-2 text-base sm:text-lg">wpm</p>
        </div>

        <div className="body-light text-text-300 mt-5 flex items-center gap-4 text-sm">
          <p className="inline-flex items-center">
            <Timer size={15} className="mr-1" />1 min
          </p>
          <p className="inline-flex items-center">
            <Target size={15} className="mr-1" />
            94%
          </p>
          <p className="inline-flex items-center">
            <Languages size={15} className="mr-1" />
            ID
          </p>
        </div>
      </div>
    </BentoCard>
  );

  const LocationCard = () => (
    <BentoCard>
      <BentoPill>
        <MapPin className="mr-2 inline h-4 w-4 duration-300" />
        Location
      </BentoPill>
      <div className="mt-5 rounded-xl">
        <div className="relative rounded-xl">
          <Image
            src="https://pmerpfdlvkhayhritnhy.supabase.co/storage/v1/object/public/images//location.png"
            width={1000}
            height={1000}
            alt="Location in Amman, Jordan"
            className="z-20 aspect-video w-full rounded-xl object-cover grayscale invert"
          />
          <div className="bg-neon absolute inset-0 rounded-xl opacity-80 mix-blend-soft-light"></div>
        </div>
      </div>
    </BentoCard>
  );

  return (
    <div className="container">
      <div className="text-foreground mb-40 grid w-full grid-cols-1 gap-2">
        <div className="grid w-full grid-cols-1 gap-2">
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[2fr_1fr]">
            <div className="min-w-0">
              {" "}
              {/* Add min-w-0 to prevent overflow */}
              <AnimatedCard
                description="Design tools and code tools I mainly use. Focused on React or Javascript ecosystem, recently have been using Next.js"
                title="Tech stack I mainly use"
              >
                <BentoPill>
                  <Atom className="mr-2 inline h-4 w-4 duration-300" />
                  Tech Stack
                </BentoPill>

                <section id="logos" className="overflow-hidden">
                  {/* Add overflow-hidden */}
                  <div className="container mx-auto px-0">
                    {/* Remove default padding */}
                    <div className="relative mt-6 w-full mask-r-from-30% mask-r-to-95% mask-l-from-30% mask-l-to-95%">
                      {/* Ensure full width */}
                      <Marquee className="[--duration:10s]">
                        {techStacks.map((techstack, idx) => (
                          <techstack.icon
                            key={idx}
                            className="mx-4 h-10 w-10 flex-shrink-0 object-contain opacity-30 brightness-0 grayscale invert"
                            // Changed from w-28 to w-10 and added mx-4 for spacing
                          />
                        ))}
                      </Marquee>
                    </div>
                  </div>
                </section>
              </AnimatedCard>
            </div>
            <div className="hidden lg:block">
              <TypingSpeedCard />
            </div>
          </div>

          <div className="hidden grid-cols-2 gap-2 sm:grid lg:hidden">
            <LocationCard />
            <TypingSpeedCard />
          </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1fr_2fr]">
            <div className="sm:hidden lg:block">
              <LocationCard />
            </div>
            <div className="group">
              <GitHubContributionGraph username="zg0ul" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
