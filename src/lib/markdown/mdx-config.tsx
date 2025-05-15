/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/markdown/mdx-config.tsx
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import React from "react";
import YouTubeEmbed from "@/components/ui/YoutubeEmbed";
import getYouTubeVideoId from "@/utils/GetYoutubeVideoById";

// This function recursively processes children for YouTube links
const processChildren = (children: React.ReactNode): React.ReactNode => {
  return React.Children.map(children, (child) => {
    // Handle string children that might contain YouTube links
    if (typeof child === "string") {
      return processTextForYouTubeLinks(child);
    }

    // Handle React elements that might have children with YouTube links
    if (React.isValidElement(child) && child.props) {
      const childProps = child.props as Record<string, unknown>;
      if ("children" in childProps) {
        // Clone the element with processed children
        return React.cloneElement(
          child,
          { ...child.props },
          processChildren(childProps.children as React.ReactNode),
        );
      }
    }

    // Return other children unmodified
    return child;
  });
};

// Process text content for YouTube links
const processTextForYouTubeLinks = (content: string): React.ReactNode => {
  // Regular expression to find YouTube links
  const youtubeRegex =
    /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?/g;

  // If content doesn't contain a YouTube link, return as is
  if (!youtubeRegex.test(content)) {
    return content;
  }

  // Split the content by YouTube links
  const parts = content.split(youtubeRegex);
  const matches = content.match(youtubeRegex) || [];

  // If we have matches and parts, build a React fragment with embedded videos
  if (matches.length > 0 && parts.length > 0) {
    const result: React.ReactNode[] = [];

    // Combine the parts and matches back together with video embeds
    parts.forEach((part, index) => {
      if (part) result.push(part);

      if (index < matches.length) {
        const videoId = getYouTubeVideoId(matches[index]);
        if (videoId) {
          result.push(<YouTubeEmbed key={videoId} videoId={videoId} />);
        } else {
          result.push(matches[index]);
        }
      }
    });

    return <>{result}</>;
  }

  return content;
};

// Enhanced components with YouTube processing for all elements
const createEnhancedComponents = (baseComponents: any) => {
  // Create wrapper components that add YouTube processing
  const enhancedComponents = { ...baseComponents };

  // Add YouTube processing to paragraph component
  const originalP = baseComponents.p;
  enhancedComponents.p = (props: any) => {
    // Process children for YouTube links
    const processedChildren = processChildren(props.children);

    // Use the original component with processed children
    return originalP ? (
      originalP({ ...props, children: processedChildren })
    ) : (
      <p className="my-4 text-gray-300">{processedChildren}</p>
    );
  };

  // Add YouTube processing to list item component
  const originalLi = baseComponents.li;
  enhancedComponents.li = (props: any) => {
    // Process children for YouTube links
    const processedChildren = processChildren(props.children);

    // Use the original component with processed children
    return originalLi ? (
      originalLi({ ...props, children: processedChildren })
    ) : (
      <li className="my-1">{processedChildren}</li>
    );
  };

  // Add YouTube processing to anchor component
  const originalA = baseComponents.a;
  enhancedComponents.a = (props: any) => {
    // Check if this is a direct YouTube link
    if (props.href) {
      const videoId = getYouTubeVideoId(props.href);
      if (videoId && props.children === props.href) {
        return <YouTubeEmbed videoId={videoId} />;
      }
    }

    // Process children for YouTube links
    const processedChildren = processChildren(props.children);

    // Use the original component with processed children
    return originalA ? (
      originalA({ ...props, children: processedChildren })
    ) : (
      <a
        className="text-neon hover:text-neon-4 transition-colors hover:underline"
        {...props}
      >
        {processedChildren}
      </a>
    );
  };

  // Enhance heading components to add IDs for table of contents
  ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((heading) => {
    const OriginalHeading = baseComponents[heading];
    enhancedComponents[heading] = (props: any) => {
      // Generate ID from heading text for anchor linking
      const id =
        typeof props.children === "string"
          ? props.children
              .toLowerCase()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-")
          : "";

      return OriginalHeading ? (
        <OriginalHeading id={id} {...props} />
      ) : (
        React.createElement(heading, { id, ...props }, props.children)
      );
    };
  });

  return enhancedComponents;
};

// Configure MDX with all supported languages and enhanced components
export function configureMdx(source: string, components: any) {
  // Create enhanced components with YouTube processing
  const enhancedComponents = createEnhancedComponents(components);

  return (
    <MDXRemote
      source={source}
      components={enhancedComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            // This plugin handles unsupported languages
            () => (tree) => {
              visit(tree, "code", (node) => {
                // Handle empty language tags or ensure default language
                if (!node.lang) {
                  node.lang = "text";
                }

                // No language mapping needed here - let rehype-prism handle it
              });
            },
          ],
          rehypePlugins: [
            [
              rehypePrism,
              {
                showLineNumbers: true,
                ignoreMissing: true,
                aliases: {
                  js: "javascript",
                  jsx: "javascript",
                  ts: "typescript",
                  tsx: "typescript",
                  py: "python",
                  sh: "bash",
                  html: "markup",
                },
              },
            ],
          ],
        },
      }}
    />
  );
}
