import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
  className?: string;
  iconClassName?: string;
}

export function SectionTitle({ icon: Icon, title, subtitle, className, iconClassName }: SectionTitleProps) {
  return (
    <div className={cn("flex flex-col items-center text-center mb-8 md:mb-12", className)}>
      {Icon && <Icon className={cn("h-12 w-12 text-primary mb-4", iconClassName)} strokeWidth={1.5} />}
      <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">{title}</h2>
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
    </div>
  );
}
