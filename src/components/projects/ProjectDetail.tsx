// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { SupabaseProject } from "@/lib/supabase/types";
// import {
//   ArrowLeft,
//   Calendar,
//   ExternalLink,
//   Github,
//   Clock,
//   Tag,
//   Info,
//   Youtube,
// } from "lucide-react";
// import { motion } from "framer-motion";
// import MarkdownIt from "markdown-it";
// import markdownItAnchor from "markdown-it-anchor";
// import markdownItHighlightjs from "markdown-it-highlightjs";
// import markdownItTaskLists from "markdown-it-task-lists";
// import markdownItMark from "markdown-it-mark";
// import markdownItSup from "markdown-it-sup";
// import markdownItSub from "markdown-it-sub";
// import markdownItContainer from "markdown-it-container";
// import markdownItAttrs from "markdown-it-attrs";
// import "highlight.js/styles/atom-one-dark.css";
// import { format, parseISO } from "date-fns";
// import "@/styles/markdown-preview.css";
// import dynamic from "next/dynamic";

// // Dynamic import for YouTubeEmbed to avoid SSR issues
// const YouTubeEmbed = dynamic(() => import("../admin/YouTubeEmbed"), {
//   ssr: false,
// });

// // Helper function to extract YouTube video ID
// const getYouTubeVideoId = (url: string): string | null => {
//   const regex =
//     /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };

// // Initialize markdown-it with options and plugins
// const md = new MarkdownIt({
//   html: true,
//   breaks: true,
//   linkify: true,
//   typographer: true,
// })
//   .use(markdownItAnchor, {
//     permalink: true,
//     permalinkSymbol: "#",
//     permalinkAttrs: () => ({ "aria-hidden": "true" }),
//   })
//   .use(markdownItHighlightjs, { inline: true })
//   .use(markdownItTaskLists, { enabled: true, label: true, labelAfter: true })
//   .use(markdownItMark)
//   .use(markdownItSub)
//   .use(markdownItSup)
//   .use(markdownItAttrs, {
//     leftDelimiter: "{",
//     rightDelimiter: "}",
//     allowedAttributes: ["id", "class"],
//   })
//   .use(markdownItContainer, "info")
//   .use(markdownItContainer, "success")
//   .use(markdownItContainer, "warning")
//   .use(markdownItContainer, "danger");

// // Add support for custom YouTube embed tag
// const defaultRender =
//   md.renderer.rules.html_block ||
//   function (tokens, idx, options, env, self) {
//     return self.renderToken(tokens, idx, options);
//   };

// // Custom table renderer for better styling
// md.renderer.rules.table_open = () => {
//   return '<div class="table-container"><table class="markdown-table">';
// };

// md.renderer.rules.table_close = () => {
//   return "</table></div>";
// };

// // Enhance code block styling
// const originalCodeBlockRule = md.renderer.rules.code_block;
// md.renderer.rules.code_block = function (tokens, idx, options, env, self) {
//   const originalCodeHtml = originalCodeBlockRule
//     ? originalCodeBlockRule(tokens, idx, options, env, self)
//     : self.renderToken(tokens, idx, options);

//   return `<div class="code-block-wrapper">${originalCodeHtml}</div>`;
// };

// // Enhance strikethrough rendering
// md.renderer.rules.s_open = () => '<span class="strikethrough">';
// md.renderer.rules.s_close = () => "</span>";

// md.renderer.rules.html_block = function (tokens, idx, options, env, self) {
//   const content = tokens[idx].content;

//   // Check if this is our custom YouTube embed
//   if (content.includes("<youtube-embed")) {
//     const idMatch = content.match(/id="([^"]+)"/);
//     if (idMatch && idMatch[1]) {
//       const videoId = idMatch[1];
//       return `
//         <div class="video-container">
//           <iframe
//             width="100%"
//             height="400"
//             src="https://www.youtube.com/embed/${videoId}"
//             title="YouTube video player"
//             frameborder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowfullscreen>
//           </iframe>
//         </div>
//       `;
//     }
//   }

//   return defaultRender(tokens, idx, options, env, self);
// };

// // Custom renderer for links to open in new tab
// md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
//   const token = tokens[idx];
//   const hrefIndex = token.attrIndex("href");

