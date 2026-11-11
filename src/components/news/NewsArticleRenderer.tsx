import React from "react";
import Link from "next/link";
import { CheckCircle2, Info } from "lucide-react";

export interface TocHeading {
  id: string;
  text: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function extractTableOfContents(content: string[]): TocHeading[] {
  return content
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.slice(3).trim();
      return { id: slugifyHeading(text), text };
    });
}

export function estimateReadingMinutes(content: string[]): number {
  const words = content
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 220));
}

function renderInlineRichText(text: string): React.ReactNode[] {
  // Supports [label](/path) links and **bold** safely without dangerouslySetInnerHTML
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return (
          <Link
            key={idx}
            href={href}
            className="font-semibold text-[#007A4D] hover:text-[#005f3b] underline decoration-[#007A4D]/40 underline-offset-2"
          >
            {label}
          </Link>
        );
      }
      return (
        <a
          key={idx}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#007A4D] underline underline-offset-2"
        >
          {label}
        </a>
      );
    }

    const boldMatch = /^\*\*([^*]+)\*\*$/.exec(part);
    if (boldMatch) {
      return (
        <strong key={idx} className="font-bold text-[#102035]">
          {boldMatch[1]}
        </strong>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

type ContentBlock =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "paragraph"; text: string };

function parseContentBlocks(content: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: "list", items: [...listBuffer] });
      listBuffer = [];
    }
  };

  for (const raw of content) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2).trim());
      continue;
    }

    flushList();

    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      blocks.push({ type: "h2", id: slugifyHeading(text), text });
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
    } else if (line.startsWith("> ")) {
      blocks.push({ type: "callout", text: line.slice(2).trim() });
    } else {
      blocks.push({ type: "paragraph", text: line });
    }
  }

  flushList();
  return blocks;
}

export function NewsArticleRenderer({ content }: { content: string[] }) {
  const blocks = parseContentBlocks(content);

  return (
    <div className="space-y-4 sm:space-y-5 text-[#102035] leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              id={block.id}
              className="scroll-mt-28 pt-5 sm:pt-6 pb-2 border-b border-slate-200 text-xl sm:text-2xl font-black text-[#061B33] tracking-tight"
            >
              {block.text}
            </h2>
          );
        }

        if (block.type === "h3") {
          return (
            <h3
              key={index}
              className="pt-2 text-base sm:text-lg font-bold text-[#082B4A]"
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "list") {
          return (
            <ul
              key={index}
              className="bg-[#F6F9FB] border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-2.5 text-sm sm:text-[15px] text-slate-700"
            >
              {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#007A4D] shrink-0 mt-1" />
                  <span>{renderInlineRichText(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "callout") {
          return (
            <div
              key={index}
              className="rounded-2xl bg-emerald-50/80 border-l-4 border-[#007A4D] p-4 sm:p-5 flex items-start gap-3 text-sm text-[#061B33]"
            >
              <Info className="w-5 h-5 text-[#007A4D] shrink-0 mt-0.5" />
              <div className="leading-relaxed">{renderInlineRichText(block.text)}</div>
            </div>
          );
        }

        return (
          <p key={index} className="text-sm sm:text-[15px] text-slate-700 leading-7">
            {renderInlineRichText(block.text)}
          </p>
        );
      })}
    </div>
  );
}
