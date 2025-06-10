import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Spinner from '@/components/common/Spinner'; // Custom spinner
import { XCircle } from 'lucide-react';

const MatchmakingStatusScreen = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(60); // seconds
  const [statusText, setStatusText] = useState("Searching for match...");

  console.log('MatchmakingStatusScreen loaded');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setStatusText("Match Found! Joining server...");
          // Simulate joining game after a short delay
          setTimeout(() => {
            // In a real app, navigate to the game screen
            // For now, let's navigate to post-match summary as a placeholder for game completion
            navigate('/post-match-summary');
          }, 2000);
          return 100;
        }
        return prev + 5; // Simulate progress
      });

      setEstimatedTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 500); // Update every 0.5 seconds

    return () => clearInterval(timer);
  }, [navigate]);

  const handleCancelMatchmaking = () => {
    console.log('Matchmaking cancelled');
    navigate('/main-lobby');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-2xl bg-slate-800 border-slate-700 text-slate-50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-purple-400">Matchmaking</CardTitle>
          <CardDescription className="text-slate-400">
            {statusText}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 py-10">
          <div className="flex justify-center items-center">
            <Spinner size={16} className="text-purple-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-300 mb-1">
              <Label htmlFor="matchmaking-progress">Progress</Label>
              <span>{progress}%</span>
            </div>
            <Progress id="matchmaking-progress" value={progress} className="w-full [&>div]:bg-purple-500 bg-slate-700" />
          </div>
          <div className="text-center text-slate-400">
            <p>Estimated wait time: <span className="font-semibold text-purple-300">{Math.floor(estimatedTime / 60)}m {estimatedTime % 60}s</span></p>
            <p>Players in queue: <span className="font-semibold text-purple-300">{Math.floor(Math.random() * 50) + 10}</span></p> {/* Random placeholder */}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCancelMatchmaking} variant="destructive" className="w-full bg-red-700 hover:bg-red-800">
            <XCircle className="h-5 w-5 mr-2" /> Cancel Matchmaking
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MatchmakingStatusScreen;