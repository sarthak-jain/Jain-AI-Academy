import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CourseSidebar } from "@/components/courses/CourseSidebar";
import { getLesson, getCourseWithModules, getAllLessonPaths } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";

interface Props {
  params: Promise<{ courseSlug: string; moduleSlug: string; lessonSlug: string }>;
}

export async function generateStaticParams() {
  return getAllLessonPaths();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug, moduleSlug, lessonSlug } = await params;
  const lesson = getLesson(courseSlug, moduleSlug, lessonSlug);
  if (!lesson) return {};
  return {
    title: lesson.frontmatter.title,
    description: lesson.frontmatter.description,
  };
}

function getAdjacentLessons(
  courseSlug: string,
  moduleSlug: string,
  lessonSlug: string
) {
  const paths = getAllLessonPaths();
  const currentIndex = paths.findIndex(
    (p) =>
      p.courseSlug === courseSlug &&
      p.moduleSlug === moduleSlug &&
      p.lessonSlug === lessonSlug
  );
  return {
    prev: currentIndex > 0 ? paths[currentIndex - 1] : null,
    next: currentIndex < paths.length - 1 ? paths[currentIndex + 1] : null,
  };
}

export default async function LessonPage({ params }: Props) {
  const { courseSlug, moduleSlug, lessonSlug } = await params;
  const lesson = getLesson(courseSlug, moduleSlug, lessonSlug);
  if (!lesson) notFound();

  const course = getCourseWithModules(courseSlug);
  if (!course) notFound();

  const content = await renderMDX(lesson.content);
  const { prev, next } = getAdjacentLessons(courseSlug, moduleSlug, lessonSlug);

  return (
    <section className="py-10">
      <Container>
        <div className="flex gap-10">
          <CourseSidebar
            course={course}
            currentModuleSlug={moduleSlug}
            currentLessonSlug={lessonSlug}
          />
          <article className="flex-1 min-w-0">
            <div className="mb-6">
              <Link
                href={`/courses/${courseSlug}`}
                className="text-sm text-[#da373d] hover:underline"
              >
                &larr; {course.title}
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {lesson.frontmatter.title}
            </h1>
            {lesson.frontmatter.duration && (
              <p className="text-sm text-gray-400 mb-8">
                {lesson.frontmatter.duration}
              </p>
            )}
            <div className="prose prose-gray max-w-none prose-headings:font-semibold prose-a:text-[#da373d] prose-code:before:content-none prose-code:after:content-none">
              {content}
            </div>
            <nav className="mt-12 pt-8 border-t border-gray-200 flex justify-between">
              {prev ? (
                <Link
                  href={`/courses/${prev.courseSlug}/${prev.moduleSlug}/${prev.lessonSlug}`}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  &larr; Previous
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/courses/${next.courseSlug}/${next.moduleSlug}/${next.lessonSlug}`}
                  className="text-sm text-[#da373d] hover:underline"
                >
                  Next &rarr;
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>
      </Container>
    </section>
  );
}
