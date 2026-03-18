import { Container } from "@/components/ui/Container";
import { SubscribeForm } from "@/components/subscribe/SubscribeForm";

export function SubscribeCTA() {
  return (
    <section className="py-16 bg-gray-900">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Stay Updated</h2>
          <p className="text-gray-300 mb-8">
            Get notified when new courses and lessons are published. No spam,
            unsubscribe anytime.
          </p>
          <SubscribeForm dark />
        </div>
      </Container>
    </section>
  );
}
