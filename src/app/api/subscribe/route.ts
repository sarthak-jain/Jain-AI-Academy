import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fileSubscriberStore } from "@/lib/subscribers";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const result = await fileSubscriberStore.add(parsed.data.email);

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 409 });
    }

    return NextResponse.json({ message: result.message });
  } catch {
    return NextResponse.json(
      { message: "Invalid request." },
      { status: 400 }
    );
  }
}
