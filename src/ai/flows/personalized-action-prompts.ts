// src/ai/flows/personalized-action-prompts.ts
'use server';
/**
 * @fileOverview Provides personalized action prompts for relationship improvement based on user input.
 *
 * - generatePersonalizedActionPrompts - A function that generates personalized action prompts.
 * - PersonalizedActionPromptsInput - The input type for the generatePersonalizedActionPrompts function.
 * - PersonalizedActionPromptsOutput - The return type for the generatePersonalizedActionPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedActionPromptsInputSchema = z.object({
  relationshipContext: z
    .string()
    .describe(
      'A description of the user’s current relationships, including challenges and aspirations.'
    ),
});
export type PersonalizedActionPromptsInput = z.infer<
  typeof PersonalizedActionPromptsInputSchema
>;

const PersonalizedActionPromptsOutputSchema = z.object({
  actionPrompts: z
    .array(z.string())
    .describe(
      'A list of personalized and actionable suggestions for improving relationships.'
    ),
});
export type PersonalizedActionPromptsOutput = z.infer<
  typeof PersonalizedActionPromptsOutputSchema
>;

export async function generatePersonalizedActionPrompts(
  input: PersonalizedActionPromptsInput
): Promise<PersonalizedActionPromptsOutput> {
  return personalizedActionPromptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedActionPromptsPrompt',
  input: {schema: PersonalizedActionPromptsInputSchema},
  output: {schema: PersonalizedActionPromptsOutputSchema},
  prompt: `Based on the following description of my current relationships, please provide 3 actionable suggestions for improving my relationships, focusing on building stronger connections and applying the principles of relational discipleship:

{{{relationshipContext}}}

Suggestions:
`,
});

const personalizedActionPromptsFlow = ai.defineFlow(
  {
    name: 'personalizedActionPromptsFlow',
    inputSchema: PersonalizedActionPromptsInputSchema,
    outputSchema: PersonalizedActionPromptsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
