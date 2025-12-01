import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { type CompletionRequestBody } from "monacopilot";

export async function POST(request: NextRequest) {
  try {
    const body: CompletionRequestBody = await request.json();
    const { completionMetadata } = body;

    const {
      filename,
      language,
      cursorPosition,
      technologies,
      textAfterCursor,
      textBeforeCursor,
    } = completionMetadata;

    const client = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });

    const prompt = `
You are an AI code completion engine.

Filename: ${filename}
Language: ${language}
Framework: ${technologies?.join(", ") || "None"}
Context:
    --- Context Before Cursor ---
    ${textBeforeCursor}

    --- Cursor ---

    --- Context After Cursor ---
    ${textAfterCursor}

Cursor Position: line ${cursorPosition.lineNumber}, column ${
      cursorPosition.column
    }

Rules:
1. Return ONLY the code that should be inserted at cursor.
2. No markdown, no \`\`\`.
3. No explanation. Only the snippet.
4. Ensure the code is syntactically correct.
5. Maintain proper indentation and style
6. Make the suggestion contextually appropriate

Provide the best possible code completion based on the context provided.
`;
    const response = await client.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      messages: [
        {
          role: "system",
          content: "You are a code completion engine returning plain text.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_completion_tokens: 50,
    });

    let completion = response.choices[0].message.content || "";

    // Clean unwanted formatting
    completion = completion
      .replace(/```[\s\S]*?```/g, "")
      .replace(/```/g, "")
      .trim();

    return NextResponse.json(
      {
        completion, // REQUIRED BY MONACOPILOT
        stopReason: response.choices[0].finish_reason || "unknown",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("AI Completion Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
