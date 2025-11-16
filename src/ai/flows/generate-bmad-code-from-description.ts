'use server';

/**
 * @fileOverview BMAD Code Generator AI agent.
 *
 * - generateBMADCodeFromDescription - A function that generates BMAD code from a plain text description.
 * - GenerateBMADCodeFromDescriptionInput - The input type for the generateBMADCodeFromDescription function.
 * - GenerateBMADCodeFromDescriptionOutput - The return type for the generateBMADCodeFromDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBMADCodeFromDescriptionInputSchema = z.object({
  description: z.string().describe('A plain text description of the desired BMAD method.'),
});

export type GenerateBMADCodeFromDescriptionInput = z.infer<typeof GenerateBMADCodeFromDescriptionInputSchema>;

const GenerateBMADCodeFromDescriptionOutputSchema = z.object({
  code: z.string().describe('The generated BMAD code.'),
});

export type GenerateBMADCodeFromDescriptionOutput = z.infer<typeof GenerateBMADCodeFromDescriptionOutputSchema>;

export async function generateBMADCodeFromDescription(
  input: GenerateBMADCodeFromDescriptionInput
): Promise<GenerateBMADCodeFromDescriptionOutput> {
  return generateBMADCodeFromDescriptionFlow(input);
}

const generateBMADCodeFromDescriptionPrompt = ai.definePrompt({
  name: 'generateBMADCodeFromDescriptionPrompt',
  input: {schema: GenerateBMADCodeFromDescriptionInputSchema},
  output: {schema: GenerateBMADCodeFromDescriptionOutputSchema},
  prompt: `You are an expert BMAD (Business Method Architecture and Design) developer.
  Your task is to generate BMAD code based on the user's description.

  Description: {{{description}}}

  Please provide the BMAD code that implements the described method. Adhere to BMAD conventions and best practices.
  Ensure the generated code is efficient, well-documented, and follows a clear and maintainable structure.`,
});

const generateBMADCodeFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateBMADCodeFromDescriptionFlow',
    inputSchema: GenerateBMADCodeFromDescriptionInputSchema,
    outputSchema: GenerateBMADCodeFromDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateBMADCodeFromDescriptionPrompt(input);
    return output!;
  }
);
