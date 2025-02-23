import { NextResponse } from "next/server";
import { Client } from "@gradio/client";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
      const { lastUserMessage } = await req.json();

      if (!lastUserMessage) {
          return Response.json(
              { success: false, error: "No message provided." },
              { status: 400 }
          );
      }

      const client = await Client.connect("Qwen/Qwen2.5-Max-Demo");

      const result = await client.predict("/model_chat_1", {
          query: lastUserMessage,
          system: "You are a helpful AI assistant. Based on the last user message, generate exactly three smart replies in a JSON array without any Markdown formatting."
      });

      console.log("Raw AI Response:", result.data);

      let smartReplies = result.data?.[1]?.[0]?.[1];

      if (typeof smartReplies === "string") {
          try {
              // ✅ Remove Markdown code block (```json)
              smartReplies = smartReplies.replace(/```json|```/g, "").trim();

              // ✅ Convert the string into an actual array
              smartReplies = JSON.parse(smartReplies);
          } catch (error) {
              console.warn("Failed to parse AI response as JSON. Cleaning manually.");

              smartReplies = smartReplies
                  .replace(/^\[|\]$/g, "") // Remove leading/trailing brackets
                  .split("\n") // Split by new lines
                  .map(reply => reply.replace(/^"|"$/g, "").trim()) // Remove quotes
                  .filter(reply => reply.length > 0); // Remove empty strings
          }
      }

      if (!Array.isArray(smartReplies) || smartReplies.length < 3) {
          smartReplies = [
              "Can I assist you with anything else?",
              "Would you like to know more details?",
              "Do you have any follow-up questions?"
          ];
      }

      console.log("Formatted Smart Replies:", smartReplies);

      return Response.json({
          success: true,
          smartReplies
      });

  } catch (error) {
      console.error("API Error:", error);
      return Response.json(
          { success: false, error: error.message },
          { status: 500 }
      );
  }
}