//   if (hrefIndex >= 0) {
//     const href = token.attrs[hrefIndex][1];
//     if (href && !href.startsWith("#") && !href.startsWith("/")) {
//       token.attrPush(["target", "_blank"]);
//       token.attrPush(["rel", "noopener noreferrer"]);
//     }
//   }

//   return self.renderToken(tokens, idx, options);
// };

// // Transform YouTube links to embedded iframes
// const videoLinkRegex =
//   /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g;

// const parseContent = (content: string) => {
//   // Process YouTube links in the markdown content
//   let processedContent = content;

//   // Extract YouTube links and convert them to YouTube card format
//   processedContent = processedContent.replace(
//     videoLinkRegex,
//     (match, videoId) => {
//       return `
// <div class="youtube-card" onclick="this.innerHTML='<div class=\\"video-container\\"><iframe width=\\"100%\\" height=\\"400\\" src=\\"https://www.youtube.com/embed/${videoId}?autoplay=1\\" title=\\"YouTube video player\\" frameborder=\\"0\\" allow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay\\" allowfullscreen></iframe></div>'">
//   <div class="thumbnail">
//     <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="YouTube thumbnail">
//     <div class="play-button">
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none">
//         <path d="M8 5v14l11-7z" />
//       </svg>
//     </div>
//   </div>
//   <div class="content">
//     <h3>YouTube Video</h3>
//     <p>Click to play this video</p>
//   </div>
// </div>
//     `;
//     },
//   );

//   // Also handle our custom tags for backward compatibility
//   const embedTagRegex =
//     /<youtube-embed\s+id="([a-zA-Z0-9_-]{11})"\s*><\/youtube-embed>/g;
//   processedContent = processedContent.replace(embedTagRegex, (_, videoId) => {
//     return `
// <div class="youtube-card" onclick="this.innerHTML='<div class=\\"video-container\\"><iframe width=\\"100%\\" height=\\"400\\" src=\\"https://www.youtube.com/embed/${videoId}?autoplay=1\\" title=\\"YouTube video player\\" frameborder=\\"0\\" allow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay\\" allowfullscreen></iframe></div>'">
//   <div class="thumbnail">
//     <img src="https://i.ytimg.com/vi/${videoId}/hqdefault.jpg" alt="YouTube thumbnail">
//     <div class="play-button">
//       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="none">
//         <path d="M8 5v14l11-7z" />
//       </svg>
//     </div>
//   </div>
//   <div class="content">
//     <h3>YouTube Video</h3>
//     <p>Click to play this video</p>
//   </div>
// </div>
//     `;
//   });

//   return md.render(processedContent);
// };

// interface ProjectDetailProps {
//   project: SupabaseProject;
// }

// const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
//   // Format date for display
//   const formatDate = (dateString?: string) => {
//     if (!dateString) return null;
//     try {
//       return format(parseISO(dateString), "MMMM d, yyyy");
//     } catch (error) {
//       return null;
//     }
//   };

//   const startDate = formatDate(project.start_date);
//   const endDate = formatDate(project.end_date);
//   const isActive = project.start_date && !project.end_date;

//   const timelineText = startDate
//     ? endDate
//       ? `${startDate} - ${endDate}`
//       : `${startDate} - Present`
//     : null;

//   // Render markdown content
//   const contentToRender =
//     project.detailed_content ||
//     project.long_description ||
//     project.short_description ||
//     "";
//   const renderedHTML = parseContent(contentToRender);

//   return (
//     <>
//       {/* Background decoration with navy theme */}
//       <div className="absolute inset-0 -z-10 overflow-hidden">
//         <div className="from-neon/5 absolute inset-x-0 top-0 h-40 bg-gradient-to-b to-transparent blur-2xl"></div>
//         <div className="bg-navy-900/90 absolute inset-0 backdrop-blur-sm"></div>
//       </div>

//       <div className="container mx-auto px-4 py-16">
//         {/* Back button */}
//         <div className="mb-8">
//           <Link
//             href="/projects"
//             className="group bg-navy-800/70 hover:bg-navy-700 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-200 transition-all"
//           >
//             <ArrowLeft className="h-4 w-4 transition-all group-hover:-translate-x-1" />
//             Back to projects
//           </Link>
//         </div>

