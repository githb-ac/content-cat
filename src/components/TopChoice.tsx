"use client";

import Link from "next/link";

interface ToolCard {
  title: string;
  description: string;
  image: string;
  imageAfter: string;
  href: string;
  badge?: {
    text: string;
    variant: "unlimited" | "pro" | "new";
  };
}

const toolCards: ToolCard[] = [
  {
    title: "Sharpen Image",
    description: "Transform blurry photos into crisp images",
    image: "/images/sharpen-before.jpg",
    imageAfter: "/images/sharpen-after.jpg",
    href: "/tools/sharpen",
  },
  {
    title: "Upscale",
    description: "Enhance resolution up to 8x",
    image: "/images/upscale-after.jpg",
    imageAfter: "/images/upscale-before.jpg",
    href: "/tools/upscale",
    badge: { text: "PRO", variant: "pro" },
  },
  {
    title: "Background Remix",
    description: "Transform any background instantly",
    image: "/images/bg-remix-before.jpg",
    imageAfter: "/images/bg-remix-after.jpg",
    href: "/tools/background-remix",
  },
  {
    title: "Color Grade",
    description: "Professional cinematic color correction",
    image: "/images/color-before.jpg",
    imageAfter: "/images/color-after.jpg",
    href: "/tools/color-grade",
  },
  {
    title: "Portrait Enhance",
    description: "Turn selfies into professional portraits",
    image: "/images/portrait-before.jpg",
    imageAfter: "/images/portrait-after.jpg",
    href: "/tools/portrait-enhance",
    badge: { text: "NEW", variant: "new" },
  },
  {
    title: "Lighting Fix",
    description: "Fix poorly lit photos with AI",
    image: "/images/lighting-before.jpg",
    imageAfter: "/images/lighting-after.jpg",
    href: "/tools/lighting-fix",
  },
  {
    title: "Product Photo",
    description: "Create stunning product ad shots",
    image: "/images/product-before.jpg",
    imageAfter: "/images/product-after.jpg",
    href: "/tools/product-photo",
    badge: { text: "PRO", variant: "pro" },
  },
  {
    title: "Style Transfer",
    description: "Apply artistic styles to any image",
    image: "/images/style-before.jpg",
    imageAfter: "/images/style-after.jpg",
    href: "/tools/style-transfer",
  },
];

const badgeStyles = {
  unlimited: "bg-purple-600",
  pro: "bg-green-600",
  new: "bg-zinc-600",
};

export default function TopChoice() {
  return (
    <section className="mt-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl text-white">QUICK TOOLS</h2>
          <p className="text-sm text-zinc-300">
            Powerful AI enhancements at your fingertips
          </p>
        </div>
        <Link
          href="/tools"
          className="flex items-center gap-2 text-sm text-white transition-colors duration-300 hover:text-pink-400"
        >
          See all
          <span>→</span>
        </Link>
      </div>
      <div className="hide-scrollbar flex gap-4 overflow-x-auto pb-2">
        {toolCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group h-56 w-[17%] min-w-[160px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-black/50"
          >
            <div className="relative h-40 w-full overflow-hidden bg-black/20">
              {/* Before image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.image}
                alt={`${card.title} before`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* After image with right-to-left gradient fade reveal on hover */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.imageAfter}
                alt={`${card.title} after`}
                className="absolute inset-0 h-full w-full object-cover transition-[mask-position] duration-700 ease-out [mask-image:linear-gradient(to_left,black_0%,black_60%,transparent_100%)] [mask-position:100%_0] [mask-repeat:no-repeat] [mask-size:200%_100%] group-hover:[mask-position:-50%_0]"
              />
              {card.badge && (
                <span
                  className={`${badgeStyles[card.badge.variant]} absolute left-3 top-3 z-10 rounded px-2 py-0.5 text-[10px] font-medium text-white`}
                >
                  {card.badge.text}
                </span>
              )}
            </div>
            <div className="flex h-16 items-start justify-between gap-2 p-3">
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-base font-medium text-white transition-colors duration-300 group-hover:text-pink-400">
                  {card.title}
                </h4>
                <p className="truncate text-xs text-zinc-300">
                  {card.description}
                </p>
              </div>
              <span className="flex-shrink-0 text-lg text-zinc-300">→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
