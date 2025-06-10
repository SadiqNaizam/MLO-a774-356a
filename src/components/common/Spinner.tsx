import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // For conditional classes

interface SpinnerProps {
  size?: number; // Corresponds to h- and w- classes in Tailwind (e.g., size=4 -> h-4 w-4)
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 6, className }) => {
  console.log("Rendering Spinner");
  // Using lucide-react's Loader2 icon with Tailwind's animate-spin
  return (
    <Loader2
      className={cn(`h-${size} w-${size} animate-spin text-primary`, className)}
      aria-label="Loading..."
    />
  );
};

export default Spinner;