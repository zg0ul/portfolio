import React, { useState, useRef } from "react";
import { Image, Film, Upload, Loader2 } from "lucide-react";

interface MediaUploadButtonProps {
  onUpload: (file: File) => Promise<void>;
  showLabel?: boolean;
  className?: string;
}

export default function MediaUploadButton({
  onUpload,
  showLabel = false,
  className = "",
}: MediaUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsUploading(true);
      await onUpload(files[0]);
    } catch (error) {
      console.error("Error handling upload:", error);
    } finally {
      setIsUploading(false);
      // Clear input value to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={openFileDialog}
        disabled={isUploading}
        className={`flex items-center gap-2 rounded px-3 py-1.5 transition-colors ${
          hovered ? "bg-navy-600" : "hover:bg-navy-700"
        } ${isUploading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {isUploading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <div className="flex items-center">
            <Upload className="h-4 w-4" />
          </div>
        )}
        {showLabel && <span>Upload media</span>}
      </button>

      {/* File upload dropdown on hover */}
      {hovered && !isUploading && (
        <div className="bg-navy-600 absolute top-full left-0 z-10 mt-1 w-48 rounded-md shadow-lg">
          <div className="p-1">
            <button
              type="button"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.accept = "image/*";
                  fileInputRef.current.click();
                }
              }}
              className="hover:bg-navy-500 flex w-full items-center gap-2 rounded px-3 py-2 text-left"
            >
              <Image className="h-4 w-4" />
              <span>Upload image</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.accept = "video/*";
                  fileInputRef.current.click();
                }
              }}
              className="hover:bg-navy-500 flex w-full items-center gap-2 rounded px-3 py-2 text-left"
            >
              <Film className="h-4 w-4" />
              <span>Upload video</span>
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
