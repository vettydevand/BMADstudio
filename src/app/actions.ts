"use server";

import { generateBMADCodeFromDescription } from "@/ai/flows/generate-bmad-code-from-description";

export async function generateCodeAction(
  description: string
): Promise<{ code?: string; error?: string }> {
  if (!description || description.trim().length < 10) {
    return { error: "Description must be at least 10 characters long." };
  }

  try {
    const result = await generateBMADCodeFromDescription({ description });
    if (result && result.code) {
      return { code: result.code };
    }
    return { error: "Failed to get a valid response from the AI." };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { error: "An unexpected error occurred while generating code." };
  }
}
