import { HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-primary/20 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <HeartHandshake className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary group-hover:text-primary/80 transition-colors">
            Puentes Relacionales
          </h1>
        </Link>
        <nav>
          {/* Future navigation links can go here */}
        </nav>
      </div>
    </header>
  );
}
