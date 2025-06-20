// src/app/actions.ts
'use server';

import { generatePersonalizedActionPrompts, type PersonalizedActionPromptsInput } from '@/ai/flows/personalized-action-prompts';
import { z } from 'zod';

const personalizedPromptsSchema = z.object({
  relationshipContext: z.string().min(20, { message: "Por favor, proporciona más detalles (al menos 20 caracteres) sobre tus relaciones para obtener mejores sugerencias." }),
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
      message: "La validación falló. Por favor, revisa tu entrada.",
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
      message: "Aquí tienes tus sugerencias de acción personalizadas:",
      prompts: result.actionPrompts,
      errors: null,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error generating prompts:", error);
    return {
      message: "Ocurrió un error inesperado al generar las sugerencias. Por favor, inténtalo de nuevo más tarde.",
      prompts: null,
      errors: null,
      timestamp: Date.now(),
    };
  }
}
