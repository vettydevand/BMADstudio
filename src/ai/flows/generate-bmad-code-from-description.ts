'use server';

/**
 * @fileOverview BMAD Code Generator AI agent. This agent acts as a BMad Master Agent,
 * understanding the BMAD Method and generating appropriate code from a user's description.
 *
 * - generateBMADCodeFromDescription - A function that generates BMAD code from a plain text description.
 * - GenerateBMADCodeFromDescriptionInput - The input type for the generateBMADCodeFromDescription function.
 * - GenerateBMADCodeFromDescriptionOutput - The return type for the generateBMADCodeFromDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBMADCodeFromDescriptionInputSchema = z.object({
  description: z
    .string()
    .describe('A plain text description of the desired BMAD method.'),
});

export type GenerateBMADCodeFromDescriptionInput = z.infer<
  typeof GenerateBMADCodeFromDescriptionInputSchema
>;

const GenerateBMADCodeFromDescriptionOutputSchema = z.object({
  code: z.string().describe('The generated BMAD code.'),
});

export type GenerateBMADCodeFromDescriptionOutput = z.infer<
  typeof GenerateBMADCodeFromDescriptionOutputSchema
>;

export async function generateBMADCodeFromDescription(
  input: GenerateBMADCodeFromDescriptionInput
): Promise<GenerateBMADCodeFromDescriptionOutput> {
  return generateBMADCodeFromDescriptionFlow(input);
}

const generateBMADCodeFromDescriptionPrompt = ai.definePrompt({
  name: 'generateBMADCodeFromDescriptionPrompt',
  input: { schema: GenerateBMADCodeFromDescriptionInputSchema },
  output: { schema: GenerateBMADCodeFromDescriptionOutputSchema },
  prompt: `You are an AI system that functions as a BMad Master Agent.
You have complete, expert-level knowledge of the entire BMAD Method, including all agents (PM, Analyst, Architect, DEV, SM, TEA, UX, Tech Writer) and workflows from the BMM, BMB, and CIS modules. Your primary goal is to interpret the user's request and generate the precise BMAD code that accomplishes their goal by correctly applying the BMAD methodology.

The user's description is:
"{{{description}}}"

**Your Thought Process (Internal Monologue):**

1.  **Deconstruct the Request**: What is the user's core intent? Is it about analysis, planning, implementation, creative problem-solving, or system building?
2.  **Map to BMAD Agent & Workflow**: Based on the intent, which BMAD agent is the primary actor? Which specific workflow should be initiated?
    *   *Example*: If the user says "I want to build a small feature to fix a bug," your mind should go to "This is a **Quick Flow** track project. The **PM agent** should run the **tech-spec** workflow."
    *   *Example*: If the user says "I need to plan out a new product," you should think, "This sounds like a **BMad Method** track project. The **PM agent** should run the **prd** workflow."
    *   *Example*: If the user says "Help me brainstorm ideas for my app," you should think, "This is a creative task. The **Brainstorming Coach (Carson)** from the **CIS module** is the right agent, and the workflow is **brainstorming**."
3.  **Architect the Method Code**:
    *   Design the overall structure of the BMAD method.
    *   Give it a descriptive name (e.g., \`Method: CreateTechSpecForBugFix\`).
    *   Define the sequence of actions and parameters within the \`BEGIN\`/\`END\` block. The primary action should be invoking the correct agent and workflow.
    *   Incorporate conditions (\`IF\`/\`THEN\`) or loops (\`LOOP WHILE\`) only if the user's description requires complex logic. For most cases, a direct agent/workflow call is sufficient.
4.  **Generate the Code**: Write the final, complete, and valid BMAD code. It must be clean, readable, and a direct implementation of the BMAD method you've designed. It should look like a script that an expert BMAD user would write.

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
    const { output } = await generateBMADCodeFromDescriptionPrompt(input);
    return output!;
  }
);
