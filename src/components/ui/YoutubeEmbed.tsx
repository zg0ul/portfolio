"use client";

import { useState, useEffect } from "react";
import { Play, Loader2, Youtube } from "lucide-react";
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
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    channelName: "",
    loading: true,
    error: false,
  });

  const [expanded, setExpanded] = useState(false);

  // Fetch video metadata (optional)
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        // We're using a fallback approach here without an API call
        // This will at least show the video thumbnail from YouTube's default URL pattern
        setMetadata((prev) => ({
          ...prev,
          loading: false,
        }));

        // If you want to fetch full metadata, implement an API endpoint and uncomment:
        /*
        const response = await fetch(`/api/youtube-metadata?videoId=${videoId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch video metadata');
        }
        
        const data = await response.json();
        
        setMetadata({
          title: data.title,
          channelName: data.channelName,
          thumbnail: data.thumbnail,
          loading: false,
          error: false
        });
        */
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

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // Render YouTube card or embed
  return (
    <div className="my-6">
      {!expanded ? (
        <div
          className="border-navy-600 group bg-navy-800/60 hover:bg-navy-700/80 relative flex cursor-pointer overflow-hidden rounded-lg border transition-all"
          onClick={() => setExpanded(true)}
        >
          {/* Thumbnail with play button overlay */}
          <div className="relative aspect-video w-full max-w-[320px] flex-shrink-0 overflow-hidden">
            {metadata.loading ? (
              <div className="bg-navy-800/60 absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <>
                <Image
                  width={500}
                  height={500}
                  src={metadata.thumbnail}
                  alt={metadata.title || "YouTube video"}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 pl-1" fill="white" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Video info */}
          <div className="flex flex-grow flex-col justify-center p-4">
            <div className="mb-2 flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium text-red-500">YouTube</span>
            </div>
            <h3 className="line-clamp-2 text-lg font-medium text-white">
              {metadata.title}
            </h3>
            {metadata.channelName && (
              <p className="mt-1 text-sm text-gray-400">
                {metadata.channelName}
              </p>
            )}
            <p className="mt-2 text-sm text-gray-400">Click to play video</p>
          </div>
        </div>
      ) : (
        <div className="border-navy-600 relative overflow-hidden rounded-lg border shadow-lg">
          <div className="relative aspect-video w-full">
            <iframe
              src={embedUrl}
              title={metadata.title || "YouTube video"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            ></iframe>
          </div>
          <div className="bg-navy-800 flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <Youtube className="h-4 w-4 text-red-500" />
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neon text-sm hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                Watch on YouTube
              </a>
            </div>
            <button
              className="text-sm text-gray-400 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
