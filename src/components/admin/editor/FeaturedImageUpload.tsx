"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FeaturedImageUploadProps {
  value: string;
  error?: string;
  onChange: (url: string) => void;
}

export default function FeaturedImageUpload({
  value,
  error,
  onChange,
}: FeaturedImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const response = await fetch("/api/upload/content-image", {
        method: "POST",
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const { url } = await response.json();
      onChange(url);
      setImagePreview(url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange("");
    setImagePreview(null);
  };

  return (
    <div className="bg-navy-800/50 border-navy-600 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
      <h3 className="text-foreground mb-4 text-lg font-semibold">
        Featured Image <span className="text-red-500">*</span>
      </h3>

      {value || imagePreview ? (
        <div className="space-y-4">
          <div className="border-navy-600 relative aspect-video overflow-hidden rounded-lg border">
            <Image
              src={imagePreview || value}
              alt="Featured image preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemoveImage}
            disabled={isUploading}
            className="border-navy-600 bg-navy-700/50 w-full hover:border-red-500 hover:bg-red-900/20 hover:text-red-400"
          >
            <X className="mr-2 h-4 w-4" />
            Remove Image
          </Button>
        </div>
      ) : (
        <label
          className={`cursor-pointer ${isUploading ? "pointer-events-none" : ""}`}
        >
          <div className="border-navy-600 hover:border-neon/50 rounded-lg border-2 border-dashed p-8 text-center transition-colors">
            {isUploading ? (
              <>
                <Loader2 className="text-neon mx-auto mb-4 h-12 w-12 animate-spin" />
                <p className="text-navy-300 mb-2">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="text-navy-400 mx-auto mb-4 h-12 w-12" />
                <p className="text-navy-300 mb-2">Click to upload image</p>
                <p className="text-navy-400 text-xs">
                  PNG, JPG, WebP up to 5MB
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}

      {error && (
        <p className="mt-2 flex items-center text-sm text-red-400">
          <AlertCircle className="mr-1 h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
