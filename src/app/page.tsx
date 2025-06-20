
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ContentCard, QuoteBlock } from '@/components/guide/ContentCard';
import { Users, Heart, Link2, Handshake, AlertTriangle, ListChecks, Pin, Gamepad2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


export default function Home() {
  const guideContent = {
    title: "🧡 GUÍA DE ENSEÑANZA – HÁBITO 4: Construir relaciones",
    author: "📘 Basado en Los hábitos de Jesús – Jay Dennis",
    baseScripture: {
      text: "Después subió al monte y llamó a sí a los que él quiso; y vinieron a él. Y estableció a doce, para que estuviesen con él, y para enviarlos a predicar.",
      source: "Marcos 3:13–14"
    },
    objective: "Entender que Jesús tenía el hábito intencional de formar relaciones cercanas, profundas y restauradoras. Él modeló cómo las relaciones son una herramienta esencial del discipulado y del Reino de Dios.",
    points: [
      {
        titlePrefix: "1.",
        title: "Jesús priorizó las relaciones humanas",
        icon: Users,
        text: "Jesús no se aisló como un maestro inalcanzable. Él caminó con personas, compartió comida con ellas, las escuchó, las tocó y se dejó tocar.",
        scripture: {
          text: "Y estableció a doce, para que estuviesen con él…",
          source: "Marcos 3:14",
          commentary: "Antes de enviarlos a predicar, Jesús los invitó a estar con él. La relación era primero, luego la misión."
        },
      },
      {
        titlePrefix: "2.",
        title: "Jesús buscaba restaurar relaciones rotas",
        icon: Link2,
        text: `Jesús no solo se acercó a los “fáciles de amar”. Se relacionó con:
- Cobradores de impuestos (Mateo)
- Mujeres rechazadas (la samaritana)
- Enfermos marginados (los leprosos)
- Traidores (Judas)`,
        scripture: {
          text: "Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido.",
          source: "Lucas 19:10"
        },
        applicationNote: "Aplicación: Jesús fue un constructor de puentes, no de muros. Nosotros también debemos acercarnos, no excluir.",
      },
      {
        titlePrefix: "3.",
        title: "Jesús mostró que el discipulado ocurre en el contexto de la relación",
        icon: Handshake,
        text: "Él no solo predicaba a las multitudes; formó a sus discípulos día a día, en la convivencia, con paciencia y cercanía. Los corrigió, los animó, los sirvió.",
        scriptures: [
          { text: "El que quiera hacerse grande entre vosotros será vuestro servidor.", source: "Mateo 20:26" },
          { text: "Ya no os llamaré siervos… pero os he llamado amigos.", source: "Juan 15:15" }
        ],
        applicationNote: "La transformación ocurre en la cercanía, no en la distancia.",
      }
    ],
    barriers: {
      title: "Barreras actuales que impiden construir relaciones",
      icon: AlertTriangle,
      items: [
        "Individualismo moderno (“yo y Dios, suficiente”)",
        "Rencores y heridas no sanadas",
        "Falta de tiempo para estar con otros",
        "Superficialidad de las redes sociales"
      ],
    },
    practicalApplication: {
      title: "Aplicación práctica",
      icon: ListChecks,
      items: [
        "Acércate a alguien con quien hayas perdido contacto.",
        "Invita a comer o conversar a alguien nuevo del grupo o iglesia.",
        "Decide que tu discipulado será relacional, no solo informativo."
      ],
    },
    keyPhrase: {
      title: "Frase clave",
      icon: Pin,
      text: "Jesús construyó relaciones antes de transformar corazones. Y aún hoy, el amor relacional es su método más poderoso.",
    }
  };

  const FullScreenSection = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <section className={`min-h-screen flex flex-col justify-center items-center p-4 md:p-8 ${className}`}>
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">

        {/* Hero Section */}
        <FullScreenSection>
          <AnimatedSection animationName="animate-fade-in" className="w-full">
            <div className="text-center space-y-4">
              <div className="inline-block p-3 bg-primary/10 rounded-full">
                <Heart className="h-12 w-12 text-primary" strokeWidth={1.5}/>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{guideContent.title}</h1>
              <p className="text-lg text-muted-foreground">{guideContent.author}</p>
              <QuoteBlock quote={guideContent.baseScripture.text} source={guideContent.baseScripture.source} className="max-w-2xl mx-auto bg-primary/5 border-primary text-primary-foreground/80" />
              <p className="text-xl md:text-2xl text-foreground/90 font-semibold max-w-3xl mx-auto pt-4">{guideContent.objective}</p>
            </div>
          </AnimatedSection>
        </FullScreenSection>

        {/* Teaching Points */}
        {guideContent.points.map((point, index) => (
          <FullScreenSection key={index}>
            <AnimatedSection delay={index * 150} animationName="animate-fade-in-up" className="w-full">
              <ContentCard title={point.title} titlePrefix={point.titlePrefix} icon={point.icon}>
                <p className="whitespace-pre-line text-lg md:text-xl">{point.text}</p>
                {point.scripture && (
                  <QuoteBlock
                    quote={point.scripture.text}
                    source={point.scripture.source}
                    commentary={point.scripture.commentary}
                  />
                )}
                {point.scriptures && point.scriptures.map((s, i) => (
                  <QuoteBlock key={i} quote={s.text} source={s.source} className={`mt-3 ${i > 0 ? "md:mt-4" : ""}`} />
                ))}
                {point.applicationNote && <p className="mt-4 text-base md:text-lg font-medium text-primary">{point.applicationNote}</p>}
              </ContentCard>
            </AnimatedSection>
          </FullScreenSection>
        ))}

        {/* Barriers Section */}
        <FullScreenSection>
          <AnimatedSection delay={guideContent.points.length * 150} animationName="animate-fade-in-up" className="w-full">
            <ContentCard title={guideContent.barriers.title} icon={guideContent.barriers.icon}>
              <ul className="list-disc list-inside space-y-3 pl-2 text-lg md:text-xl">
                {guideContent.barriers.items.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </ContentCard>
          </AnimatedSection>
        </FullScreenSection>

        {/* Practical Application Section */}
        <FullScreenSection>
          <AnimatedSection delay={(guideContent.points.length + 1) * 150} animationName="animate-fade-in-up" className="w-full">
            <ContentCard title={guideContent.practicalApplication.title} icon={guideContent.practicalApplication.icon}>
              <ul className="list-disc list-inside space-y-3 pl-2 text-lg md:text-xl">
                {guideContent.practicalApplication.items.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </ContentCard>
          </AnimatedSection>
        </FullScreenSection>

        {/* Key Phrase Section */}
        <FullScreenSection>
          <AnimatedSection delay={(guideContent.points.length + 2) * 150} animationName="animate-fade-in-up" className="w-full">
            <ContentCard title={guideContent.keyPhrase.title} icon={guideContent.keyPhrase.icon} className="bg-accent/10 border-accent">
               <p className="text-2xl md:text-3xl font-semibold text-accent-foreground/90 italic text-center py-4">&ldquo;{guideContent.keyPhrase.text}&rdquo;</p>
            </ContentCard>
          </AnimatedSection>
        </FullScreenSection>

        {/* Trivia Game Link Section */}
        <FullScreenSection>
            <AnimatedSection delay={(guideContent.points.length + 3) * 150} animationName="animate-fade-in-up" className="w-full">
            <div className="text-center py-12">
                <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
                <Gamepad2 className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-bold font-headline text-primary mb-4">Pon a prueba tus conocimientos</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                ¿Listo para ver cuánto has aprendido? ¡Juega nuestra trivia interactiva!
                </p>
                <Link href="/trivia" passHref>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Comenzar Trivia
                </Button>
                </Link>
            </div>
            </AnimatedSection>
        </FullScreenSection>

      </main>
      <Footer />
    </div>
  );
}
