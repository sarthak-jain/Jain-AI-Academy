import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            {course.access === "free" && (
              <Badge variant="success">Free</Badge>
            )}
            {course.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {course.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
