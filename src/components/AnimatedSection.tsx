// src/components/AnimatedSection.tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number; // in milliseconds for staggered effect if needed
  animationName?: 'animate-fade-in-up' | 'animate-fade-in';
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  animationName = 'animate-fade-in-up',
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      {
        threshold: 0.1, // Adjust this value to control when the animation triggers
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0', // Start hidden
        isVisible && animationName, // Apply animation class when visible
        className
      )}
      style={isVisible ? { animationDelay: `${delay}ms` } : {}}
    >
      {children}
    </div>
  );
}
