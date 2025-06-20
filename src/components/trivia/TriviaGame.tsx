
// src/components/trivia/TriviaGame.tsx
"use client";

import { useState, type FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, RotateCcw, Puzzle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const triviaData: TriviaQuestion[] = [
  {
    id: 1,
    question: "¿Cuál fue uno de los propósitos principales por los que Jesús estableció a los doce discípulos, según Marcos 3:14?",
    options: ["Para que le ayudaran a construir un templo", "Para que estuviesen con él y para enviarlos a predicar", "Para que escribieran el Nuevo Testamento", "Para que organizaran grandes eventos"],
    correctAnswer: "Para que estuviesen con él y para enviarlos a predicar",
    explanation: "Correcto. Marcos 3:14 dice: 'Y estableció a doce, para que estuviesen con él, y para enviarlos a predicar.' La relación era fundamental."
  },
  {
    id: 2,
    question: "Según la guía, ¿con qué tipo de personas se relacionó Jesús, demostrando que buscaba restaurar relaciones rotas?",
    options: ["Solo con líderes religiosos y personas influyentes", "Solo con sus familiares y amigos cercanos", "Con cobradores de impuestos, mujeres rechazadas y enfermos marginados", "Únicamente con aquellos que seguían todas las leyes"],
    correctAnswer: "Con cobradores de impuestos, mujeres rechazadas y enfermos marginados",
    explanation: "¡Así es! La guía menciona que Jesús se relacionó con cobradores de impuestos (Mateo), mujeres rechazadas (la samaritana), enfermos marginados (los leprosos) e incluso traidores (Judas)."
  },
  {
    id: 3,
    question: "¿Qué frase clave resume la importancia de las relaciones en el ministerio de Jesús?",
    options: ["'La fe mueve montañas.'", "'Jesús construyó relaciones antes de transformar corazones.'", "'El conocimiento es poder.'", "'La oración es la clave del éxito.'"],
    correctAnswer: "'Jesús construyó relaciones antes de transformar corazones.'",
    explanation: "¡Exacto! La frase clave es: 'Jesús construyó relaciones antes de transformar corazones. Y aún hoy, el amor relacional es su método más poderoso.'"
  },
  {
    id: 4,
    question: "Una barrera moderna para construir relaciones, mencionada en la guía, es:",
    options: ["El exceso de reuniones comunitarias", "La falta de tecnología", "El individualismo moderno", "Leer demasiados libros de autoayuda"],
    correctAnswer: "El individualismo moderno",
    explanation: "Correcto. El 'Individualismo moderno (“yo y Dios, suficiente”)' es una de las barreras listadas."
  }
];

export const TriviaGame: FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = triviaData[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + (quizFinished || showFeedback ? 1 : 0)) / triviaData.length) * 100;


  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < triviaData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Puzzle className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl font-headline text-primary">Trivia Completada</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl font-semibold text-foreground/90">
            ¡Has completado la trivia!
          </p>
          <p className="text-2xl font-bold text-primary">
            Tu puntuación final es: {score} de {triviaData.length}
          </p>
          <Progress value={(score / triviaData.length) * 100} className="w-full h-3 [&>div]:bg-primary" />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRestartQuiz} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <RotateCcw className="mr-2 h-4 w-4" />
            Jugar de Nuevo
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
           <Puzzle className="h-8 w-8 text-primary" />
          <CardTitle className="text-2xl font-headline text-primary">Trivia de Relaciones</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Pregunta {currentQuestionIndex + 1} de {triviaData.length} - Puntuación: {score}
        </CardDescription>
         <Progress value={progressPercentage} className="w-full h-2 [&>div]:bg-primary mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold text-foreground/90">{currentQuestion.question}</p>
        <RadioGroup value={selectedAnswer ?? ""} onValueChange={setSelectedAnswer} disabled={showFeedback}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent/10 transition-colors">
              <RadioGroupItem value={option} id={`option-${currentQuestion.id}-${index}`} className="border-primary text-primary focus:ring-primary data-[state=checked]:bg-primary" />
              <Label htmlFor={`option-${currentQuestion.id}-${index}`} className="flex-1 cursor-pointer text-foreground/80">{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showFeedback && (
          <Alert variant={isCorrect ? "default" : "destructive"} className={isCorrect ? "bg-green-500/10 border-green-500" : ""}>
            {isCorrect ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-destructive" />}
            <AlertTitle className={isCorrect? "text-green-700" : "text-destructive"}>
              {isCorrect ? "¡Correcto!" : "Incorrecto"}
            </AlertTitle>
            <AlertDescription className={isCorrect? "text-green-600" : "text-destructive"}>
              {currentQuestion.explanation}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {showFeedback ? (
          <Button onClick={handleNextQuestion} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {currentQuestionIndex === triviaData.length - 1 ? "Finalizar Trivia" : "Siguiente Pregunta"}
          </Button>
        ) : (
          <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Enviar Respuesta
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
