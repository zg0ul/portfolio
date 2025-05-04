"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ResumePage = () => {
  const [activeResume, setActiveResume] = useState<"flutter" | "fullstack">(
    "flutter",
  );

  // PDF file paths
  const flutterResumePath = "/assets/pdf/My_Resume_flutter.pdf";
  const fullstackResumePath = "/assets/pdf/My_Resume_flutter.pdf"; // Using Flutter resume for both until you add a separate fullstack resume

  const handleDownload = (type: "flutter" | "fullstack") => {
    const path = type === "flutter" ? flutterResumePath : fullstackResumePath;
    const filename =
      type === "flutter"
        ? "zg0ul_Flutter_Resume.pdf"
        : "zg0ul_Fullstack_Resume.pdf";

    // Create an anchor element and trigger download
    const link = document.createElement("a");
    link.href = path;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      `Downloaded ${type === "flutter" ? "Flutter" : "Full Stack"} resume!`,
    );
  };

  const toggleResume = () => {
    setActiveResume(activeResume === "flutter" ? "fullstack" : "flutter");
  };

  return (
    <section className="container mt-(--header-h) flex h-screen flex-col py-8">
      <div className="container mx-auto flex flex-1 flex-col px-4 sm:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">My Resume</h1>
          <p className="mt-2 text-lg text-gray-400">
            View and download my professional resume
          </p>
        </div>

        {/* Resume Type Toggle */}
        <div className="mb-4 flex justify-center">
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

        {/* Resume Controls */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {activeResume === "flutter"
              ? "Flutter Developer"
              : "Full Stack Developer"}
          </h2>

          <div className="flex gap-2">
            <Button
              onClick={() => toggleResume()}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              {activeResume === "flutter" ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
              Switch to {activeResume === "flutter" ? "Full Stack" : "Flutter"}
            </Button>
            <Button
              onClick={() => handleDownload(activeResume)}
              variant="default"
              size="sm"
              className="gap-2"
            >
              <FileDown className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>

        {/* Full Screen Resume Viewer */}
        <div className="flex-1 overflow-hidden rounded-lg border border-gray-700 bg-gradient-to-br from-gray-900/40 to-gray-800/40 shadow-xl backdrop-blur-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeResume}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <iframe
                src={`${
                  activeResume === "flutter"
                    ? flutterResumePath
                    : fullstackResumePath
                }#toolbar=0&navpanes=0&scrollbar=0`}
                className="h-full w-full"
                // frameBorder="0"
              >
                <div className="flex h-full w-full flex-col items-center justify-center bg-gray-800 p-4 text-center">
                  <p className="mb-4 text-lg">
                    Your browser does not support embedded PDFs.
                  </p>
                  <Button asChild variant="secondary">
                    <a
                      href={
                        activeResume === "flutter"
                          ? flutterResumePath
                          : fullstackResumePath
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FileDown className="h-5 w-5" /> Open PDF in new tab
                    </a>
                  </Button>
                </div>
              </iframe>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
