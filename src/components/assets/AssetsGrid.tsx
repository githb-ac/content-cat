"use client";

import type { AssetTab } from "./AssetsSidebar";

const ImageIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="text-zinc-600"
  >
    <path
      d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
      fill="currentColor"
    />
  </svg>
);

const UploadIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    className="text-zinc-600"
  >
    <path
      d="M12 16V3M12 3L7 8M12 3L17 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 15V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface AssetsGridProps {
  activeTab: AssetTab;
  searchQuery: string;
}

export default function AssetsGrid({ activeTab, searchQuery: _searchQuery }: AssetsGridProps) {
  const title = activeTab === "generated" ? "Generated assets" : "Uploaded assets";

  return (
    <section className="relative grid grid-rows-[auto_1fr] gap-4 min-h-0 flex-1">
      {/* Header */}
      <header className="h-8">
        <h1 className="text-left text-xs font-bold font-heading truncate h-full leading-8">
          {title}
        </h1>
      </header>

      {/* Grid Container */}
      <div className="relative w-full h-full border border-zinc-800 border-b-0 bg-zinc-900 min-h-0 p-4 pb-20 overflow-y-auto rounded-t-[1.25rem] select-none">
        {/* Empty state */}
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="grid h-32 w-52 items-center justify-center rounded-xl bg-zinc-800/50">
              {activeTab === "generated" ? <ImageIcon /> : <UploadIcon />}
            </div>
            <h2 className="font-heading text-center text-2xl font-bold text-white uppercase">
              Nothing Here Yet
            </h2>
            <p className="text-center text-sm text-gray-400">
              {activeTab === "generated"
                ? "Generate images or videos to see them here"
                : "Upload files to see them here"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
