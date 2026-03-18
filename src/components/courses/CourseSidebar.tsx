import Link from "next/link";
import type { CourseWithModules } from "@/lib/types";

interface CourseSidebarProps {
  course: CourseWithModules;
  currentModuleSlug: string;
  currentLessonSlug: string;
}

export function CourseSidebar({
  course,
  currentModuleSlug,
  currentLessonSlug,
}: CourseSidebarProps) {
  return (
    <nav className="w-64 shrink-0 hidden lg:block">
      <div className="sticky top-20">
        <Link
          href={`/courses/${course.slug}`}
          className="text-sm font-semibold text-gray-900 hover:text-[#da373d] transition-colors"
        >
          {course.title}
        </Link>
        <div className="mt-4 space-y-4">
          {course.modules.map((mod) => (
            <div key={mod.slug}>
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {mod.title}
              </h4>
              <ul className="space-y-1">
                {mod.lessons.map((lesson) => {
                  const isActive =
                    mod.slug === currentModuleSlug &&
                    lesson.slug === currentLessonSlug;
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/courses/${course.slug}/${mod.slug}/${lesson.slug}`}
                        className={`block text-sm py-1.5 px-3 rounded-md transition-colors ${
                          isActive
                            ? "bg-red-50 text-[#da373d] font-medium"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {lesson.frontmatter.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
