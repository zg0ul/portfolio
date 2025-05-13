"use client";

import { useEffect } from "react";

// This component handles URL hash fragments for direct section links
export default function ScrollToHashHandler() {
  useEffect(() => {
    // Function to scroll to element with ID from the URL hash
    const scrollToHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        // Wait a bit for the page to be fully rendered
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            // Calculate offset to account for sticky headers
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - headerOffset;

            // Find the scrollable container (this could be the mdx-container or window)
            const scrollContainer =
              document.querySelector(".mdx-container") || window;

            if (scrollContainer === window) {
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            } else {
              // For custom scrollable container
              scrollContainer.scrollTo({
                top: element.offsetTop - headerOffset,
                behavior: "smooth",
              });
            }

            // Update the active item in the TOC
            const activeButton = document.querySelector(
              `button[data-active="true"]`,
            );
            if (activeButton) {
              activeButton.setAttribute("data-active", "false");
              activeButton.classList.remove("active");
            }

            const newActiveButton = document.querySelector(
              `button[data-id="${hash}"]`,
            );
            if (newActiveButton) {
              newActiveButton.setAttribute("data-active", "true");
              newActiveButton.classList.add("active");
            }
          }
        }, 300);
      }
    };

    // Call on initial load
    scrollToHash();

    // Set up listener for hash changes
    window.addEventListener("hashchange", scrollToHash);

    // Clean up
    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  // This is a utility component with no UI
  return null;
}
