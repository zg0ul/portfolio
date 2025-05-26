"use client";

import { useState, useEffect } from "react";
import { Play, Loader2, Youtube, X } from "lucide-react";
import Image from "next/image";

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

interface YouTubeMetadata {
  title: string;
  thumbnail: string;
  channelName: string;
  loading: boolean;
  error: boolean;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [metadata, setMetadata] = useState<YouTubeMetadata>({
    title: title || "YouTube Video",
    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    channelName: "",
    loading: true,
    error: false,
  });

  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fetch video metadata (optional)
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        // Using fallback approach without API call
        setMetadata((prev) => ({
          ...prev,
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching YouTube metadata:", error);
        setMetadata((prev) => ({
          ...prev,
          loading: false,
          error: true,
        }));
      }
    };

    fetchMetadata();
  }, [videoId]);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // Fallback to high quality thumbnail if maxres fails
  const thumbnailUrl = imageError
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : metadata.thumbnail;

  // Render YouTube card or embed
  return (
    <div className="not-prose my-8 w-full">
      {!expanded ? (
        <div className="group relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-600 hover:bg-gray-800/60 hover:shadow-xl">
          {/* Thumbnail Section */}
          <div className="relative aspect-video w-full overflow-hidden">
            {metadata.loading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <>
                <Image
                  width={1280}
                  height={720}
                  src={thumbnailUrl}
                  alt={metadata.title || "YouTube video thumbnail"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => setImageError(true)}
                  priority={false}
                />
                {/* Play Button Overlay */}
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/50"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpanded(true);
                  }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-500">
                    <Play className="ml-1 h-6 w-6" fill="white" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Video Info Section */}
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-500">YouTube</span>
            </div>

            <h3 className="mb-2 line-clamp-2 text-lg leading-tight font-semibold text-white">
              {metadata.title}
            </h3>

            {metadata.channelName && (
              <p className="mb-3 text-sm text-gray-400">
                {metadata.channelName}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setExpanded(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
              >
                <Play className="h-4 w-4" />
                Play Video
              </button>

              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 no-underline hover:text-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Youtube className="h-4 w-4" />
                <span className="max-w-[200px] truncate">Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
          {/* Video Embed */}
          <div className="relative aspect-video w-full">
            <iframe
              src={embedUrl}
              title={metadata.title || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          {/* Control Bar */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3">
            <div className="flex items-center gap-3">
              <Youtube className="h-4 w-4 text-red-500" />
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 no-underline hover:text-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="max-w-[150px] truncate">Watch on YouTube</span>
              </a>
            </div>

            <button
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
