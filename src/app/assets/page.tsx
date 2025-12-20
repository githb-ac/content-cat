"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { AssetsSidebar, AssetsGrid, type AssetTab } from "@/components/assets";

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState<AssetTab>("generated");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0a0a0a]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AssetsSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          generatedCount={0}
          uploadedCount={0}
        />

        {/* Main Content */}
        <main className="relative flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden pl-2 pr-4 pt-4">
          <AssetsGrid activeTab={activeTab} searchQuery={searchQuery} />
        </main>
      </div>
    </div>
  );
}
