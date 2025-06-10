import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge'; // For status
import { cn } from '@/lib/utils';

interface Friend {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'ingame' | 'away';
  avatarUrl?: string;
}

interface FriendListPanelProps {
  friends: Friend[];
  title?: string;
  maxHeight?: string; // e.g., 'h-[300px]'
  className?: string;
}

const FriendListPanel: React.FC<FriendListPanelProps> = ({
  friends,
  title = "Friends",
  maxHeight = 'h-[400px]',
  className,
}) => {
  console.log("Rendering FriendListPanel with", friends.length, "friends.");

  const getStatusColor = (status: Friend['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'ingame': return 'bg-blue-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title} ({friends.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={cn("pr-3", maxHeight)}>
          {friends.length > 0 ? (
            <ul className="space-y-3">
              {friends.map((friend) => (
                <li key={friend.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                      <AvatarFallback>{friend.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span>{friend.name}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn("capitalize text-xs px-2 py-0.5", getStatusColor(friend.status) + " text-white")}
                  >
                    {friend.status}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No friends to display.</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FriendListPanel;