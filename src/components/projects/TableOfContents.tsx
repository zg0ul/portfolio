"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  }, [content]);

  // Set up intersection observer to update active link on scroll
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" },
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
      // Scroll the element into view
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-navy-600 bg-navy-800/50 rounded-lg border p-4 shadow-md backdrop-blur-sm"
    >
      <h3 className="text-neon mb-4 text-lg font-medium">On this page</h3>
      <nav className="toc-nav">
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
            >
              <button
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-neon-4 text-left text-sm transition-colors ${
                  activeId === item.id
                    ? "text-neon font-medium"
                    : "text-gray-400"
                }`}
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
