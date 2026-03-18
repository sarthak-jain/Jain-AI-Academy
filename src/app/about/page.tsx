import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.author.name} and ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <section className="py-16">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About {siteConfig.name}
          </h1>
          <div className="prose prose-gray max-w-none">
            <p>
              {siteConfig.name} was created to make artificial intelligence
              education accessible, structured, and practical. Whether
              you&apos;re a complete beginner or an experienced developer
              looking to expand your skills, our courses are designed to meet
              you where you are.
            </p>
            <h2>The Instructor</h2>
            <p>{siteConfig.author.bio}</p>
            <h2>Our Approach</h2>
            <ul>
              <li>
                <strong>Structured learning</strong> &mdash; Courses are broken
                into modules and lessons that build on each other logically.
              </li>
              <li>
                <strong>Hands-on projects</strong> &mdash; Every concept comes
                with practical examples you can run and modify.
              </li>
              <li>
                <strong>Clear explanations</strong> &mdash; Complex topics
                explained in plain language, with visuals and code.
              </li>
              <li>
                <strong>Always free to start</strong> &mdash; Core content is
                free. Learn without barriers.
              </li>
            </ul>
            <h2>Connect</h2>
            <p>
              Find me on{" "}
              <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              ,{" "}
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              , and{" "}
              <a href={siteConfig.socials.twitter} target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
