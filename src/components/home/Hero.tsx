import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            Learn AI,{" "}
            <span className="text-[#da373d]">step by step.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
            Structured courses that take you from fundamentals to real-world
            applications. Clear explanations, hands-on projects, and no
            prerequisites beyond curiosity.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/courses" size="lg">
              Browse Courses
            </Button>
            <Button href="/subscribe" variant="outline" size="lg">
              Get Updates
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
