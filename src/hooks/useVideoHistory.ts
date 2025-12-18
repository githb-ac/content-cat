"use client";

import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import type { GeneratedVideo } from "@/components/video";

export function useVideoHistory() {
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [showResults, setShowResults] = useState(false);

  // Fetch videos from database
  const fetchVideos = useCallback(async () => {
    try {
      const response = await fetch("/api/videos");
      if (response.ok) {
        const videos = await response.json();
        setGeneratedVideos(videos);
        if (videos.length > 0) {
          setShowResults(true);
        }
      }
    } catch {
      // Silently fail - videos will show empty state
    } finally {
      setIsLoadingVideos(false);
    }
  }, []);

  // Fetch videos on mount
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Add a new video to the list
  const addVideo = useCallback((video: GeneratedVideo) => {
    setGeneratedVideos((prev) => [video, ...prev]);
  }, []);

  // Handle video deletion
  const handleDeleteVideo = useCallback(
    async (id: string) => {
      // Optimistic update
      setGeneratedVideos((prev) => prev.filter((v) => v.id !== id));

      try {
        const response = await fetch(`/api/videos/${id}`, { method: "DELETE" });
        if (!response.ok) {
          toast.error("Failed to delete video");
          fetchVideos(); // Revert on error
        }
      } catch {
        toast.error("Failed to delete video");
        fetchVideos(); // Revert on error
      }
    },
    [fetchVideos]
  );

  // Handle video download
  const handleDownloadVideo = useCallback(
    async (url: string, prompt: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          toast.error("Failed to download video");
          return;
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${prompt.slice(0, 30).replace(/[^a-z0-9]/gi, "_")}_${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch {
        toast.error("Failed to download video");
      }
    },
    []
  );

  // Copy prompt to clipboard
  const handleCopyPrompt = useCallback((prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard");
  }, []);

  return {
    // State
    generatedVideos,
    isLoadingVideos,
    showResults,
    hasVideos: generatedVideos.length > 0,

    // Actions
    setShowResults,
    addVideo,
    fetchVideos,
    handleDeleteVideo,
    handleDownloadVideo,
    handleCopyPrompt,
  };
}
