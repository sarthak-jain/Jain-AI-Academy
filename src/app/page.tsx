import { Hero } from "@/components/home/Hero";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { InstructorBio } from "@/components/home/InstructorBio";
import { SubscribeCTA } from "@/components/home/SubscribeCTA";
import { getCourses } from "@/lib/content";

export default function Home() {
  const courses = getCourses().filter((c) => c.featured);

  return (
    <>
      <Hero />
      <FeaturedCourses courses={courses} />
      <InstructorBio />
      <SubscribeCTA />
    </>
  );
}
