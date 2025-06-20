// src/components/ai/PersonalizedPromptsForm.tsx
"use client";

import { useActionState, useOptimistic, useRef, useEffect, type FormEvent } from 'react';
import { useFormStatus } from 'react-dom';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Send, ThumbsUp, AlertCircle, CheckCircle2 } from 'lucide-react';
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
      Get Personalized Prompts
    </Button>
  );
}

export function PersonalizedPromptsForm() {
  const [state, formAction] = useActionState(getPersonalizedPromptsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && state.timestamp) { // Check timestamp to avoid re-triggering on mount
      if (state.errors) {
        toast({
          variant: "destructive",
          title: "Input Error",
          description: state.message || "Please check your input.",
        });
      } else if (state.prompts && state.prompts.length > 0) {
         // No toast for success, prompts are displayed directly
      } else if (state.prompts && state.prompts.length === 0) {
        toast({
          title: "No Prompts Generated",
          description: "We couldn't generate prompts for your input. Try rephrasing.",
        });
      } else if (!state.errors && !state.prompts) {
        // This could be an error case from the backend not caught as 'errors'
         toast({
          variant: "destructive",
          title: "Something went wrong",
          description: state.message || "Could not generate prompts.",
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
          <CardTitle className="text-2xl font-headline text-primary">Personalized Action Prompts</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Share a bit about your current relationships (challenges, aspirations) to receive personalized, actionable suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} ref={formRef} className="space-y-6">
          <div>
            <Textarea
              id="relationshipContext"
              name="relationshipContext"
              placeholder="E.g., 'I struggle to connect deeply with new people in my church group.' or 'I want to mend a strained relationship with a family member.'"
              rows={5}
              className="border-border focus:ring-primary"
              aria-label="Describe your current relationship context"
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
            <AlertTitle className="font-headline text-accent">Actionable Suggestions</AlertTitle>
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
