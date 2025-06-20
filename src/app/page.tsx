
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedSection } from '@/components/AnimatedSection';
import { ContentCard, QuoteBlock } from '@/components/guide/ContentCard';
import { Users, Heart, Link2, Handshake, AlertTriangle, ListChecks, Pin } from 'lucide-react';
import { TriviaGame } from '@/components/trivia/TriviaGame';


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
        text: "Jesús no solo se acercó a los “fáciles de amar”. Se relacionó con:\n- Cobradores de impuestos (Mateo)\n- Mujeres rechazadas (la samaritana)\n- Enfermos marginados (los leprosos)\n- Traidores (Judas)",
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 md:space-y-24">

        {/* Hero Section */}
        <AnimatedSection animationName="animate-fade-in">
          <section className="text-center space-y-4">
            <div className="inline-block p-3 bg-primary/10 rounded-full">
              <Heart className="h-12 w-12 text-primary" strokeWidth={1.5}/>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{guideContent.title}</h1>
            <p className="text-lg text-muted-foreground">{guideContent.author}</p>
            <QuoteBlock quote={guideContent.baseScripture.text} source={guideContent.baseScripture.source} className="max-w-2xl mx-auto bg-primary/5 border-primary text-primary-foreground/80" />
            <p className="text-xl md:text-2xl text-foreground/90 font-semibold max-w-3xl mx-auto pt-4">{guideContent.objective}</p>
          </section>
        </AnimatedSection>

        {/* Teaching Points */}
        {guideContent.points.map((point, index) => (
          <AnimatedSection key={index} delay={index * 150} animationName="animate-fade-in-up">
            <ContentCard title={point.title} titlePrefix={point.titlePrefix} icon={point.icon}>
              <p className="whitespace-pre-line">{point.text}</p>
              {point.scripture && (
                <QuoteBlock
                  quote={point.scripture.text}
                  source={point.scripture.source}
                  commentary={point.scripture.commentary}
                />
              )}
              {point.scriptures && point.scriptures.map((s, i) => (
                <QuoteBlock key={i} quote={s.text} source={s.source} className={i > 0 ? "mt-3" : ""} />
              ))}
              {point.applicationNote && <p className="mt-3 text-sm font-medium text-primary">{point.applicationNote}</p>}
            </ContentCard>
          </AnimatedSection>
        ))}

        {/* Barriers Section */}
        <AnimatedSection delay={guideContent.points.length * 150} animationName="animate-fade-in-up">
          <ContentCard title={guideContent.barriers.title} icon={guideContent.barriers.icon}>
            <ul className="list-disc list-inside space-y-2 pl-2">
              {guideContent.barriers.items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </ContentCard>
        </AnimatedSection>

        {/* Practical Application Section */}
        <AnimatedSection delay={(guideContent.points.length + 1) * 150} animationName="animate-fade-in-up">
          <ContentCard title={guideContent.practicalApplication.title} icon={guideContent.practicalApplication.icon}>
            <ul className="list-disc list-inside space-y-2 pl-2">
              {guideContent.practicalApplication.items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </ContentCard>
        </AnimatedSection>

        {/* Key Phrase Section */}
        <AnimatedSection delay={(guideContent.points.length + 2) * 150} animationName="animate-fade-in-up">
          <ContentCard title={guideContent.keyPhrase.title} icon={guideContent.keyPhrase.icon} className="bg-accent/10 border-accent">
             <p className="text-xl font-semibold text-accent-foreground/90 italic text-center py-4">&ldquo;{guideContent.keyPhrase.text}&rdquo;</p>
          </ContentCard>
        </AnimatedSection>

        {/* Trivia Game Section */}
        <AnimatedSection delay={(guideContent.points.length + 3) * 150} animationName="animate-fade-in-up">
          <TriviaGame />
        </AnimatedSection>

      </main>
      <Footer />
    </div>
  );
}
