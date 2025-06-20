// src/components/AnimatedSection.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number; 
  animationName?: 'animate-fade-in-up' | 'animate-fade-in';
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  animationName = 'animate-fade-in', // Changed default to 'animate-fade-in' for page turns
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  // sectionRef is not used in the new logic but kept for minimal changes if other uses exist.
  const sectionRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    // Set to false briefly then true to ensure animation re-triggers on key change (re-mount)
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 20); // A very short delay
    
    return () => clearTimeout(timer);
  }, []); // Runs on mount (and re-mount due to key change)

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0', // Start hidden
        isVisible && animationName, // Apply animation class when visible
        className
      )}
      style={isVisible ? { animationDelay: `${delay}ms` } : {}} // animation-duration is from tailwind.config.ts
    >
      {children}
    </div>
  );
}
