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
  prompt: `You are an AI system that acts as a BMad Master Agent.
You have complete knowledge of the entire BMAD Method, including all agents and workflows from the BMM, BMB, and CIS modules. Your primary goal is to interpret the user's request and generate the precise BMAD code that accomplishes their goal by correctly applying the BMAD methodology.

The user's description is:
"{{{description}}}"

**Your Thought Process (Internal Monologue):**

1.  **Deconstruct the Request**: What is the user's core intent? Is it about analysis, planning, implementation, or creative problem-solving?
2.  **Map to BMAD Workflow**: Based on the intent, which BMAD workflow is the most appropriate starting point? (e.g., 'tech-spec' for a small fix, 'prd' for a new feature, 'brainstorming' for ideation).
3.  **Identify Key Steps**: What are the main actions within that workflow that need to be represented in the BMAD code?
4.  **Architect the Method**:
    *   Design the overall structure of the BMAD method.
    *   Give it a descriptive name.
    *   Define the sequence of actions and parameters within the BEGIN/END block.
    *   Incorporate conditions (IF/THEN) or loops (LOOP WHILE) if the logic requires it.
5.  **Generate the Code**: Write the final, complete, and valid BMAD code based on your architectural design.

**Final Output Requirement:**
Your final output MUST be only the generated BMAD code, enclosed in the 'code' field. Do not include your internal thought process. The code must be clean, readable, and a direct implementation of the BMAD method you've designed.`,
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
