"use server";

import { generateBMADCodeFromDescription } from "@/ai/flows/generate-bmad-code-from-description";
import { configureGenkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

interface GenerateCodeActionParams {
  description: string;
  apiKey?: string;
}

export async function generateCodeAction({
  description,
  apiKey,
}: GenerateCodeActionParams): Promise<{ code?: string; error?: string }> {
  if (!description || description.trim().length < 10) {
    return { error: "Description must be at least 10 characters long." };
  }

  if (!apiKey) {
    return { error: "Google AI API Key is required. Please set it in the Settings tab." };
  }

  try {
    // Configure Genkit on the fly with the provided API key
    configureGenkit({
      plugins: [
        googleAI({
          apiKey: apiKey,
        }),
      ],
    });

    const result = await generateBMADCodeFromDescription({ description });
    if (result && result.code) {
      return { code: result.code };
    }
    return { error: "Failed to get a valid response from the AI." };
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    const errorMessage = error.message || "An unexpected error occurred.";
    if (errorMessage.includes("API key not valid")) {
      return { error: "The provided API key is not valid. Please check and try again." };
    }
    return { error: `An unexpected error occurred: ${errorMessage}` };
  }
}
