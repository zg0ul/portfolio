"use client";

import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Code, Upload, Loader2 } from "lucide-react";
import "@/styles/markdown-editor.css";

// Import MDEditor dynamically to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="border-navy-600 bg-navy-700/50 h-[400px] w-full animate-pulse rounded-lg border"></div>
  ),
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string | number;
}

export default function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your markdown content here...",
  height = 400,
}: MarkdownEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Function to handle markdown changes
  const handleChange = useCallback(
    (value: string | undefined) => {
      onChange(value || "");
    },
    [onChange],
  );

  // Function to handle image uploads
  const handleImageUpload = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);

        // Create form data
        const formData = new FormData();
        formData.append("file", file);

        // Upload the image
        const response = await fetch("/api/upload/content-image", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Image upload failed");
        }

        const { url } = await response.json();

        // Get cursor position
        const textArea = document.querySelector(
          ".w-md-editor-text-input",
        ) as HTMLTextAreaElement;
        if (!textArea) return;

        const cursorPos = textArea.selectionStart;
        const textBefore = value.substring(0, cursorPos);
        const textAfter = value.substring(cursorPos, value.length);

        // Insert image markdown at cursor position
        const filename = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        const imageMarkdown = `\n![${filename}](${url})\n`;

        // Update the markdown content
        onChange(textBefore + imageMarkdown + textAfter);
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    },
    [value, onChange],
  );

  // Custom toolbar components including image upload
  const extraCommands = [
    {
      name: "upload-image",
      keyCommand: "upload-image",
      buttonProps: { "aria-label": "Upload image" },
      icon: (
        <div className="relative">
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <label className="cursor-pointer">
              <Upload className="h-4 w-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                  // Reset the input
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
      ),
      execute: () => {
        // This is handled by the input onChange
      },
    },
  ];

  return (
    <div className="markdown-editor w-full">
      {/* Set data-color-mode to dark to match your theme */}
      <div data-color-mode="dark">
        <MDEditor
          value={value}
          onChange={handleChange}
          preview="edit"
          height={height}
          textareaProps={{
            placeholder: placeholder,
            style: {
              color: "#f0ebd8", // Using your foreground color
            },
          }}
          previewOptions={{
            rehypePlugins: [],
            remarkPlugins: [],
          }}
          // Don't reference commands.getCommands() directly
          extraCommands={extraCommands}
        />
      </div>

      <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Code className="h-3.5 w-3.5" />
            <span>Markdown formatting supported</span>
          </span>
          <span className="flex items-center gap-1">
            <span>Upload images inline</span>
          </span>
        </div>
        <div>{value.length} characters</div>
      </div>
    </div>
  );
}
