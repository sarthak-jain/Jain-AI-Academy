import { Container } from "@/components/ui/Container";
import { CourseCard } from "@/components/courses/CourseCard";
import type { Course } from "@/lib/types";

interface FeaturedCoursesProps {
  courses: Course[];
}

export function FeaturedCourses({ courses }: FeaturedCoursesProps) {
  if (courses.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Featured Courses
        </h2>
        <p className="text-gray-600 mb-8">
          Start your AI journey with these curated courses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </Container>
    </section>
  );
}
