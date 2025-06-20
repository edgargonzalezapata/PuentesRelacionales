import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  icon?: LucideIcon;
  title: string;
  titlePrefix?: string;
  children: React.ReactNode;
  className?: string;
  iconClassName?: string;
}

export function ContentCard({ icon: Icon, title, titlePrefix, children, className, iconClassName }: ContentCardProps) {
  return (
    <Card className={cn("shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/80 backdrop-blur-sm", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          {Icon && <Icon className={cn("h-8 w-8 text-primary shrink-0", iconClassName)} strokeWidth={1.5}/>}
          <CardTitle className="text-2xl font-headline text-primary">
            {titlePrefix && <span className="text-accent font-semibold">{titlePrefix} </span>}
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-foreground/80 leading-relaxed space-y-4">
        {children}
      </CardContent>
    </Card>
  );
}

interface QuoteBlockProps {
  quote: string;
  source?: string;
  commentary?: string;
  className?: string;
}

export function QuoteBlock({ quote, source, commentary, className }: QuoteBlockProps) {
  return (
    <blockquote className={cn("border-l-4 border-accent pl-4 py-2 italic text-accent-foreground/90 bg-accent/10 rounded-r-md", className)}>
      <p className="mb-1">&ldquo;{quote}&rdquo;</p>
      {source && <footer className="text-sm text-muted-foreground not-italic">&mdash; {source}</footer>}
      {commentary && <p className="mt-2 text-sm text-foreground/70 not-italic">{commentary}</p>}
    </blockquote>
  );
}
