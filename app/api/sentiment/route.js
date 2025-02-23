import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

// ✅ Fix: Ensure API route is dynamically generated
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const { message } = await req.json(); // Get user message from request body
    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    console.log("Received message:", message);

    // ✅ Fix: Ensure Hugging Face API is reachable
    // const app = await Client.connect("https://lettria-customer-sentiment-analysis.hf.space/");
    // const result = await app.predict("/predict", [[message]]);


    const client = await Client.connect("Mouz-D/sentiment-analysis");
    const result = await client.predict("/predict", [[message]]);

    console.log("Hugging Face API Response:", result); // Debug API response

    return NextResponse.json({ success: true, sentiment: result.data?.[0] ?? "unknown" });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
