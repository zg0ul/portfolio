/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { TechStack } from "@/components/projects/TechStack";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { TableOfContents } from "@/components/projects/TableOfContents";
import ScrollToHashHandler from "@/components/ScrollToHashHandler";
import { Metadata } from "next";
import { CategoryWithIcon } from "@/components/ProjectCategories";
import { ExternalLink, Check } from "lucide-react";
import { SiGithub } from "react-icons/si";
import React from "react";
import YouTubeEmbed from "@/components/ui/YoutubeEmbed";
import { configureMdx } from "@/lib/markdown/mdx-config";
import getYouTubeVideoId from "@/utils/GetYoutubeVideoById";
import PrismLoader from "@/utils/prism-loader";
import { H1, H2, H3, H4, H5, H6 } from "@/components/projects/ClientHeadings";

// Custom components for MDX
const components = {
  // Enhanced table styling
  table: (props: any) => (
    <div className="border-navy-600 my-6 overflow-x-auto rounded-lg border shadow-md">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-navy-700" {...props} />,
  th: (props: any) => (
    <th
      className="border-navy-600 border-b p-3 text-left font-semibold text-gray-200"
      {...props}
    />
  ),
  td: (props: any) => (
    <td className="border-navy-600 border-t p-3 text-gray-300" {...props} />
  ),
  tr: (props: any) => (
    <tr className="hover:bg-navy-700/50 transition-colors" {...props} />
  ),

  // Enhanced code blocks with better styling
  pre: (props: any) => {
    const custom =
      "border-navy-600 bg-navy-800/80 my-6 overflow-x-auto rounded-lg border p-4 text-sm shadow-lg";
    const classes = [props.className, custom].filter(Boolean).join(" ");
    return <pre className={classes} {...props} />;
  },
  code: (props: any) => {
    // Check if it's an inline code block
    const isInline = !props.className;
    return isInline ? (
      <code
        className="bg-navy-700/70 text-neon rounded px-1.5 py-0.5 font-mono"
        {...props}
      />
    ) : (
      <code className={`${props.className || ""} font-mono`} {...props} />
    );
  },

  // Enhanced checkbox lists
  li: (props: any) => {
    // Check if this is a task list item
    if (props.className?.includes("task-list-item")) {
      return (
        <li className="my-1 flex items-start gap-2" {...props}>
          {props.children}
        </li>
      );
    }
    return <li className="my-1" {...props} />;
  },

  input: (props: any) => {
    // Style checkbox inputs for task lists
    if (props.type === "checkbox") {
      return (
        <span
          className={`inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border ${props.checked ? "border-neon bg-neon/20 text-neon" : "bg-navy-700 border-gray-600"} mt-0.5`}
        >
          {props.checked && <Check className="h-3.5 w-3.5" />}
        </span>
      );
    }
    return <input {...props} />;
  },

  // Enhanced blockquotes
  blockquote: (props: any) => (
    <blockquote
      className="border-neon/30 bg-navy-800/50 my-6 border-l-4 py-2 pl-4 text-gray-300 italic"
      {...props}
    />
  ),

  // Horizontal rule
  hr: (props: any) => (
    <hr className="border-navy-600 my-8 border-t" {...props} />
  ),

  // Process paragraphs to detect YouTube links
  p: (props: any) => {
    // Check if paragraph contains only a YouTube link
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

    return <p className="my-4 text-gray-300" {...props} />;
  },

  // Enhance links
  a: (props: any) => {
    // Check if paragraph contains only a YouTube link
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
        className="text-neon hover:text-neon-4 transition-colors hover:underline"
        target={props.href.startsWith("http") ? "_blank" : undefined}
        rel={props.href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  },

  // Use client components for headings with click handling
  h1: (props: any) => <H1 {...props} />,
  h2: (props: any) => <H2 {...props} />,
  h3: (props: any) => <H3 {...props} />,
  h4: (props: any) => <H4 {...props} />,
  h5: (props: any) => <H5 {...props} />,
  h6: (props: any) => <H6 {...props} />,

  // Enhance images
  img: (props: any) => (
    <div className="my-6">
      <Image
        width={500}
        height={500}
        className="h-auto max-w-full rounded-lg shadow-lg"
        loading="lazy"
        alt={"Image"}
        {...props}
      />
    </div>
  ),

  // Enhance unordered lists
  ul: (props: any) => {
    // Check if this is a task list
    if (props.className?.includes("contains-task-list")) {
      return <ul className="my-4 space-y-2 pl-1" {...props} />;
    }
    return <ul className="my-4 list-disc space-y-2 pl-6" {...props} />;
  },

  // Enhance ordered lists
  ol: (props: any) => (
    <ol className="my-4 list-decimal space-y-2 pl-6" {...props} />
  ),
};

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slugParams = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slugParams.slug)
    .single();

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.short_description,
    openGraph: {
      images: [{ url: project.featured_image }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();
  const { slug } = await params;

  // Fetch the current project
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) {
    notFound();
  }

  // Fetch other projects for navigation
  // Appear at the bottom of a project's detail page
  const { data: otherProjects } = await supabase
    .from("projects")
    .select("id, title, slug, featured_image")
    .neq("id", project.id)
    .limit(2);

  return (
    <main className="topPageMargin relative container min-h-screen">
      {/* Handle direct navigation to sections via URL hash */}
      <ScrollToHashHandler />

      {/* Hero Section */}
      <div className="relative h-[50vh] w-full md:h-[70vh]">
        <div className="relative h-full w-full">
          <Image
            src={project.featured_image}
            alt={project.title}
            fill
            className="border-navy-400 overflow-clip rounded-xl border-2 object-cover"
            priority
          />
          {/* Gradient overlay - darkens bottom more than top for better text contrast */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
        </div>

        <div className="text-shadow-xl absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="border-navy-600 bg-navy-800/70 mb-6 inline-flex items-center rounded-full border px-4 py-2 backdrop-blur-sm">
              <CategoryWithIcon categoryId={project.category} />
            </div>

            <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
              {project.title}
            </h1>
            <p className="mb-6 max-w-2xl text-lg text-white/90 md:text-xl">
              {project.short_description}
            </p>
            <div className="flex flex-wrap gap-4">
              {/* Buttons for GitHub and Live Demo */}
              {project.github_url && (
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-navy-600 bg-navy-800/70 hover:border-neon/40 hover:bg-navy-800/90 hover:text-neon border-navy-600 bg-navy-700/50 flex items-center gap-2 rounded-lg border px-6 py-3 font-medium backdrop-blur-sm transition-all"
                >
                  <SiGithub className="h-5 w-5 transition-transform group-hover:scale-110" />
                  View Code
                </Link>
              )}
              {project.live_url && (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="from-neon to-neon-4 hover:from-neon-4 hover:to-neon group text-navy-900 flex items-center gap-2 rounded-full bg-gradient-to-r px-6 py-3 font-medium transition-all"
                >
                  <ExternalLink className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Live Demo
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Main content - Scrollable */}
          <div className="lg:flex-grow">
            <div className="mdx-container scrollbar-thin scrollbar-thumb-navy-600 scrollbar-track-navy-900 relative pr-4">
              <section className="mb-16">
                <h2 className="mb-6 text-3xl font-bold">About this project</h2>
                <div className="mdx-content">
                  {configureMdx(project.long_description, components)}
                </div>
              </section>

              {/* Only show gallery if there are images */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <section className="mb-16">
                  <h2 className="mb-6 text-3xl font-bold">Project Gallery</h2>
                  <ProjectGallery
                    images={project.gallery_images}
                    alt={project.title}
                  />
                </section>
              )}
            </div>
          </div>

          {/* Sidebar - Fixed */}
          <div className="lg:w-1/3 lg:max-w-xs">
            {/* Project details card */}
            <div className="border-navy-600 bg-navy-800/50 mb-6 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold">Tech Stack</h3>
              <TechStack technologies={project.technologies} />

              <div className="border-navy-600 my-6 border-t"></div>

              <h3 className="mb-4 text-xl font-bold">Project Details</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-400">Category</dt>
                  <dd className="mt-1 font-medium">
                    <CategoryWithIcon categoryId={project.category} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400">Timeline</dt>
                  <dd className="mt-1 font-medium">
                    {project.start_date ? (
                      <>
                        {new Date(project.start_date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                          },
                        )}
                        {" - "}
                        {project.end_date
                          ? new Date(project.end_date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                              },
                            )
                          : "Present"}
                      </>
                    ) : (
                      new Date(project.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Table of Contents - Fixed position */}
            <div className="sticky top-8 hidden lg:block">
              <TableOfContents content={project.long_description} />
            </div>

            {/* Mobile TOC - Only appears on smaller screens - floating */}
            <div className="mobile-toc-container fixed right-6 bottom-6 z-50 lg:hidden">
              <TableOfContents content={project.long_description} />
            </div>
          </div>
        </div>

        {/* Project Navigation - Outside the scrollable content */}
        {otherProjects && otherProjects.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-8 text-3xl font-bold">Other Projects</h2>
            <ProjectNavigation projects={otherProjects} />
          </section>
        )}

        <PrismLoader />
      </div>
    </main>
  );
}
