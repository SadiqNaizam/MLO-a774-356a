import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface StatItem {
  label: string;
  value: string | number;
}

interface PlayerStatsWidgetProps {
  playerName?: string;
  stats: StatItem[];
  className?: string;
}

const PlayerStatsWidget: React.FC<PlayerStatsWidgetProps> = ({
  playerName,
  stats,
  className,
}) => {
  console.log("Rendering PlayerStatsWidget for:", playerName);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{playerName ? `${playerName}'s Stats` : 'Player Statistics'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {stats.length > 0 ? (
          stats.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{stat.label}</span>
                <span className="font-medium">{stat.value}</span>
              </div>
              {index < stats.length - 1 && <Separator className="my-1" />}
            </React.Fragment>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No stats available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerStatsWidget;