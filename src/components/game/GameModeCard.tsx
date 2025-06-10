import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // If there's an action like "Details"
import { cn } from '@/lib/utils';

interface GameModeCardProps {
  modeName: string;
  description: string;
  imageUrl?: string; // Optional image for the game mode
  isActive?: boolean; // To highlight if selected
  onSelect: () => void;
  actionButtonText?: string; // e.g., "Play", "Select"
  className?: string;
}

const GameModeCard: React.FC<GameModeCardProps> = ({
  modeName,
  description,
  imageUrl,
  isActive = false,
  onSelect,
  actionButtonText = "Select",
  className,
}) => {
  console.log("Rendering GameModeCard:", modeName, "Active:", isActive);

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg",
        isActive ? "border-primary ring-2 ring-primary shadow-lg" : "border-border",
        className
      )}
      onClick={onSelect}
    >
      <CardHeader>
        {imageUrl && (
          <div className="mb-2 overflow-hidden rounded-md aspect-video bg-muted">
            <img
              src={imageUrl}
              alt={modeName}
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails
            />
          </div>
        )}
        <CardTitle>{modeName}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant={isActive ? "default" : "outline"} className="w-full" onClick={(e) => { e.stopPropagation(); onSelect(); }}>
          {actionButtonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameModeCard;