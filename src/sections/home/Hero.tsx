import Socials from "@/components/Socials";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { ShootingStars } from "@/components/ui/shooting-stars";
import SplitText from "@/components/ui/split-text";
import { easeInOut } from "motion/react";
import React from "react";

function Hero() {
  return (
    <section
      className="container mt-(--header-h) flex h-[70vh] min-h-[400px] items-center justify-center  md:h-[80vh] md:min-h-[80vh]"
      id="Hero"
    >
      <ShootingStars />

      <div className="flex w-full">
        <div className="mx-auto flex w-full flex-col items-center justify-center  text-center">
          {/* <div className="flex items-center justify-around text-lg">
            <Location />
            {isOpenToWork && <OpenToWork />}
          </div> */}
          <h2 className="body-bold mb-8 gap-10 text-3xl leading-tight font-bold md:text-5xl lg:text-6xl xl:text-7xl">
            <SplitText
              text="Hey!"
              className="gradient-title text-neon"
              delay={150}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing={easeInOut}
              threshold={0.2}
              //   rootMargin="-50px"
            />
            <span className="gradient-title">I&apos;m Mohammad Zgoul</span>{" "}
            <br />
            <ContainerTextFlip className="body-bold text-2xl leading-tight font-bold md:text-3xl lg:text-4xl xl:text-5xl" />
          </h2>

          <p className="text-md body-light mb-8 leading-tight font-light md:text-xl lg:text-2xl">
            I love building all sorts of software, <br />
            from web applications to mobile apps.
          </p>
          <Socials />
        </div>
      </div>
    </section>
  );
}

export default Hero;

// function Location() {
//   return (
//     <div className="flex items-center gap-1">
//       <MapPin className="size-5" />
//       <p className="">Amman, Jordan</p>
//     </div>
//   );
// }

// function OpenToWork() {
//   return (
//     <div className="flex h-[40] w-auto items-center justify-center rounded-full border border-[#38A349] bg-[#12321E] px-5">
//       <div className="mr-2 size-[10] rounded-full bg-[#38A349]" />
//       <span className="font-bold text-[#38A349]">Open to work</span>
//     </div>
//   );
// }
