"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { ModuleWithLessons } from "@/lib/types";

interface ModuleAccordionProps {
  module: ModuleWithLessons;
  courseSlug: string;
  defaultOpen?: boolean;
}

export function ModuleAccordion({
  module,
  courseSlug,
  defaultOpen = false,
}: ModuleAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div>
          <h3 className="font-semibold text-gray-900">{module.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {module.lessons.length} lesson{module.lessons.length !== 1 ? "s" : ""}
          </p>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <ul className="divide-y divide-gray-100">
          {module.lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Link
                href={`/courses/${courseSlug}/${module.slug}/${lesson.slug}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm text-gray-700">
                  {lesson.frontmatter.title}
                </span>
                <div className="flex items-center gap-2">
                  {lesson.frontmatter.duration && (
                    <span className="text-xs text-gray-400">
                      {lesson.frontmatter.duration}
                    </span>
                  )}
                  {lesson.frontmatter.access === "paid" && (
                    <Badge variant="accent">Pro</Badge>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