//         {/* Project header */}
//         <div className="mb-12">
//           {/* Project meta */}
//           <div className="mb-4 flex flex-wrap gap-3">
//             <span className="bg-navy-700/70 text-neon inline-flex items-center rounded-md px-3 py-1 text-sm font-medium">
//               <Tag className="mr-1 h-4 w-4" />
//               {project.category}
//             </span>

//             {timelineText && (
//               <span className="bg-navy-700/70 inline-flex items-center rounded-md px-3 py-1 text-sm font-medium text-gray-300">
//                 <Calendar className="mr-1 h-4 w-4" />
//                 {timelineText}
//               </span>
//             )}

//             {isActive && (
//               <span className="inline-flex items-center rounded-md bg-green-900/30 px-3 py-1 text-sm font-medium text-green-400">
//                 <Clock className="mr-1 h-4 w-4" />
//                 Active project
//               </span>
//             )}
//           </div>

//           {/* Project title */}
//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
//           >
//             {project.title}
//           </motion.h1>

//           {/* Project description */}
//           <div className="mb-8 max-w-3xl text-lg text-gray-300">
//             {project.description || project.short_description}
//           </div>

//           {/* Technology tags */}
//           <div className="mb-10">
//             <h3 className="mb-3 text-sm font-medium text-gray-400 uppercase">
//               Technologies
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {project.technologies?.map((tech) => (
//                 <span
//                   key={tech}
//                   className="bg-navy-700/50 border-navy-600 rounded-md border px-3 py-1.5 text-sm text-white"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Project links */}
//           <div className="flex flex-wrap gap-4">
//             {project.github_url && (
//               <a
//                 href={project.github_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-navy-700 hover:bg-navy-600 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium text-white transition-colors"
//               >
//                 <Github className="h-5 w-5" />
//                 <span>View Code</span>
//               </a>
//             )}
//             {project.live_url && (
//               <a
//                 href={project.live_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-neon text-navy-900 hover:bg-neon/90 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium transition-colors"
//               >
//                 <ExternalLink className="h-5 w-5" />
//                 <span>Live Demo</span>
//               </a>
//             )}
//           </div>
//         </div>

//         {/* Featured Image */}
//         {(project.featured_image || project.thumbnail_url) && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="mb-16"
//           >
//             <div className="border-navy-600 overflow-hidden rounded-xl border shadow-lg">
//               <Image
//                 src={project.featured_image || project.thumbnail_url || ""}
//                 alt={project.title}
//                 width={1200}
//                 height={675}
//                 className="w-full object-cover"
//                 priority
//               />
//             </div>
//           </motion.div>
//         )}

//         {/* Content container with proper spacing */}
//         <div className="mx-auto max-w-4xl">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             className="bg-navy-800/50 border-navy-700 rounded-xl border p-8 shadow-lg"
//           >
//             {/* Display note if there is no detailed content */}
//             {!contentToRender.trim() && (
//               <div className="bg-navy-700/50 flex items-center gap-3 rounded-lg p-6 text-gray-300">
//                 <Info className="text-neon h-6 w-6" />
//                 <p>No detailed information available for this project.</p>
//               </div>
//             )}

//             {/* Render the markdown content with enhanced styling */}
//             <article
//               className="prose prose-invert markdown-preview max-w-none"
//               dangerouslySetInnerHTML={{ __html: renderedHTML }}
//             />
//           </motion.div>

//           {/* Gallery Images */}
//           {project.gallery_images && project.gallery_images.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="mt-16"
//             >
//               <h2 className="text-neon mb-6 text-2xl font-bold">Gallery</h2>
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//                 {project.gallery_images.map((image, index) => (
//                   <div
//                     key={index}
//                     className="border-navy-600 overflow-hidden rounded-lg border shadow-lg transition-transform hover:scale-[1.02]"
//                   >
//                     <Image
//                       src={image}
//                       alt={`${project.title} - Gallery image ${index + 1}`}
//                       width={600}
//                       height={400}
//                       className="aspect-video w-full object-cover"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProjectDetail;
