"use client";

import { memo, useState, useEffect, useRef, useCallback } from "react";

// Shared chevron icon
const ChevronDownIcon = memo(function ChevronDownIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
});

// Option type for dropdowns
export interface DropdownOption {
  value: string;
  label: string;
  category?: string;
}

// DropdownBadge - For select options
interface DropdownBadgeProps {
  value: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  suffix?: string;
  showCategories?: boolean;
}

export const DropdownBadge = memo(function DropdownBadge({
  value,
  options,
  onSelect,
  suffix = "",
  showCategories = false,
}: DropdownBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find current option label
  const currentOption = options.find((opt) => opt.value === value);
  const displayLabel = currentOption?.label || value;

  // Click-outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onSelect(optionValue);
      setIsOpen(false);
    },
    [onSelect]
  );

  // Group options by category if showCategories is true
  const groupedOptions = showCategories
    ? options.reduce(
        (acc, opt) => {
          const category = opt.category || "Other";
          if (!acc[category]) acc[category] = [];
          acc[category].push(opt);
          return acc;
        },
        {} as Record<string, DropdownOption[]>
      )
    : null;

  return (
    <div className="nodrag relative" ref={containerRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[8px] text-white transition-colors hover:border-zinc-600 hover:bg-zinc-800"
      >
        {displayLabel}
        {suffix}
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div
          className="nowheel absolute top-full left-0 z-50 mt-1 max-h-48 min-w-20 overflow-y-auto rounded-md border border-zinc-700 bg-zinc-900 py-1 shadow-lg"
          onWheelCapture={(e) => e.stopPropagation()}
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(255,255,255,0.2) transparent",
          }}
        >
          {showCategories && groupedOptions ? (
            // Render with categories
            Object.entries(groupedOptions).map(([category, opts]) => (
              <div key={category}>
                <div className="px-2 py-1 text-[7px] font-medium tracking-wider text-zinc-500 uppercase">
                  {category}
                </div>
                {opts.map((option) => (
                  <button
                    key={option.value}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(option.value);
                    }}
                    className={`w-full px-2 py-1 text-left text-[9px] transition-colors hover:bg-zinc-800 ${
                      value === option.value
                        ? "bg-zinc-800 text-white"
                        : "text-gray-400"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ))
          ) : (
            // Render flat list
            options.map((option) => (
              <button
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(option.value);
                }}
                className={`w-full px-2 py-1 text-left text-[9px] transition-colors hover:bg-zinc-800 ${
                  value === option.value
                    ? "bg-zinc-800 text-white"
                    : "text-gray-400"
                }`}
              >
                {option.label}
                {suffix && ` ${suffix}`}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
});

// ToggleBadge - For boolean options (click to toggle)
interface ToggleBadgeProps {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}

export const ToggleBadge = memo(function ToggleBadge({
  label,
  enabled,
  onToggle,
}: ToggleBadgeProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`nodrag rounded-md border px-1.5 py-0.5 text-[8px] transition-colors ${
        enabled
          ? "border-cyan-700 bg-cyan-900/50 text-cyan-300 hover:border-cyan-600 hover:bg-cyan-900/70"
          : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-300"
      }`}
    >
      {label}
    </button>
  );
});

// InputBadge - For numeric inputs (VideoTrimNode start/end times)
interface InputBadgeProps {
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (value: number) => string;
}

export const InputBadge = memo(function InputBadge({
  value,
  onChange,
  prefix = "",
  suffix = "",
  min = 0,
  max = 9999,
  step = 0.1,
  formatValue,
}: InputBadgeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  // Format display value
  const displayValue = formatValue ? formatValue(value) : value.toString();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSubmit = useCallback(() => {
    const parsed = parseFloat(inputValue);
    if (!isNaN(parsed)) {
      const clamped = Math.min(max, Math.max(min, parsed));
      onChange(clamped);
    }
    setIsEditing(false);
  }, [inputValue, min, max, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSubmit();
      } else if (e.key === "Escape") {
        setInputValue(value.toString());
        setIsEditing(false);
      }
    },
    [handleSubmit, value]
  );

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
        min={min}
        max={max}
        step={step}
        className="nodrag w-12 rounded-md border border-zinc-600 bg-zinc-900 px-1 py-0.5 text-[8px] text-white outline-none focus:ring-1 focus:ring-white/50"
        onClick={(e) => e.stopPropagation()}
      />
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setInputValue(value.toString());
        setIsEditing(true);
      }}
      className="nodrag rounded-md border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[8px] text-white transition-colors hover:border-zinc-600 hover:bg-zinc-800"
    >
      {prefix}
      {displayValue}
      {suffix}
    </button>
  );
});

// StaticBadge - For display-only badges (like aspect ratio)
interface StaticBadgeProps {
  label: string;
}

export const StaticBadge = memo(function StaticBadge({
  label,
}: StaticBadgeProps) {
  return (
    <span className="rounded-md border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[8px] text-white">
      {label}
    </span>
  );
});
