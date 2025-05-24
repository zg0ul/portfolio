"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { List, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Refs for TOC containers
  const desktopTocRef = useRef<HTMLDivElement>(null);
  const mobileTocRef = useRef<HTMLDivElement>(null);

  // Track if user is manually scrolling TOC
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Extract ALL headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+?)(?:\s+#+)?$/gm;
    const items: TOCItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      items.push({ id, text, level });
    }

    setTocItems(items);
  }, [content]);

  // Smooth scroll to center the active item in TOC
  const scrollTocToActiveItem = useCallback(
    (itemId: string, immediate = false) => {
      // Don't auto-scroll if user is manually scrolling
      if (isUserScrollingRef.current && !immediate) return;

      const scrollToItem = (container: HTMLDivElement | null) => {
        if (!container || !itemId) return;

        const activeButton = container.querySelector(
          `button[data-id="${itemId}"]`,
        ) as HTMLElement;

        if (activeButton) {
          const containerHeight = container.clientHeight;
          const buttonTop = activeButton.offsetTop;
          const buttonHeight = activeButton.clientHeight;

          // Calculate scroll position to center the button
          const scrollTop = buttonTop - containerHeight / 2 + buttonHeight / 2;

          container.scrollTo({
            top: Math.max(0, scrollTop),
            behavior: immediate ? "auto" : "smooth",
          });
        }
      };

      // Scroll both desktop and mobile TOC containers
      scrollToItem(desktopTocRef.current);
      scrollToItem(mobileTocRef.current);
    },
    [],
  );

  // Track user scrolling on TOC
  const handleTocScroll = useCallback(() => {
    isUserScrollingRef.current = true;

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Reset flag after user stops scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 1000);
  }, []);

  useEffect(() => {
    // Intersection Observer to track active heading
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Get the first visible heading
          const mostVisible = visibleEntries.reduce((prev, current) => {
            return current.boundingClientRect.top < prev.boundingClientRect.top
              ? current
              : prev;
          });

          const newActiveId = mostVisible.target.id;

          if (newActiveId !== activeId) {
            setActiveId(newActiveId);

            // Auto-scroll TOC to active item with a small delay
            setTimeout(() => {
              scrollTocToActiveItem(newActiveId);
            }, 100);
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.5, 1],
      },
    );

    // Observe ALL headings (h1-h6)
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeId, scrollTocToActiveItem]);

  // When mobile TOC opens, scroll to active item
  useEffect(() => {
    if (isOpen && activeId) {
      setTimeout(() => {
        scrollTocToActiveItem(activeId, true);
      }, 300); // Wait for animation to complete
    }
  }, [isOpen, activeId, scrollTocToActiveItem]);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
      setIsOpen(false);
    }
  }, []);

  if (tocItems.length === 0) return null;

  // Desktop TOC
  const DesktopTOC = () => (
    <div className="sticky top-8 hidden lg:block">
      <div className="border-navy-600 bg-navy-800/50 rounded-xl border p-4 shadow-lg backdrop-blur-sm">
        <h3 className="text-neon mb-3 text-base font-bold">On this page</h3>
        <nav
          ref={desktopTocRef}
          onScroll={handleTocScroll}
          className="scrollbar-thin scrollbar-thumb-navy-600 scrollbar-track-navy-900 max-h-[calc(100vh-300px)] space-y-1 overflow-y-auto pr-2"
        >
          {tocItems.map((item) => (
            <button
              key={item.id}
              data-id={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`relative block w-full rounded-md text-left text-sm transition-all duration-300 ease-in-out ${
                activeId === item.id
                  ? "text-neon bg-neon/10 font-medium"
                  : "hover:bg-navy-700/30 text-gray-400 hover:text-gray-200"
              } `}
              style={{
                paddingLeft: `${12 + (item.level - 1) * 12}px`,
                paddingRight: "12px",
                paddingTop: "6px",
                paddingBottom: "6px",
              }}
            >
              {/* Animated highlight indicator */}
              {activeId === item.id && (
                <motion.div
                  layoutId="desktop-toc-indicator"
                  className="bg-neon absolute top-0 bottom-0 left-0 w-0.5 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  // Mobile TOC
  const MobileTOC = () => (
    <div className="lg:hidden">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-navy-800/90 border-navy-600 hover:bg-navy-700/90 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <List className="h-5 w-5 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="bg-navy-800/95 border-navy-600 fixed right-4 bottom-20 left-4 z-50 flex max-h-[60vh] flex-col rounded-2xl border shadow-2xl backdrop-blur-xl sm:left-auto sm:w-80"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-4 pb-0">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    On this page
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-navy-700/50 rounded-lg p-1 text-gray-400 transition-colors hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <nav
                ref={mobileTocRef}
                onScroll={handleTocScroll}
                className="scrollbar-thin scrollbar-thumb-navy-600 scrollbar-track-navy-900 flex-1 space-y-1 overflow-y-auto px-4 pb-4"
              >
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    data-id={item.id}
                    onClick={() => scrollToHeading(item.id)}
                    className={`relative block w-full rounded-lg text-left text-sm transition-all duration-300 ease-in-out ${
                      activeId === item.id
                        ? "text-neon bg-neon/10 pr-8 font-medium"
                        : "hover:bg-navy-700/30 text-gray-300 hover:text-white"
                    } `}
                    style={{
                      paddingLeft: `${12 + (item.level - 1) * 12}px`,
                      paddingRight: activeId === item.id ? "32px" : "12px",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                    }}
                  >
                    {/* Animated highlight indicator with gap from scrollbar */}
                    {activeId === item.id && (
                      <motion.div
                        layoutId="mobile-toc-indicator"
                        className="bg-neon absolute top-1 bottom-1 left-0 w-0.5 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 block">{item.text}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <DesktopTOC />
      <MobileTOC />
    </>
  );
}
