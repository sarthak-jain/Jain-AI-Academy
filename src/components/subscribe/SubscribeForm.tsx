"use client";

import { useState } from "react";

interface SubscribeFormProps {
  dark?: boolean;
}

export function SubscribeForm({ dark = false }: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`flex-1 px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#da373d] ${
            dark
              ? "bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-[#da373d] text-white text-sm font-medium rounded-lg hover:bg-[#c42f35] transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-2 text-sm ${
            status === "success"
              ? "text-green-400"
              : dark
                ? "text-red-400"
                : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
