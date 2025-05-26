/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import YouTubeEmbed from "@/components/ui/YoutubeEmbed";
import getYouTubeVideoId from "@/utils/GetYoutubeVideoById";
import { H1, H2, H3, H4, H5, H6 } from "@/components/projects/ClientHeadings";

// Server-safe components that avoid client component issues
const createMdxComponents = () => ({
  // Enhanced responsive table styling
  table: (props: any) => (
    <div className="my-6 w-full overflow-hidden rounded-lg border border-gray-700 shadow-lg sm:my-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-gray-900" {...props} />
      </div>
    </div>
  ),
  thead: (props: any) => <thead className="bg-gray-800" {...props} />,
  th: (props: any) => (
    <th
      className="border-b border-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-200 sm:px-6 sm:text-base"
      {...props}
    />
  ),
  td: (props: any) => (
    <td
      className="border-t border-gray-700 px-4 py-3 text-sm text-gray-300 sm:px-6 sm:text-base"
      {...props}
    />
  ),
  tr: (props: any) => (
    <tr className="transition-colors hover:bg-gray-800/50" {...props} />
  ),

  // Responsive code blocks with better colors
  pre: (props: any) => {
    const customClasses =
      "my-6 overflow-x-auto rounded-lg border border-gray-700 bg-gray-900 p-4 text-sm shadow-lg sm:my-8 sm:p-6 sm:text-base";
    const classes = [props.className, customClasses].filter(Boolean).join(" ");
    return <pre className={classes} {...props} />;
  },
  code: (props: any) => {
    const isInline = !props.className;
    return isInline ? (
      <code
        className="rounded bg-gray-800 px-2 py-1 font-mono text-sm text-blue-300 [&:not(.hljs)]:text-blue-300"
        {...props}
      />
    ) : (
      <code
        className={`${props.className || ""} font-mono text-gray-300`}
        {...props}
      />
    );
  },

  // Responsive task list items
  li: (props: any) => {
    if (props.className?.includes("task-list-item")) {
      return (
        <li
          className="my-2 flex list-none items-start gap-3 text-base text-gray-300"
          {...props}
        />
      );
    }
    return <li className="my-1 text-base text-gray-300" {...props} />;
  },

  // Responsive checkbox styling
  input: (props: any) => {
    if (props.type === "checkbox") {
      return (
        <span
          className={`mt-1 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
            props.checked
              ? "border-blue-500 bg-blue-500/20 text-blue-400"
              : "border-gray-600 bg-gray-800"
          }`}
        >
          {props.checked && <Check className="h-3.5 w-3.5" />}
        </span>
      );
    }
    return <input {...props} />;
  },

  // Responsive blockquotes with better styling
  blockquote: (props: any) => (
    <blockquote
      className="my-6 border-l-4 border-blue-500 bg-gray-800/50 py-4 pl-6 text-base text-gray-300 italic sm:my-8"
      {...props}
    />
  ),

  // Responsive horizontal rules
  hr: (props: any) => (
    <hr className="my-8 border-t border-gray-700 sm:my-12" {...props} />
  ),

  // Fixed paragraphs - handle YouTube embeds safely
  p: (props: any) => {
    const childrenArray = React.Children.toArray(props.children);

    // Check for standalone YouTube links
    if (childrenArray.length === 1 && typeof childrenArray[0] === "string") {
      const text = childrenArray[0] as string;
      const youtubeRegex =
        /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?$/;

      if (youtubeRegex.test(text.trim())) {
        const videoId = getYouTubeVideoId(text);
        if (videoId) {
          return <YouTubeEmbed videoId={videoId} />;
        }
      }
    }

    return (
      <p
        className="my-4 text-base leading-relaxed text-gray-300 sm:my-6 sm:text-lg sm:leading-relaxed"
        {...props}
      />
    );
  },

  // Fixed links with proper YouTube handling and no underlines
  a: (props: any) => {
    const childrenArray = React.Children.toArray(props.children);

    // Check if this is a standalone YouTube link
    if (childrenArray.length === 1 && typeof childrenArray[0] === "string") {
      const text = childrenArray[0] as string;
      const youtubeRegex =
        /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?$/;

      // Only convert to embed if the link text matches the href exactly
      if (youtubeRegex.test(text) && props.href === text) {
        const videoId = getYouTubeVideoId(text);
        if (videoId) {
          return <YouTubeEmbed videoId={videoId} />;
        }
      }
    }

    return (
      <a
        className="break-words text-blue-400 decoration-blue-400/50 transition-colors hover:text-blue-300 hover:underline"
        target={props.href?.startsWith("http") ? "_blank" : undefined}
        rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },

  // Responsive headings with better colors
  h1: (props: any) => (
    <H1
      className="mt-8 mb-6 text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <H2
      className="mt-8 mb-4 text-xl font-semibold text-gray-100 sm:text-2xl lg:text-3xl"
      {...props}
    />
  ),
  h3: (props: any) => (
    <H3
      className="mt-6 mb-4 text-lg font-semibold text-gray-200 sm:text-xl lg:text-2xl"
      {...props}
    />
  ),
  h4: (props: any) => (
    <H4
      className="mt-6 mb-3 text-base font-semibold text-gray-200 sm:text-lg lg:text-xl"
      {...props}
    />
  ),
  h5: (props: any) => (
    <H5
      className="mt-4 mb-3 text-base font-medium text-gray-300 sm:text-lg"
      {...props}
    />
  ),
  h6: (props: any) => (
    <H6
      className="mt-4 mb-2 text-sm font-medium text-gray-400 sm:text-base"
      {...props}
    />
  ),

  // Improved image handling
  img: (props: any) => (
    <span className="not-prose my-6 block w-full sm:my-8">
      <Image
        width={1200}
        height={800}
        className="h-auto w-full max-w-full rounded-lg object-cover shadow-xl"
        loading="lazy"
        alt={props.alt || "Content image"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        {...props}
      />
    </span>
  ),

  // Responsive lists with better spacing and colors
  ul: (props: any) => {
    if (props.className?.includes("contains-task-list")) {
      return <ul className="my-4 space-y-2 pl-2 sm:my-6" {...props} />;
    }
    return (
      <ul
        className="my-4 list-disc space-y-2 pl-6 text-base text-gray-300 sm:my-6 sm:text-lg"
        {...props}
      />
    );
  },

  ol: (props: any) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-6 text-base text-gray-300 sm:my-6 sm:text-lg"
      {...props}
    />
  ),

  // Better emphasis styling
  strong: (props: any) => (
    <strong className="font-bold text-white" {...props} />
  ),

  em: (props: any) => <em className="text-gray-200 italic" {...props} />,
});

// Export the components as a function call to avoid client component issues
export const mdxComponents = createMdxComponents();
