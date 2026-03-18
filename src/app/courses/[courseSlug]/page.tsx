import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ModuleAccordion } from "@/components/courses/ModuleAccordion";
import { getCourseWithModules, getCourses } from "@/lib/content";

interface Props {
  params: Promise<{ courseSlug: string }>;
}

export async function generateStaticParams() {
  return getCourses().map((c) => ({ courseSlug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourseWithModules(courseSlug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseSlug } = await params;
  const course = getCourseWithModules(courseSlug);
  if (!course) notFound();

  const totalLessons = course.modules.reduce(
    (sum, m) => sum + m.lessons.length,
    0
  );

  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            {course.access === "free" && (
              <Badge variant="success">Free</Badge>
            )}
            {course.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {course.title}
          </h1>
          <p className="text-lg text-gray-600 mb-2">{course.description}</p>
          <p className="text-sm text-gray-400 mb-10">
            {course.modules.length} module{course.modules.length !== 1 ? "s" : ""} &middot;{" "}
            {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
          </p>
          <div className="space-y-3">
            {course.modules.map((mod, i) => (
              <ModuleAccordion
                key={mod.slug}
                module={mod}
                courseSlug={course.slug}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
