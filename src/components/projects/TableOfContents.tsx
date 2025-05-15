"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { List, ChevronUp } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  // For mobile view - collapse/expand the TOC
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Extract headings from markdown content
  useEffect(() => {
    if (!content) return;

    const headingRegex = /^(#{1,6})\s+(.+?)(?:\s+#+)?$/gm;
    const matches = [...content.matchAll(headingRegex)];

    const tocItems = matches.map((match) => {
      const level = match[1].length;
      const text = match[2].trim();
      // Generate a unique ID for the heading
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      return { id, text, level };
    });

    setItems(tocItems);

    // Expand TOC on desktop automatically
    const isDesktop = window.innerWidth >= 1024;
    setIsCollapsed(!isDesktop);
  }, [content]);

  // Set up intersection observer to update active link on scroll
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Filter for entries that are currently intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          // Find the first visible heading (closest to the top)
          const sortedVisible = [...visibleEntries].sort(
            (a, b) =>
              a.target.getBoundingClientRect().top -
              b.target.getBoundingClientRect().top,
          );

          // Set the active ID to the first visible heading
          setActiveId(sortedVisible[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: [0.1, 0.5, 0.9], // Multiple thresholds for better accuracy
      },
    );

    // Observe all headings
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [items]);

  // Scroll to the section when a TOC item is clicked
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // For mobile, collapse the TOC after clicking
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      }

      // Add a slight delay to ensure any animations have finished
      setTimeout(() => {
        // Calculate offset to account for sticky headers or navigation
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Scroll the element into view
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Set this as the active section
        setActiveId(id);
      }, 100);
    }
  };

  if (items.length === 0) {
    return null;
  }

  // On mobile we want a compact version that can be expanded
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-navy-600 bg-navy-800/50 toc-container rounded-lg border p-4 shadow-md backdrop-blur-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-neon text-lg font-medium">On this page</h3>

        {/* Mobile toggle button */}
        <button
          onClick={toggleCollapse}
          className="hover:text-neon text-gray-400 transition-colors focus:outline-none lg:hidden"
          aria-label={
            isCollapsed
              ? "Expand table of contents"
              : "Collapse table of contents"
          }
        >
          {isCollapsed ? (
            <List className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav
        className={`toc-nav ${isCollapsed && isMobile ? "hidden" : "block"}`}
      >
        <ul className="scrollbar-thin scrollbar-thumb-navy-600 scrollbar-track-navy-900 max-h-[calc(100vh-250px)] space-y-2 overflow-y-auto pr-2">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
              className={item.level > 2 && isCollapsed ? "hidden" : ""}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-neon-4 text-left text-sm transition-colors ${
                  activeId === item.id
                    ? "text-neon active font-medium"
                    : "text-gray-400"
                }`}
                data-active={activeId === item.id ? "true" : "false"}
                data-id={item.id}
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}
