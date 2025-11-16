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
  prompt: `You are an AI system that executes the BMAD (Business Method Architecture and Design) 'dev-story' workflow.
Your task is to take a user's description and generate the final BMAD code.
You MUST follow the BMAD method precisely.

The user's description is:
"{{{description}}}"

Now, begin the '/bmad:bmm:workflows:dev-story' workflow.

**Step 1: Planning (Internal Monologue)**
- Deconstruct the user's request into core requirements.
- Identify the main objective and key actions.
- Determine the necessary BMAD components (e.g., Methods, Actions, Conditions, Loops).

**Step 2: Architecture & Design (Internal Monologue)**
- Design the overall structure of the BMAD method.
- Name the method appropriately.
- Define the sequence of actions within the BEGIN/END block.
- Specify parameters for each action.
- If conditionals or loops are needed, define their logic.

**Step 3: Code Generation (Final Output)**
- Based on your planning and design, write the complete and valid BMAD code.
- The code should be clean, readable, and directly implement the design from Step 2.
- Only output the final BMAD code in the 'code' field. Do not include your internal monologue (Steps 1 and 2) in the final output.
- Ensure the output is a single, complete BMAD code block.`,
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
