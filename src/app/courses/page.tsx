import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/courses/CourseCard";
import { getCourses } from "@/lib/content";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse all AI courses available at Jain AI Academy.",
};

export default function CoursesPage() {
  const courses = getCourses().filter((c) => c.status === "published");

  return (
    <section className="py-16">
      <Container>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Courses</h1>
        <p className="text-gray-600 mb-10">
          Explore our structured AI courses, from fundamentals to advanced topics.
        </p>
        {courses.length === 0 ? (
          <p className="text-gray-500">Courses coming soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
