/* eslint-disable @typescript-eslint/no-explicit-any */
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

// Simple remark plugin to handle YouTube links
const remarkYouTube = () => {
  return (tree: any) => {
    visit(tree, "paragraph", (node) => {
      // Check if paragraph contains only a YouTube link
      if (
        node.children.length === 1 &&
        node.children[0].type === "text" &&
        /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*)?$/.test(
          node.children[0].value.trim(),
        )
      ) {
        // Mark this paragraph as a YouTube embed
        node.data = node.data || {};
        node.data.youtubeEmbed = true;
        node.data.youtubeUrl = node.children[0].value.trim();
      }
    });
  };
};

// Configure MDX with proper error handling
export function configureMdx(source: string, components: any) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [
            remarkGfm,
            remarkYouTube,
            // Handle code languages
            () => (tree) => {
              visit(tree, "code", (node) => {
                if (!node.lang) {
                  node.lang = "text";
                }
                // Normalize language aliases
                const langAliases: { [key: string]: string } = {
                  js: "javascript",
                  jsx: "javascript",
                  ts: "typescript",
                  tsx: "typescript",
                  py: "python",
                  sh: "bash",
                  shell: "bash",
                  yml: "yaml",
                };
                if (langAliases[node.lang]) {
                  node.lang = langAliases[node.lang];
                }
              });
            },
          ],
          rehypePlugins: [
            [
              rehypePrism,
              {
                showLineNumbers: false,
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
          format: "mdx",
          development: process.env.NODE_ENV === "development",
        },
        parseFrontmatter: false,
      }}
    />
  );
}
