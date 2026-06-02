"use client";

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";

type ChangePosterModalProps = {
  movie: LibraryMovie;
  onClose: () => void;
};

export function ChangePosterModal({ movie, onClose }: ChangePosterModalProps) {
  const updateMovie = useMovieStore((state) => state.updateMovie);
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setPreviewUrl(dataUrl);
      setUrlInput("");
      setIsUploading(false);
    };
    reader.onerror = () => {
      setError("Failed to read file.");
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setError("Please enter a URL or upload an image.");
      return;
    }

    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      setError("Please enter a valid URL (http:// or https://).");
      return;
    }

    setPreviewUrl(trimmed);
    setUrlInput(trimmed);
    setError(null);
  };

  const handleSave = () => {
    if (!previewUrl) {
      setError("Please select an image or enter a URL first.");
      return;
    }

    updateMovie(movie.id, {
      posterUrl: previewUrl,
    });

    onClose();
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setUrlInput("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const currentPoster = previewUrl ?? movie.posterUrl;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-poster-title"
    >
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close change poster"
        onClick={onClose}
      />

      <div className="relative flex max-h-[90dvh] w-full max-w-md flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-2xl">
        <header className="flex shrink-0 items-center justify-between border-b border-border/60 px-5 py-4">
          <h2 id="change-poster-title" className="text-lg font-semibold tracking-tight">
            Change Poster
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="space-y-6">
            {currentPoster ? (
              <div className="relative mx-auto w-48">
                <img
                  src={currentPoster}
                  alt={movie.displayTitle}
                  className="aspect-[2/3] w-full rounded-lg border border-border/70 object-cover"
                />
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs hover:bg-destructive/90"
                  aria-label="Clear poster"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <div className="mx-auto flex aspect-[2/3] w-48 items-center justify-center rounded-lg border border-dashed border-border/50 text-sm text-muted-foreground">
                No poster
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="poster-url-input">Poster URL</Label>
              <div className="flex gap-2">
                <input
                  id="poster-url-input"
                  type="url"
                  placeholder="https://example.com/poster.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="h-10 flex-1 rounded-md border border-input bg-background/80 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleUrlSubmit}
                >
                  Preview
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="poster-file-input"
                />
                <label
                  htmlFor="poster-file-input"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-input bg-background/80 px-4 py-2 text-sm hover:bg-accent/50"
                >
                  <Upload className="h-4 w-4" aria-hidden />
                  {isUploading ? "Uploading..." : "Choose Image File"}
                </label>
              </div>
            </div>

            {error && (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
          </div>
        </div>

        <footer className="flex shrink-0 justify-end gap-2 border-t border-border/60 px-5 py-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Poster
          </Button>
        </footer>
      </div>
    </div>
  );
}
