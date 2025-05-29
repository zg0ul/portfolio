"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "motion/react";
import Image from "next/image";
import { MdOutlineFileDownload } from "react-icons/md";
import { usePageTracking } from "@/components/AnalyticsTracker";

const ResumePage = () => {
  const { trackDownload, trackCustomEvent } = usePageTracking();

  // PDF file path
  const flutterResumePath = "/assets/pdf/My_Resume_flutter.pdf";
  // Commented out for future use
  // const fullstackResumePath = "/assets/pdf/My_Resume_fullstack.pdf";

  // Image version of your resume
  const flutterResumeImage = "/assets/pdf/My_Resume_flutter.png";
  // Commented out for future use
  // const fullstackResumeImage = "/assets/pdf/My_Resume_fullstack.png";

  // Current active resume type (ready for future expansion)
  const currentResumeType = "flutter";

  // // Function to handle resume type switching with tracking (ready for future use)
  // const setActiveResumeWithTracking = (resumeType: "flutter" | "fullstack") => {
  //   if (resumeType !== currentResumeType) {
  //     trackCustomEvent("resume_type_switch", {
  //       from: currentResumeType,
  //       to: resumeType,
  //       source: "resume_toggle_buttons",
  //     });
  //     // When multiple resumes are available, this will update state
  //     // setActiveResume(resumeType);
  //   }
  // };

  const handleDownload = () => {
    // Currently only handling Flutter resume download
    const path = flutterResumePath;
    const filename = "zg0ul_Flutter_Resume.pdf";

    // Track the download event
    trackDownload(filename, "resume");

    // Track additional custom event with metadata
    trackCustomEvent("resume_download", {
      resumeType: currentResumeType,
      format: "pdf",
      source: "resume_page",
      fileName: filename,
    });

    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Downloaded Flutter resume!");
  };

  return (
    <section className="topPageMargin min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="section-title">My Resume</h1>
          <p className="section-description">
            View and download my professional resume
          </p>
        </div>

        {/* Resume Controls */}
        <div className="mb-6 flex justify-end">
          <Button
            onClick={handleDownload}
            variant="default"
            size="lg"
            className="cursor-pointer gap-2 transition-all duration-200 hover:scale-105"
          >
            <MdOutlineFileDownload className="h-5 w-5" />
            <span className="inline">Download</span>
          </Button>
        </div>

        {/* Resume Image Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full will-change-transform"
        >
          <div className="border-neon relative w-full overflow-hidden rounded-lg border bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
            <Image
              src={flutterResumeImage}
              alt="Flutter Developer Resume for Mohammad zgoul (zg0ul)"
              width={800}
              height={1032}
              className="h-auto w-full"
              priority
              loading="eager"
            />
          </div>
        </motion.div>

        {/* Add some space at the bottom */}
        <div className="h-16"></div>

        {/* COMMENTED OUT: FULL STACK RESUME TOGGLE FUNCTIONALITY FOR FUTURE USE
        
        import { useState } from "react";
        import { AnimatePresence } from "motion/react";
        import { ChevronRight, ChevronLeft } from "lucide-react";
        
        // State for toggling between resumes
        const [activeResume, setActiveResume] = useState<"flutter" | "fullstack">("flutter");
        
        // Toggle function
        const setActiveResumeWithTracking = (resumeType: "flutter" | "fullstack") => {
    if (resumeType !== activeResume) {
      trackCustomEvent('resume_type_switch', {
        from: activeResume,
        to: resumeType,
        source: 'resume_toggle_buttons'
      });
      setActiveResume(resumeType);
    }
  };

  const toggleResume = () => {
          setActiveResume(activeResume === "flutter" ? "fullstack" : "flutter");
        };
        
        // Download function for both resume types
        const handleDownload = (type: "flutter" | "fullstack") => {
          const path = type === "flutter" ? flutterResumePath : fullstackResumePath;
          const filename = type === "flutter" ? "zg0ul_Flutter_Resume.pdf" : "zg0ul_Fullstack_Resume.pdf";
          
          // Create an anchor element and trigger download
          const link = document.createElement("a");
          link.href = path;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast.success(`Downloaded ${type === "flutter" ? "Flutter" : "Full Stack"} resume!`);
        };
        
        // Toggle UI
        <div className="mb-6 flex justify-center">
          <div className="flex items-center rounded-full border border-gray-700/30 bg-gray-800/50 px-2 py-1 backdrop-blur-sm">
            <Button
              variant={activeResume === "flutter" ? "default" : "ghost"}
              className={`rounded-full px-4 py-2 transition-all duration-300 ${
                activeResume === "flutter" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveResume("flutter")}
            >
              Flutter
            </Button>
            <div className="h-6 w-px bg-gray-700/50"></div>
            <Button
              variant={activeResume === "fullstack" ? "default" : "ghost"}
              className={`rounded-full px-4 py-2 transition-all duration-300 ${
                activeResume === "fullstack" ? "text-white" : "text-gray-400"
              }`}
              onClick={() => setActiveResume("fullstack")}
            >
              Full Stack
            </Button>
          </div>
        </div>
        
        // Toggle button in controls
        <Button
          onClick={toggleResume}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          {activeResume === "flutter" ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">Switch to</span>{" "}
          {activeResume === "flutter" ? "Full Stack" : "Flutter"}
        </Button>
        
        // Animated display with both resume options
        <AnimatePresence mode="wait">
          <motion.div
            key={activeResume}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="relative w-full overflow-hidden rounded-lg border border-gray-700 bg-white shadow-xl">
              <Image
                src={activeResume === "flutter" ? flutterResumeImage : fullstackResumeImage}
                alt={`${activeResume === "flutter" ? "Flutter" : "Full Stack"} Developer Resume`}
                width={800}
                height={1032}
                className="h-auto w-full"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        END COMMENTED OUT SECTION */}
      </div>
    </section>
  );
};

export default ResumePage;
