
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TriviaGame } from '@/components/trivia/TriviaGame';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function TriviaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <AnimatedSection animationName="animate-fade-in">
          <TriviaGame />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
