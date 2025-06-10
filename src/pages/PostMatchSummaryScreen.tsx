import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, ShieldCheck, TrendingUp, Repeat, Home } from 'lucide-react';

const PostMatchSummaryScreen = () => {
  const navigate = useNavigate();
  console.log('PostMatchSummaryScreen loaded');

  // Placeholder data for the summary
  const matchStats = {
    rank: 3,
    totalPlayers: 50,
    kills: 7,
    damageDealt: 1250,
    survivalTime: "18:32",
    xpEarned: 1250,
    xpToNextLevel: 2000,
    currentXp: 500, // XP before this match for the current level
    rewards: ["+250 Battle Pass XP", "+100 Credits"],
  };

  const performanceBreakdown = [
    { metric: "Kills", value: matchStats.kills, score: matchStats.kills * 50 },
    { metric: "Damage Dealt", value: matchStats.damageDealt, score: Math.floor(matchStats.damageDealt / 10) },
    { metric: "Assists", value: 3, score: 3 * 25 }, // Example
    { metric: "Survival Time Bonus", value: matchStats.survivalTime, score: 300 }, // Example
    { metric: "Placement Bonus", value: `#${matchStats.rank}`, score: (matchStats.totalPlayers - matchStats.rank) * 10 },
  ];
  
  const totalScore = performanceBreakdown.reduce((sum, item) => sum + item.score, 0);
  const xpProgress = ((matchStats.currentXp + matchStats.xpEarned) / matchStats.xpToNextLevel) * 100;


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl bg-slate-800 border-slate-700 text-slate-50">
        <CardHeader className="text-center">
          <Trophy className="h-16 w-16 mx-auto text-yellow-400 mb-3" />
          <CardTitle className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Match Summary
          </CardTitle>
          <CardDescription className="text-slate-400">
            You placed <span className="font-bold text-yellow-300">#{matchStats.rank}</span> out of {matchStats.totalPlayers} players!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-slate-700/50 rounded-lg">
            <Avatar className="h-16 w-16 border-2 border-purple-400">
              <AvatarImage src="https://placehold.co/64x64/A0AEC0/1A202C?text=U" alt="Player" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-slate-100">GuestPlayer123</h3>
              <p className="text-sm text-slate-400">Match Completed: {new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          <div>
            <Label htmlFor="xp-progress" className="text-slate-300">XP Progress (Level Up!)</Label>
            <Progress id="xp-progress" value={xpProgress} className="w-full mt-1 mb-1 [&>div]:bg-green-500 bg-slate-700" />
            <p className="text-xs text-slate-400 text-right">
              {matchStats.currentXp + matchStats.xpEarned} / {matchStats.xpToNextLevel} XP to next level
            </p>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold mb-2 text-purple-300 flex items-center">
              <ShieldCheck className="h-5 w-5 mr-2 text-green-400" /> Performance Breakdown
            </h4>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-600">
                  <TableHead className="text-slate-300">Metric</TableHead>
                  <TableHead className="text-slate-300 text-right">Value</TableHead>
                  <TableHead className="text-slate-300 text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceBreakdown.map((item) => (
                  <TableRow key={item.metric} className="border-slate-700 hover:bg-slate-700/70">
                    <TableCell className="font-medium text-slate-200">{item.metric}</TableCell>
                    <TableCell className="text-right text-slate-300">{item.value}</TableCell>
                    <TableCell className="text-right text-green-400 font-semibold">+{item.score}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-slate-500">
                    <TableCell className="font-bold text-lg text-slate-100">Total Match Score</TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right font-bold text-lg text-green-300">{totalScore}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg">
             <h4 className="text-lg font-semibold mb-2 text-purple-300 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-yellow-400" /> Rewards Earned
             </h4>
             <ul className="list-disc list-inside space-y-1 text-slate-300">
                {matchStats.rewards.map((reward, index) => (
                    <li key={index}>{reward}</li>
                ))}
                <li>+{matchStats.xpEarned} XP</li>
             </ul>
          </div>

        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-4 pt-6">
          <Button onClick={() => navigate('/main-lobby')} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300">
            <Home className="h-5 w-5 mr-2" /> Return to Lobby
          </Button>
          <Button onClick={() => navigate('/matchmaking-status')} className="bg-green-600 hover:bg-green-700">
            <Repeat className="h-5 w-5 mr-2" /> Play Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostMatchSummaryScreen;