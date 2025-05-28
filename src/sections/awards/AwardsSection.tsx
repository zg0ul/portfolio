"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BsAward, BsTrophy } from "react-icons/bs";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
} from "react-icons/fi";
import { Award } from "@/lib/awards-data";
import * as motion from "motion/react-client";

interface AwardsSectionProps {
  awards: Award[];
}

export default function AwardsSection({ awards }: AwardsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentAwardId, setCurrentAwardId] = useState<number | null>(null);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

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
  }, [isModalOpen, currentAwardId]);

  // Get icon component based on string name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "BsAward":
        return <BsAward className="h-5 w-5 sm:h-6 sm:w-6" />;
      case "BsTrophy":
        return <BsTrophy className="h-5 w-5 sm:h-6 sm:w-6" />;
      default:
        return <BsAward className="h-5 w-5 sm:h-6 sm:w-6" />;
    }
  };

  // Open image modal
  const openImageModal = (awardId: number, imageIndex: number) => {
    setCurrentAwardId(awardId);
    setCurrentImageIndex(imageIndex);
    setImageLoading(true);
    setIsModalOpen(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(0);
    setCurrentAwardId(null);
    setImageLoading(false);
  };

  // Navigate to the previous image
  const prevImage = React.useCallback(() => {
    if (!currentAwardId) return;

    const currentAward = awards.find((award) => award.id === currentAwardId);
    if (!currentAward || !currentAward.images.length) return;

    setImageLoading(true);
    setCurrentImageIndex((prev) =>
      prev <= 0 ? currentAward.images.length - 1 : prev - 1,
    );
  }, [currentAwardId, awards]);

  // Navigate to the next image
  const nextImage = React.useCallback(() => {
    if (!currentAwardId) return;

    const currentAward = awards.find((award) => award.id === currentAwardId);
    if (!currentAward || !currentAward.images.length) return;

    setImageLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % currentAward.images.length);
  }, [currentAwardId, awards]);

  // Get current image data for the modal
  const getCurrentImage = () => {
    if (!currentAwardId) return null;

    const currentAward = awards.find((award) => award.id === currentAwardId);
    if (!currentAward || !currentAward.images.length) return null;

    return currentAward.images[currentImageIndex];
  };

  const getCurrentAward = () => {
    if (!currentAwardId) return null;
    return awards.find((award) => award.id === currentAwardId);
  };

  return (
    <>
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-12 text-center sm:mb-16">
          <h1 className="section-title mb-4">Honors & Awards</h1>
          <p className="section-description mx-auto max-w-2xl">
            Recognition for excellence in technology and innovation
          </p>
        </div>

        {/* Awards Grid - Responsive layout */}
        <div className="space-y-8 sm:space-y-12">
          {awards.map((award, idx) => (
            <motion.div
              key={award.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              {/* Award Card */}
              <div className="bg-navy-800/50 border-navy-600 hover:border-navy-500/70 relative overflow-hidden rounded-2xl border p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl sm:p-8">
                {/* Background decoration */}
                <div className="from-neon/5 absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Header section */}
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:gap-6">
                    {/* Icon and badge */}
                    <div className="mb-4 flex items-center gap-4 sm:mb-0 sm:flex-col sm:items-center">
                      <motion.div
                        className="bg-neon/20 border-neon/30 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg sm:h-16 sm:w-16"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-neon">
                          {getIconComponent(award.icon)}
                        </div>
                      </motion.div>

                      {/* Date badge */}
                      <div className="bg-navy-700/80 text-neon-10 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm sm:mt-2 sm:text-sm">
                        {award.date}
                      </div>
                    </div>

                    {/* Title and organization */}
                    <div className="flex-1">
                      <h3 className="text-foreground mb-2 text-xl leading-tight font-bold sm:text-2xl">
                        {award.title}
                      </h3>
                      <p className="text-navy-200 mb-3 text-base font-medium sm:text-lg">
                        {award.issuer}
                      </p>
                      <p className="text-foreground/80 leading-relaxed">
                        {award.description}
                      </p>
                    </div>
                  </div>

                  {/* Image gallery */}
                  {award.images && award.images.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-neon text-sm font-semibold tracking-wide uppercase">
                        Gallery ({award.images.length}{" "}
                        {award.images.length === 1 ? "Image" : "Images"})
                      </h4>

                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                        {award.images.map((image, imageIdx) => (
                          <motion.div
                            key={imageIdx}
                            className="group/image bg-navy-700/50 relative aspect-square cursor-pointer overflow-hidden rounded-xl"
                            onClick={() => openImageModal(award.id, imageIdx)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.3,
                              delay: imageIdx * 0.1,
                            }}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover transition-transform duration-300 group-hover/image:scale-110"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover/image:opacity-100">
                              <motion.div
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                className="bg-neon/20 border-neon/50 rounded-full border p-2 backdrop-blur-sm"
                              >
                                <FiMaximize2 className="text-neon h-4 w-4" />
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeImageModal}
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(8px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
          />

          {/* Modal content */}
          <div className="relative z-10 mx-4 h-[80vh] w-full max-w-6xl">
            {/* Header */}
            <motion.div
              className="mb-4 flex items-center justify-between"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-foreground">
                <h3 className="text-lg font-semibold sm:text-xl">
                  {getCurrentAward()?.title}
                </h3>
                <p className="text-navy-300 text-sm">
                  Image {currentImageIndex + 1} of{" "}
                  {getCurrentAward()?.images?.length || 0}
                </p>
              </div>

              <button
                onClick={closeImageModal}
                className="bg-navy-800/90 border-navy-600 hover:bg-navy-700/90 group flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200 hover:border-red-500/50"
              >
                <FiX className="text-foreground h-5 w-5 transition-colors group-hover:text-red-400" />
              </button>
            </motion.div>

            {/* Image container */}
            <motion.div
              className="bg-navy-900/50 relative h-full overflow-hidden rounded-xl backdrop-blur-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            >
              {/* Navigation buttons */}
              {getCurrentAward() && getCurrentAward()!.images.length > 1 && (
                <>
                  <motion.button
                    onClick={prevImage}
                    className="bg-navy-800/90 border-navy-600 hover:bg-navy-700/90 hover:border-neon/50 absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FiChevronLeft className="text-foreground h-6 w-6" />
                  </motion.button>

                  <motion.button
                    onClick={nextImage}
                    className="bg-navy-800/90 border-navy-600 hover:bg-navy-700/90 hover:border-neon/50 absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <FiChevronRight className="text-foreground h-6 w-6" />
                  </motion.button>
                </>
              )}

              {/* Loading indicator */}
              {imageLoading && (
                <div className="bg-navy-900/50 absolute inset-0 z-20 flex items-center justify-center backdrop-blur-sm">
                  <motion.div
                    className="bg-neon/20 border-neon/50 flex h-16 w-16 items-center justify-center rounded-full border"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <div className="bg-neon h-2 w-2 rounded-full" />
                  </motion.div>
                </div>
              )}

              {/* Main image */}
              {getCurrentImage() && (
                <motion.div
                  key={`${currentAwardId}-${currentImageIndex}`}
                  className="relative h-full w-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={getCurrentImage()!.src}
                    alt={getCurrentImage()!.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                    onLoad={() => setImageLoading(false)}
                    onError={() => setImageLoading(false)}
                  />
                </motion.div>
              )}

              {/* Image info overlay */}
              {getCurrentImage() && (
                <motion.div
                  className="bg-navy-900/90 absolute right-0 bottom-0 left-0 p-4 backdrop-blur-sm"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-foreground text-sm font-medium">
                    {getCurrentImage()!.alt}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}
