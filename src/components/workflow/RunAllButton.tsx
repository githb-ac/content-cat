"use client";

import { memo } from "react";

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const LoadingSpinner = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="animate-spin"
  >
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);

interface RunAllButtonProps {
  onRunAll: () => void;
  isExecuting: boolean;
  executingCount?: number;
}

const RunAllButton = memo(function RunAllButton({
  onRunAll,
  isExecuting,
  executingCount = 0,
}: RunAllButtonProps) {
  return (
    <div className="absolute bottom-4 left-4 z-10">
      <button
        onClick={onRunAll}
        disabled={isExecuting}
        className="btn-primary"
      >
        {isExecuting ? (
          <>
            <LoadingSpinner />
            <span>
              Running{executingCount > 0 ? ` (${executingCount})` : "..."}
            </span>
          </>
        ) : (
          <>
            <PlayIcon />
            <span>Run All</span>
          </>
        )}
      </button>
    </div>
  );
});

export default RunAllButton;
