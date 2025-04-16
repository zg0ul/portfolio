"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { BsAward, BsTrophy } from "react-icons/bs";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Award } from "@/lib/awards-data";
import ModalControls from "../ui/modal-controls";

interface AwardClientProps {
  awards: Award[];
}

export default function AwardsClient({ awards }: AwardClientProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentAwardId, setCurrentAwardId] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Add global event listeners for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === "Escape") closeImageModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, currentAwardId]);

  // Get icon component based on string name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "BsAward":
        return <BsAward className="w-6 h-6" />;
      case "BsTrophy":
        return <BsTrophy className="w-6 h-6" />;
      default:
        return <BsAward className="w-6 h-6" />;
    }
  };

  // Open image modal
  const openImageModal = (awardId: number, imageIndex: number) => {
    setCurrentAwardId(awardId);
    setCurrentImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(0);
    setCurrentAwardId(null);
  };

  // Navigate to the previous image
  const prevImage = () => {
    if (!currentAwardId) return;

    const currentAward = awards.find((award) => award.id === currentAwardId);
    if (!currentAward || !currentAward.images.length) return;

    setCurrentImageIndex((prev) =>
      prev <= 0 ? currentAward.images.length - 1 : prev - 1
    );
  };

  // Navigate to the next image
  const nextImage = () => {
    if (!currentAwardId) return;

    const currentAward = awards.find((award) => award.id === currentAwardId);
    if (!currentAward || !currentAward.images.length) return;

    setCurrentImageIndex((prev) => (prev + 1) % currentAward.images.length);
  };

  // Get current image data for the modal
  const getCurrentImage = () => {
    if (!currentAwardId) return null;

    const currentAward = awards.find((award) => award.id === currentAwardId);
    if (!currentAward || !currentAward.images.length) return null;

    return currentAward.images[currentImageIndex];
  };

  return (
    <>
      <Head>
        <title>Honors & Awards | Your Portfolio</title>
        <meta
          name="description"
          content="My professional honors, awards, and recognitions"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-background to-dark-600">
        <div className="container px-3 sm:px-6 py-16 sm:py-32 mx-auto max-w-5xl">
          {/* Page header */}
          <div className="mb-10 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Honors & Awards
            </h1>
            <p className="mt-3 sm:mt-4 text-lg sm:text-xl text-blue-400">
              Recognition for excellence in technology and innovation
            </p>
          </div>

          {/* Timeline of awards */}
          <div className="relative">
            {/* Timeline center line - visible on all screens */}
            <div className="absolute left-10 md:left-1/2 top-0 bottom-0 md:transform md:-translate-x-1/2 w-0.5 bg-dark-400"></div>

            <div className="relative">
              {awards.map((award, idx) => (
                <div
                  key={award.id}
                  className="mb-12 md:mb-16 md:flex"
                  style={{
                    flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
                  }}
                >
                  {/* Content */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                      idx % 2 === 0 ? "md:pr-10 lg:pr-12" : "md:pl-10 lg:pl-12"
                    } ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                  >
                    {/* Mobile view date */}
                    <div className="md:hidden text-sm text-[#748cab] mb-1">
                      {award.date}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#f0ebd8]">
                      {award.title}
                    </h3>
                    <div
                      className={`flex items-center my-2 text-sm text-[#748cab] gap-2 ${
                        idx % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      }`}
                    >
                      <span>{award.issuer}</span>
                      <span>•</span>
                      <span className="hidden md:inline">{award.date}</span>
                    </div>
                    <p className="text-[#dad6c5]">{award.description}</p>

                    {/* Image gallery */}
                    {award.images && award.images.length > 0 && (
                      <div
                        className={`mt-4 flex gap-2 overflow-x-auto pb-2 ${
                          idx % 2 === 0 ? "md:justify-end" : "md:justify-start"
                        }`}
                      >
                        {award.images.map((image, imageIdx) => (
                          <div
                            key={imageIdx}
                            className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg bg-gray-800 cursor-pointer transition-transform hover:scale-95"
                            onClick={() => openImageModal(award.id, imageIdx)}
                          >
                            {/* Use next/image for optimized loading */}
                            <div className="w-full h-full flex items-center justify-center bg-[#2d3748] text-[#90a3bc] text-xs">
                              <Image
                                src={image.src}
                                alt={image.alt}
                                width={256}
                                height={256}
                                className="object-cover w-full h-full"
                                quality={80}
                                placeholder="blur"
                                blurDataURL={
                                  image.blurDataURL ||
                                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88OjpfwAI+QM4V9Qg1QAAAABJRU5ErkJggg=="
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Timeline icon */}
                  <div className="absolute left-10 md:left-1/2 transform -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-[#3e5c76] rounded-full flex items-center justify-center border-3 md:border-4 border-[#0c111e]">
                    <div className="text-[#f0ebd8]">
                      {getIconComponent(award.icon)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Optimized Modal with improved click outside functionality */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4"
          onClick={closeImageModal}
        >
          <div
            className="relative w-full max-w-5xl mx-auto h-[70vh]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the container
          >
            {/* Close button */}
            <ModalControls onClick={closeImageModal} position="close">
              <FiX className="w-6 h-6" />
            </ModalControls>

            {/* Image navigation - previous */}
            <ModalControls onClick={prevImage} position="left">
              <FiChevronLeft className="w-6 h-6" />
            </ModalControls>

            {/* Fixed-size image container */}
            <div className="relative h-full w-full flex items-center justify-center rounded-lg overflow-hidden border border-teal-700 bg-dark-600/90">
              {getCurrentImage() && (
                <Image
                  src={getCurrentImage()!.src}
                  alt={getCurrentImage()!.alt}
                  width={getCurrentImage()!.width}
                  height={getCurrentImage()!.height}
                  className="max-h-full max-w-full object-contain shadow-2xl"
                  quality={100}
                  priority={true}
                  sizes="(max-width: 768px) 100vw, 80vw"
                  placeholder="blur"
                  blurDataURL={
                    getCurrentImage()!.blurDataURL ||
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88OjpfwAI+QM4V9Qg1QAAAABJRU5ErkJggg=="
                  }
                />
              )}
            </div>

            {/* Image navigation - next */}
            <ModalControls onClick={nextImage} position="right">
              <FiChevronRight className="w-6 h-6" />
            </ModalControls>
          </div>
        </div>
      )}
    </>
  );
}
