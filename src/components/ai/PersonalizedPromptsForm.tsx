// src/components/ai/PersonalizedPromptsForm.tsx
"use client";

import { useActionState, useEffect, useRef, type FormEvent } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getPersonalizedPromptsAction, type PersonalizedPromptsState } from '@/app/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const initialState: PersonalizedPromptsState = {
  message: null,
  errors: null,
  prompts: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Obtener Sugerencias Personalizadas
    </Button>
  );
}

export function PersonalizedPromptsForm() {
  const [state, formAction] = useActionState(getPersonalizedPromptsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && state.timestamp) { 
      if (state.errors) {
        toast({
          variant: "destructive",
          title: "Error en la Entrada",
          description: state.message || "Por favor, revisa tu entrada.",
        });
      } else if (state.prompts && state.prompts.length > 0) {
         // No toast for success, prompts are displayed directly
      } else if (state.prompts && state.prompts.length === 0) {
        toast({
          title: "No se Generaron Sugerencias",
          description: "No pudimos generar sugerencias para tu entrada. Intenta reformular.",
        });
      } else if (!state.errors && !state.prompts) {
         toast({
          variant: "destructive",
          title: "Algo salió mal",
          description: state.message || "No se pudieron generar las sugerencias.",
        });
      }
    }
  }, [state, toast]);

  useEffect(() => {
    if (state?.prompts && state.prompts.length > 0 && formRef.current) {
      formRef.current.reset();
    }
  }, [state?.prompts]);

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Lightbulb className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl font-headline text-primary">Sugerencias de Acción Personalizadas</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Comparte un poco sobre tus relaciones actuales (desafíos, aspiraciones) para recibir sugerencias personalizadas y prácticas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} ref={formRef} className="space-y-6">
          <div>
            <Textarea
              id="relationshipContext"
              name="relationshipContext"
              placeholder="Ej: 'Me cuesta conectar profundamente con gente nueva en mi grupo de la iglesia.' o 'Quiero reparar una relación tensa con un familiar.'"
              rows={5}
              className="border-border focus:ring-primary"
              aria-label="Describe tu contexto relacional actual"
            />
            {state?.errors?.relationshipContext && (
              <p className="text-sm text-destructive mt-1">
                {state.errors.relationshipContext.join(', ')}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>
      </CardContent>

      {state?.message && !state.errors && state.prompts && state.prompts.length > 0 && (
        <CardFooter className="flex-col items-start gap-4 pt-6">
          <Alert variant="default" className="bg-accent/20 border-accent">
             <CheckCircle2 className="h-5 w-5 text-accent" />
            <AlertTitle className="font-headline text-accent">Sugerencias Prácticas</AlertTitle>
            <AlertDescription>
              <ul className="list-disc list-inside space-y-2 mt-2 text-accent-foreground/90">
                {state.prompts.map((prompt, index) => (
                  <li key={index}>{prompt}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </CardFooter>
      )}
      {state?.message && state.errors && (
         <CardFooter className="pt-6">
            <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
         </CardFooter>
      )}
    </Card>
  );
}
