/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import { Loader2, Youtube } from "lucide-react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import EditorToolbar from "./EditorToolbar";
import Image from "next/image";

// Helper function to extract YouTube video ID
const extractYouTubeID = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

// Extended YouTube URL extraction that handles more formats
const getYouTubeVideoId = (url: string): string | null => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

interface GitHubStyleMarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  autoFocus?: boolean;
}

export default function GitHubStyleMarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content using Markdown...",
  height = "400px",
  autoFocus = false,
}: GitHubStyleMarkdownEditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const dragOverlayRef = useRef<HTMLDivElement>(null);

  // Set up auto-resize for textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const resizeTextarea = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.max(textarea.scrollHeight, parseInt(height))}px`;
    };

    resizeTextarea();

    // Watch for window resize events
    window.addEventListener("resize", resizeTextarea);
    return () => window.removeEventListener("resize", resizeTextarea);
  }, [value, height]);

  // Apply autofocus if requested
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  // Handle fullscreen mode
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isFullscreen]);

  // Set up drag and drop events
  useEffect(() => {
    const editorContainer = editorContainerRef.current;
    const dragOverlay = dragOverlayRef.current;

    if (!editorContainer || !dragOverlay) return;

    const showOverlay = () => {
      dragOverlay.classList.remove("hidden");
      dragOverlay.classList.add("flex");
      setTimeout(() => {
        dragOverlay.style.opacity = "1";
      }, 10);
    };

    const hideOverlay = () => {
      dragOverlay.style.opacity = "0";
      setTimeout(() => {
        dragOverlay.classList.add("hidden");
        dragOverlay.classList.remove("flex");
      }, 300);
    };

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      showOverlay();
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      hideOverlay();
    };

    // Add drag event listeners
    editorContainer.addEventListener("dragenter", handleDragEnter);
    dragOverlay.addEventListener("dragleave", handleDragLeave);
    dragOverlay.addEventListener("dragend", handleDragLeave);

    return () => {
      editorContainer.removeEventListener("dragenter", handleDragEnter);
      dragOverlay.removeEventListener("dragleave", handleDragLeave);
      dragOverlay.removeEventListener("dragend", handleDragLeave);
    };
  }, []);

  // Editor toolbar action handlers
  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = `${value.substring(0, start)}${before}${selectedText}${after}${value.substring(end)}`;

    onChange(newText);

    // Set cursor position after update
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const wrapSelectedText = (prefix: string, suffix = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) {
      // No selection, just insert the prefix+suffix and place cursor in the middle
      insertText(prefix, suffix);

      // Position cursor between prefix and suffix
      setTimeout(() => {
        const newPosition = start + prefix.length;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    } else {
      // Wrap selected text
      insertText(prefix, suffix);
    }
  };

  // Toolbar action handlers
  const handleBold = () => wrapSelectedText("**", "**");
  const handleItalic = () => wrapSelectedText("_", "_");
  const handleStrikethrough = () => wrapSelectedText("~~", "~~");
  const handleLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText) {
      // If text is selected, wrap it in link syntax
      wrapSelectedText("[", "](url)");
    } else {
      // Otherwise insert a link template
      insertText("[Link text](url)");

      // Select "url" for easy replacement
      setTimeout(() => {
        const urlStart = start + selectedText.length + 3;
        textarea.setSelectionRange(urlStart, urlStart + 3);
      }, 0);
    }
  };

  const handleQuote = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText.includes("\n")) {
      // Multi-line selection: add > to each line
      const quoted = selectedText
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n");

      const newValue =
        value.substring(0, start) + quoted + value.substring(end);
      onChange(newValue);
    } else {
      // Single line: just add > prefix
      insertText("> ", "");
    }
  };

  const handleCode = () => wrapSelectedText("`", "`");

  const handleCodeBlock = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText) {
      // If there's selected text, wrap it in code block
      wrapSelectedText("```\n", "\n```");
    } else {
      // Otherwise insert an empty code block and position cursor inside
      insertText("```\n", "\n```");

      // Position cursor inside the code block
      setTimeout(() => {
        const newPosition = start + 4;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 0);
    }
  };

  const handleBulletList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText.includes("\n")) {
      // Multi-line selection: add - to each line
      const listItems = selectedText
        .split("\n")
        .map((line) => `- ${line}`)
        .join("\n");

      const newValue =
        value.substring(0, start) + listItems + value.substring(end);
      onChange(newValue);
    } else if (selectedText) {
      // Single line with text: convert to list item
      insertText("- ", "");
    } else {
      // No selection: insert bullet point
      insertText("- ", "");
    }
  };

  const handleNumberList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText.includes("\n")) {
      // Multi-line selection: add numbers to each line
      const lines = selectedText.split("\n");
      const listItems = lines
        .map((line, index) => `${index + 1}. ${line}`)
        .join("\n");

      const newValue =
        value.substring(0, start) + listItems + value.substring(end);
      onChange(newValue);
    } else {
      // No selection or single line: insert a single numbered item
      insertText("1. ", "");
    }
  };

  const handleTaskList = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    if (selectedText.includes("\n")) {
      // Multi-line selection: add task checkboxes to each line
      const taskItems = selectedText
        .split("\n")
        .map((line) => `- [ ] ${line}`)
        .join("\n");

      const newValue =
        value.substring(0, start) + taskItems + value.substring(end);
      onChange(newValue);
    } else {
      // No selection or single line: insert a single task item
      insertText("- [ ] ", "");
    }
  };

  const handleDivider = () => insertText("\n\n---\n\n");

  const handleHeading = (level: number) => {
    const prefix = "#".repeat(level) + " ";
    insertText(prefix, "");
  };

  const handleTogglePreview = () => setIsPreviewVisible(!isPreviewVisible);

  const handleToggleFullscreen = () => setIsFullscreen(!isFullscreen);

  // YouTube video handler
  const handleYouTubeVideo = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Prompt for YouTube URL
    const youtubeUrl = prompt("Enter YouTube video URL:");
    if (!youtubeUrl) return;

    const videoId = extractYouTubeID(youtubeUrl);
    if (!videoId) {
      alert("Invalid YouTube URL. Please enter a valid YouTube video URL.");
      return;
    }

    // Create YouTube embed code
    const embedCode = `<youtube-embed id="${videoId}"></youtube-embed>`;

    // Insert at cursor position
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue =
      value.substring(0, start) + embedCode + value.substring(end);
    onChange(newValue);

    // Move cursor after the inserted content
    setTimeout(() => {
      const newPosition = start + embedCode.length;
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  // Handle media uploads
  const handleMediaUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadProgress(0);

      // Create FormData and append file
      const formData = new FormData();
      formData.append("file", file);

      // Upload to your API endpoint
      const response = await fetch("/api/upload/markdown-image", {
        method: "POST",
        body: formData,
        // Add upload progress tracking if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            errorData.details ||
            errorData.error ||
            `Failed to upload file: ${response.status} ${response.statusText}`,
        );
      }

      // Get the URL from the response
      const data = await response.json();
      const fileUrl = data.url;

      // Insert appropriate markdown based on file type
      const isVideo = file.type.startsWith("video/");
      let markdownToInsert;

      if (isVideo) {
        markdownToInsert = `<video src="${fileUrl}" controls></video>`;
      } else {
        // Create a descriptive alt text by removing extension from filename
        const altText = file.name.replace(/\.[^/.]+$/, "");
        markdownToInsert = `![${altText}](${fileUrl})`;
      }

      // Insert at cursor position
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue =
          value.substring(0, start) + markdownToInsert + value.substring(end);
        onChange(newValue);

        // Move cursor after the inserted content
        setTimeout(() => {
          const newPosition = start + markdownToInsert.length;
          textarea.focus();
          textarea.setSelectionRange(newPosition, newPosition);
        }, 0);
      }

      setUploadProgress(100);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  // Handle file drop
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          await handleMediaUpload(file);
        }
      }
    }

    // Hide overlay after drop
    if (dragOverlayRef.current) {
      dragOverlayRef.current.style.opacity = "0";
      setTimeout(() => {
        if (dragOverlayRef.current) {
          dragOverlayRef.current.classList.add("hidden");
          dragOverlayRef.current.classList.remove("flex");
        }
      }, 300);
    }
  };

  // Handle paste for images and videos
  const handlePaste = async (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (
        items[i].type.indexOf("image") === 0 ||
        items[i].type.indexOf("video") === 0
      ) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) {
          await handleMediaUpload(file);
          return; // Stop after handling one media file
        }
      }
    }
  };

  // Handle pasted or typed YouTube links
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // Regular change handler
    onChange(newValue);

    // Check if YouTube URLs were just added and process them
    if (newValue !== value) {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Create a temporary div to help with regex detection
      const tempDiv = document.createElement("div");
      tempDiv.textContent = newValue;

      // Find YouTube URLs in the content
      const youtubeRegex =
        /(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}(?:\S*)?)/g;

      const matches = [...newValue.matchAll(youtubeRegex)];

      // If we found YouTube URLs and they aren't already inside a markdown link or embed tag
      if (matches.length > 0) {
        // Implementation is simplified here - in a real implementation,
        // you'd want to check surrounding text to ensure the URL isn't already
        // within a markdown link or embed tag before converting it

        // For now, we'll just log detection of YouTube URLs to the console
        console.log(
          "YouTube URLs detected:",
          matches.map((m) => m[0]),
        );
      }
    }
  };

  return (
    <div
      ref={editorContainerRef}
      className={`border-navy-600 bg-navy-800 relative overflow-hidden rounded-lg border transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-0" : ""
      }`}
    >
      {/* Editor Toolbar */}
      <EditorToolbar
        onBold={handleBold}
        onItalic={handleItalic}
        onStrikethrough={handleStrikethrough}
        onLink={handleLink}
        onQuote={handleQuote}
        onCode={handleCode}
        onCodeBlock={handleCodeBlock}
        onBulletList={handleBulletList}
        onNumberList={handleNumberList}
        onTaskList={handleTaskList}
        onDivider={handleDivider}
        onHeading={handleHeading}
        onMediaUpload={handleMediaUpload}
        onYouTubeVideo={handleYouTubeVideo}
        onTogglePreview={handleTogglePreview}
        onToggleFullscreen={handleToggleFullscreen}
        isPreviewVisible={isPreviewVisible}
        isFullscreen={isFullscreen}
      />

      {/* Editor Content */}
      <div
        className={`flex ${
          isFullscreen
            ? "h-[calc(100vh-48px)]"
            : height
              ? `h-[${height}]`
              : "min-h-[300px]"
        } ${isSplitView ? "flex-row" : "flex-col"}`}
      >
        {/* Markdown Input */}
        <div
          className={`relative flex-1 overflow-auto ${
            isPreviewVisible && isSplitView
              ? "w-1/2"
              : isPreviewVisible
                ? "hidden"
                : "w-full"
          }`}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleInput}
            onPaste={handlePaste}
            onDrop={handleDrop}
            placeholder={placeholder}
            className="bg-navy-800 h-full min-h-full w-full resize-none border-0 p-4 font-mono text-sm leading-relaxed text-gray-200 outline-none"
            style={{
              height: isFullscreen ? "calc(100vh - 48px)" : height || "300px",
            }}
          />
        </div>

        {/* Preview Panel */}
        {isPreviewVisible && (
          <div
            className={`bg-navy-700 border-navy-600 markdown-body overflow-auto p-4 ${
              isSplitView ? "w-1/2 border-l" : "w-full"
            }`}
            style={{
              height: isFullscreen ? "calc(100vh - 48px)" : height || "300px",
            }}
          >
            <MarkdownPreview
              source={value}
              wrapperElement={{ "data-color-mode": "dark" }}
              components={{
                img: ({  ...props }: any) => (
                  <div className="my-4">
                    <Image
                      {...props}
                      width={800}
                      height={600}
                      className="h-auto max-w-full rounded-md shadow-lg"
                      loading="lazy"
                      alt={props.alt || "Image"}
                    />
                  </div>
                ),
                video: ({ ...props }: any) => (
                  <div className="my-4">
                    <video
                      {...props}
                      className="h-auto max-w-full rounded-md shadow-lg"
                      controls
                    />
                  </div>
                ),
                a: ({  children, href, ...props }: any) => {
                  // Check if it's a YouTube URL
                  const videoId = getYouTubeVideoId(href);
                  if (videoId) {
                    return (
                      <div className="border-navy-600 bg-navy-700/60 hover:bg-navy-700 my-4 flex cursor-pointer overflow-hidden rounded-lg border transition-all">
                        <div className="relative aspect-video w-full max-w-[200px] flex-shrink-0 overflow-hidden">
                          <img
                            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                            alt={
                              typeof children === "string"
                                ? children
                                : "YouTube video"
                            }
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg">
                              <Youtube className="h-5 w-5" />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-grow flex-col justify-center p-4">
                          <h3 className="line-clamp-2 text-lg font-medium">
                            {typeof children === "string"
                              ? children
                              : "YouTube Video"}
                          </h3>
                          <p className="mt-2 text-sm text-gray-400">
                            YouTube video will play in published view
                          </p>
                        </div>
                      </div>
                    );
                  }

                  // Regular link
                  return (
                    <a
                      href={href}
                      {...props}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  );
                },
              }}
            />
          </div>
        )}
      </div>

      {/* Upload progress indicator */}
      {uploading && (
        <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-center bg-black/30 p-2">
          <div className="bg-navy-800 flex items-center space-x-2 rounded p-2">
            <Loader2 className="text-neon h-4 w-4 animate-spin" />
            <div className="bg-navy-600 relative h-2 w-40 overflow-hidden rounded-full">
              <div
                className="bg-neon absolute top-0 left-0 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-300">Uploading media...</span>
          </div>
        </div>
      )}

      {/* Drag & drop overlay */}
      <div
        ref={dragOverlayRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-neon bg-navy-800/90 absolute inset-0 z-20 hidden items-center justify-center rounded-lg border-2 border-dashed text-center opacity-0 transition-opacity duration-300"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-neon mx-auto mb-2 h-12 w-12"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-neon text-lg font-medium">Drop to upload</p>
          <p className="mt-1 text-sm text-gray-300">
            Images and videos supported
          </p>
        </div>
      </div>
    </div>
  );
}
