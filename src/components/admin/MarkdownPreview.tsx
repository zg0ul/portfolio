import { useEffect, useState } from "react";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Loader2, Youtube } from "lucide-react";

// Dynamically import the markdown preview
const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    ),
  },
);

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Simple YouTube thumbnail component
const YouTubeThumbnail = ({
  videoId,
  title = "YouTube video",
}: {
  videoId: string;
  title?: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className="border-navy-600 bg-navy-700/50 my-4 aspect-video w-full overflow-hidden rounded-lg border">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div
      className="border-navy-600 bg-navy-700/60 hover:bg-navy-700 my-4 flex cursor-pointer overflow-hidden rounded-lg border transition-all"
      onClick={() => setExpanded(true)}
    >
      <div className="relative aspect-video w-full max-w-[200px] flex-shrink-0 overflow-hidden">
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110">
            <Youtube className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-col justify-center p-4">
        <h3 className="line-clamp-2 text-lg font-medium">{title}</h3>
        <p className="mt-2 text-sm text-gray-400">
          Click to play video from YouTube
        </p>
      </div>
    </div>
  );
};

export default function MarkdownContent({
  content,
  className = "",
}: MarkdownContentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Custom components for the markdown preview
  const components = {
    img: ({ node, ...props }: any) => (
      <div className="my-4">
        <img
          {...props}
          className="h-auto max-w-full rounded-md shadow-lg"
          loading="lazy"
          alt={props.alt || "Image"}
        />
      </div>
    ),
    video: ({ node, ...props }: any) => (
      <div className="my-4">
        <video
          {...props}
          className="h-auto max-w-full rounded-md shadow-lg"
          controls
        />
      </div>
    ),
    a: ({ node, children, href, ...props }: any) => {
      // Check if it's a YouTube URL
      const videoId = getYouTubeVideoId(href);
      if (videoId) {
        return (
          <YouTubeThumbnail
            videoId={videoId}
            title={typeof children === "string" ? children : "YouTube video"}
          />
        );
      }

      // Regular link
      return (
        <a href={href} {...props} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  };

  return (
    <div className={`markdown-body ${className}`}>
      <MarkdownPreview
        source={content}
        wrapperElement={{
          "data-color-mode": "dark",
        }}
        components={components}
      />
    </div>
  );
}
