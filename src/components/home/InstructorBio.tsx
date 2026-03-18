import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function InstructorBio() {
  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Instructor
          </h2>
          <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gray-500">
            {siteConfig.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            {siteConfig.author.name}
          </h3>
          <p className="mt-3 text-gray-600 leading-relaxed">
            {siteConfig.author.bio}
          </p>
        </div>
      </Container>
    </section>
  );
}
