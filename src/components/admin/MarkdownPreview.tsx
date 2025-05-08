"use client";

import React from "react";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItHighlightjs from "markdown-it-highlightjs";
import "highlight.js/styles/atom-one-dark.css";
import { cn } from "@/lib/utils";
import "@/styles/markdown-preview.css";

// Initialize markdown-it with options and plugins
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .use(markdownItAnchor, {
    permalink: true,
    permalinkSymbol: "#",
    permalinkAttrs: () => ({ "aria-hidden": "true" }),
  })
  .use(markdownItHighlightjs);

// Customize the renderer to add target="_blank" to external links
const defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const hrefIndex = token.attrIndex("href");

  if (hrefIndex >= 0) {
    const href = token.attrs[hrefIndex][1];
    if (href && !href.startsWith("#") && !href.startsWith("/")) {
      token.attrPush(["target", "_blank"]);
      token.attrPush(["rel", "noopener noreferrer"]);
    }
  }

  return defaultRender(tokens, idx, options, env, self);
};

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export default function MarkdownPreview({
  content,
  className,
}: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <div className="text-gray-400">
        <p>Preview will appear here. Start typing markdown in the editor.</p>
      </div>
    );
  }

  // Render the markdown to HTML
  const renderedHTML = md.render(content);

  return (
    <div className={cn("markdown-preview overflow-auto", className)}>
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: renderedHTML }}
      />
    </div>
  );
}
