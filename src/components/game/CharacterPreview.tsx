import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state
import { Card, CardContent, CardFooter } from '@/components/ui/card'; // Optional: for framing

interface CharacterPreviewProps {
  characterImageUrl?: string;
  characterName?: string;
  isLoading?: boolean;
  aspectRatio?: number; // e.g., 1 (square), 16/9, 4/3
}

const CharacterPreview: React.FC<CharacterPreviewProps> = ({
  characterImageUrl,
  characterName,
  isLoading = false,
  aspectRatio = 1, // Default to square
}) => {
  console.log("Rendering CharacterPreview for:", characterName, "Loading:", isLoading);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <AspectRatio ratio={aspectRatio}>
            <Skeleton className="w-full h-full rounded-md" />
          </AspectRatio>
          {characterName !== undefined && ( // Also show skeleton for name if name would be shown
            <Skeleton className="h-4 w-3/4 mt-2 mx-auto" />
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <AspectRatio ratio={aspectRatio} className="bg-muted">
          <img
            src={characterImageUrl || '/placeholder.svg'} // Use a placeholder image
            alt={characterName || 'Character preview'}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
      </CardContent>
      {characterName && (
        <CardFooter className="p-2 justify-center">
          <p className="text-sm font-medium text-center truncate">{characterName}</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default CharacterPreview;