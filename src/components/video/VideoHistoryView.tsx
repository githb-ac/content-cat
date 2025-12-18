"use client";

import { VideoGridSkeleton, VideoResultCard } from "./index";
import { VideoIcon } from "./icons";
import type { GeneratedVideo } from "./types";

interface VideoHistoryViewProps {
  videos: GeneratedVideo[];
  isLoading: boolean;
  pendingCount: number;
  onRerun: (video: GeneratedVideo) => void;
  onDelete: (id: string) => void;
  onDownload: (url: string, prompt: string) => void;
  onCopy: (prompt: string) => void;
  onAttachImages: (imageUrl?: string) => void;
}

export default function VideoHistoryView({
  videos,
  isLoading,
  pendingCount,
  onRerun,
  onDelete,
  onDownload,
  onCopy,
  onAttachImages,
}: VideoHistoryViewProps) {
  return (
    <div className="animate-in fade-in duration-200">
      <div className="hide-scrollbar flex-1 overflow-y-auto">
        <ul className="space-y-0">
          {/* Skeleton loaders while loading from database */}
          {isLoading && <VideoGridSkeleton count={3} />}

          {/* Skeleton loaders while generating new videos */}
          {!isLoading && pendingCount > 0 && (
            <VideoGridSkeleton count={pendingCount} />
          )}

          {/* Generated videos */}
          {!isLoading &&
            videos.map((video) => (
              <VideoResultCard
                key={video.id}
                video={video}
                onRerun={() => onRerun(video)}
                onDelete={() => onDelete(video.id)}
                onDownload={() => onDownload(video.url, video.prompt)}
                onCopy={() => onCopy(video.prompt)}
                onAttachImages={onAttachImages}
              />
            ))}

          {/* Empty state if no videos and not loading */}
          {!isLoading && videos.length === 0 && pendingCount === 0 && (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50">
              <div className="text-zinc-600">
                <VideoIcon />
              </div>
              <p className="mt-3 text-sm text-zinc-500">No videos yet</p>
              <p className="text-xs text-zinc-600">
                Generate your first video to get started
              </p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
