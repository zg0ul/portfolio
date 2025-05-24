/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import YouTubeEmbed from "@/components/ui/YoutubeEmbed";
import getYouTubeVideoId from "@/utils/GetYoutubeVideoById";
import { H1, H2, H3, H4, H5, H6 } from "@/components/projects/ClientHeadings";

// Responsive MDX components with mobile-first design
export const mdxComponents = {
  // Enhanced responsive table styling
  table: (props: any) => (
    <div className="border-navy-600 my-4 w-full overflow-hidden rounded-lg border shadow-md sm:my-6">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse" {...props} />
      </div>
    </div>
  ),
  thead: (props: any) => <thead className="bg-navy-700" {...props} />,
  th: (props: any) => (
    <th
      className="border-navy-600 text-foreground border-b p-2 text-left text-sm font-semibold whitespace-nowrap sm:p-3 sm:text-base"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="border-navy-600 text-foreground border-t p-2 text-sm sm:p-3 sm:text-base"
      {...props}
    />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-navy-700/50 transition-colors" {...props} />
  ),

  // Responsive code blocks
  pre: (props: any) => {
    const customClasses =
      "border-navy-600 bg-navy-800/80 my-4 sm:my-6 overflow-x-auto rounded-lg border p-3 sm:p-4 text-xs sm:text-sm shadow-lg";
    const classes = [props.className, customClasses].filter(Boolean).join(" ");
    return <pre className={classes} {...props} />;
  },
  code: (props: any) => {
    const isInline = !props.className;
    return isInline ? (
      <code
        className="bg-navy-800/90 text-neon rounded px-1 py-0.5 font-mono text-xs break-words sm:px-1.5 sm:text-sm"
        {...props}
      />
    ) : (
      <code className={`${props.className || ""} font-mono`} {...props} />
    );
  },

  // Responsive task list items
  li: (props: any) => {
    if (props.className?.includes("task-list-item")) {
      return (
        <li
          className="my-1 flex items-start gap-2 text-sm sm:text-base"
          {...props}
        >
          {props.children}
        </li>
      );
    }
    return <li className="my-1 text-sm sm:text-base" {...props} />;
  },

  // Responsive checkbox styling
  input: (props: any) => {
    if (props.type === "checkbox") {
      return (
        <span
          className={`mt-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border sm:h-5 sm:w-5 ${
            props.checked
              ? "border-neon bg-neon/20 text-neon"
              : "bg-navy-700 border-gray-600"
          }`}
        >
          {props.checked && <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
        </span>
      );
    }
    return <input {...props} />;
  },

  // Responsive blockquotes
  blockquote: (props: any) => (
    <blockquote
      className="border-neon/30 bg-navy-800/50 text-foreground my-4 border-l-4 py-2 pl-3 text-sm italic sm:my-6 sm:py-3 sm:pl-4 sm:text-base"
      {...props}
    />
  ),

  // Responsive horizontal rules
  hr: (props: any) => (
    <hr className="border-navy-600 my-6 border-t sm:my-8" {...props} />
  ),

  // Responsive paragraphs with YouTube detection
  p: (props: any) => {
    const childrenArray = React.Children.toArray(props.children);

    // Check for standalone YouTube links
    if (childrenArray.length === 1 && typeof childrenArray[0] === "string") {
      const text = childrenArray[0] as string;
      const youtubeRegex =
        /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?$/;

      if (youtubeRegex.test(text)) {
        const videoId = getYouTubeVideoId(text);
        if (videoId) {
          return <YouTubeEmbed videoId={videoId} />;
        }
      }
    }

    return (
      <p
        className="text-foreground my-3 text-sm leading-relaxed break-words sm:my-4 sm:text-base"
        {...props}
      />
    );
  },

  // Responsive links
  a: (props: any) => {
    const childrenArray = React.Children.toArray(props.children);

    if (childrenArray.length === 1 && typeof childrenArray[0] === "string") {
      const text = childrenArray[0] as string;
      const youtubeRegex =
        /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?$/;

      if (youtubeRegex.test(text)) {
        const videoId = getYouTubeVideoId(text);
        if (videoId) {
          return <YouTubeEmbed videoId={videoId} />;
        }
      }
    }

    return (
      <a
        className="text-neon hover:text-neon-4 text-sm break-words transition-colors hover:underline sm:text-base"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },

  // Responsive headings
  h1: (props: any) => (
    <H1 className="text-xl sm:text-2xl lg:text-3xl" {...props} />
  ),
  h2: (props: any) => (
    <H2 className="text-lg sm:text-xl lg:text-2xl" {...props} />
  ),
  h3: (props: any) => (
    <H3 className="text-base sm:text-lg lg:text-xl" {...props} />
  ),
  h4: (props: any) => (
    <H4 className="text-sm sm:text-base lg:text-lg" {...props} />
  ),
  h5: (props: any) => <H5 className="text-sm sm:text-base" {...props} />,
  h6: (props: any) => <H6 className="text-xs sm:text-sm" {...props} />,

  // Responsive images
  img: (props: any) => (
    <div className="my-4 w-full sm:my-6">
      <Image
        width={800}
        height={600}
        className="h-auto w-full max-w-full rounded-lg object-cover shadow-lg"
        loading="lazy"
        alt={props.alt || "Content image"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        {...props}
      />
    </div>
  ),

  // Responsive lists
  ul: (props: any) => {
    if (props.className?.includes("contains-task-list")) {
      return (
        <ul className="my-3 space-y-1 pl-1 sm:my-4 sm:space-y-2" {...props} />
      );
    }
    return (
      <ul
        className="my-3 list-disc space-y-1 pl-4 text-sm sm:my-4 sm:space-y-2 sm:pl-6 sm:text-base"
        {...props}
      />
    );
  },

  ol: (props: any) => (
    <ol
      className="my-3 list-decimal space-y-1 pl-4 text-sm sm:my-4 sm:space-y-2 sm:pl-6 sm:text-base"
      {...props}
    />
  ),

  // Responsive strong and emphasis
  strong: (props: any) => (
    <strong className="text-sm font-bold sm:text-base" {...props} />
  ),

  em: (props: any) => <em className="text-sm italic sm:text-base" {...props} />,
};
