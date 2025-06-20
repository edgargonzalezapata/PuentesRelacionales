// src/app/actions.ts
'use server';

import { generatePersonalizedActionPrompts, type PersonalizedActionPromptsInput } from '@/ai/flows/personalized-action-prompts';
import { z } from 'zod';

const personalizedPromptsSchema = z.object({
  relationshipContext: z.string().min(20, { message: "Please provide more details (at least 20 characters) about your relationships for better suggestions." }),
});

export interface PersonalizedPromptsState {
  message?: string | null;
  errors?: {
    relationshipContext?: string[];
  } | null;
  prompts?: string[] | null;
  timestamp?: number;
}

export async function getPersonalizedPromptsAction(
  prevState: PersonalizedPromptsState,
  formData: FormData
): Promise<PersonalizedPromptsState> {
  const validatedFields = personalizedPromptsSchema.safeParse({
    relationshipContext: formData.get('relationshipContext'),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      prompts: null,
      timestamp: Date.now(),
    };
  }

  try {
    const input: PersonalizedActionPromptsInput = {
      relationshipContext: validatedFields.data.relationshipContext,
    };
    const result = await generatePersonalizedActionPrompts(input);
    return {
      message: "Here are your personalized action prompts:",
      prompts: result.actionPrompts,
      errors: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error generating prompts:", error);
    return {
      message: "An unexpected error occurred while generating prompts. Please try again later.",
      prompts: null,
      errors: null,
      timestamp: Date.now(),
    };
  }
}
