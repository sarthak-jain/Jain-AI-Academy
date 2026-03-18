import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SubscribeForm } from "@/components/subscribe/SubscribeForm";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Get notified when new AI courses and lessons are published.",
};

export default function SubscribePage() {
  return (
    <section className="py-20">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stay in the Loop
          </h1>
          <p className="text-gray-600 mb-8">
            Subscribe to get notified when new courses and lessons are
            published. No spam, unsubscribe anytime.
          </p>
          <SubscribeForm />
        </div>
      </Container>
    </section>
  );
}
