import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterPreview from '@/components/game/CharacterPreview';
import PlayerStatsWidget from '@/components/game/PlayerStatsWidget';
import GameModeCard from '@/components/game/GameModeCard';
import FriendListPanel from '@/components/game/FriendListPanel';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings, Store, Users, Swords, Newspaper, Info } from 'lucide-react';

const MainLobbyScreen = () => {
  const navigate = useNavigate();
  const [selectedGameMode, setSelectedGameMode] = useState<string | null>(null);
  const [isNewsDialogOpen, setIsNewsDialogOpen] = useState(false);

  console.log('MainLobbyScreen loaded');

  const playerStats = [
    { label: "Matches Played", value: 128 },
    { label: "Win Rate", value: "58%" },
    { label: "K/D Ratio", value: 1.75 },
    { label: "Rank", value: "Gold III" },
  ];

  const gameModes = [
    { id: "br_solo", name: "Battle Royale - Solo", description: "Be the last one standing in this intense solo free-for-all.", imageUrl: "https://placehold.co/400x225/1A202C/E2E8F0?text=Battle+Royale" },
    { id: "tdm", name: "Team Deathmatch", description: "Join a team and fight for supremacy. First team to reach the score limit wins.", imageUrl: "https://placehold.co/400x225/2D3748/E2E8F0?text=Team+Deathmatch" },
    { id: "ctf", name: "Capture The Flag", description: "Infiltrate the enemy base, grab their flag, and return it to your base.", imageUrl: "https://placehold.co/400x225/4A5568/E2E8F0?text=Capture+Flag" },
  ];

  const friends = [
    { id: "1", name: "ShadowAssasin", status: "online" as const, avatarUrl: "https://placehold.co/40x40/718096/E2E8F0?text=SA" },
    { id: "2", name: "PixelPirate", status: "ingame" as const, avatarUrl: "https://placehold.co/40x40/718096/E2E8F0?text=PP" },
    { id: "3", name: "CyberNinja", status: "offline" as const, avatarUrl: "https://placehold.co/40x40/718096/E2E8F0?text=CN" },
    { id: "4", name: "GhostRecon", status: "away" as const, avatarUrl: "https://placehold.co/40x40/718096/E2E8F0?text=GR" },
  ];
  
  const handleStartMatch = () => {
    if (selectedGameMode) {
      console.log(`Starting match for mode: ${selectedGameMode}`);
      navigate('/matchmaking-status');
    } else {
      // Optionally, trigger an alert or visual cue that a mode must be selected
      alert("Please select a game mode first!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* Header Navigation */}
      <header className="bg-slate-800/80 backdrop-blur-md shadow-lg p-3 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-400">GAME LOBBY</div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink onClick={() => navigate('/inventory-management')} className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-slate-700 text-slate-300 hover:text-purple-300"}>
                  <Swords className="h-4 w-4 mr-2" /> Inventory
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                 <DialogTrigger asChild>
                    <Button variant="ghost" onClick={() => setIsNewsDialogOpen(true)} className="hover:bg-slate-700 text-slate-300 hover:text-purple-300">
                        <Newspaper className="h-4 w-4 mr-2" /> News & Events
                    </Button>
                 </DialogTrigger>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-slate-700 text-slate-300 hover:text-purple-300"}>
                  <Store className="h-4 w-4 mr-2" /> Store
                </NavigationMenuLink>
              </NavigationMenuItem>
               <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-slate-700 text-slate-300 hover:text-purple-300"}>
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Popover>
            <PopoverTrigger asChild>
                <Avatar className="cursor-pointer h-10 w-10 border-2 border-purple-400 hover:border-purple-300 transition-all">
                    <AvatarImage src="https://placehold.co/40x40/A0AEC0/1A202C?text=U" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-slate-800 border-slate-700 text-slate-200 p-0">
                <div className="p-4">
                    <p className="font-medium">GuestPlayer123</p>
                    <p className="text-xs text-slate-400">guest@player.com</p>
                </div>
                <Separator className="bg-slate-700" />
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-purple-300 rounded-none p-3" onClick={() => navigate('/')}>
                    Logout
                </Button>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Character & Stats */}
        <section className="lg:col-span-1 space-y-6">
          <CharacterPreview 
            characterImageUrl="https://placehold.co/600x800/1A202C/E2E8F0?text=My+Hero" 
            characterName="Default Hero" 
            aspectRatio={3/4}
            isLoading={false}
          />
          <PlayerStatsWidget 
            playerName="GuestPlayer123" 
            stats={playerStats} 
            className="bg-slate-800/50 border border-slate-700 shadow-md"
          />
        </section>

        {/* Middle Column: Game Modes & Start Button */}
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-semibold text-purple-300 mb-4">Select Game Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameModes.map((mode) => (
              <GameModeCard
                key={mode.id}
                modeName={mode.name}
                description={mode.description}
                imageUrl={mode.imageUrl}
                isActive={selectedGameMode === mode.id}
                onSelect={() => setSelectedGameMode(mode.id)}
                actionButtonText={selectedGameMode === mode.id ? "Selected" : "Select"}
                className="bg-slate-800/50 border border-slate-700 hover:border-purple-500 text-slate-200"
              />
            ))}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                size="lg" 
                className="w-full mt-6 py-3 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
                onClick={handleStartMatch}
                disabled={!selectedGameMode}
              >
                <Swords className="h-5 w-5 mr-2" /> Start Match
              </Button>
            </PopoverTrigger>
             {/* Tutorial Popover for new users, shown on first load of this screen perhaps */}
            <PopoverContent className="bg-slate-700 border-slate-600 text-slate-200">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-400 mt-1" />
                <div>
                  <h4 className="font-semibold">Quick Start!</h4>
                  <p className="text-sm">Select a game mode above, then click 'Start Match' to jump into the action!</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </section>

        {/* Right Column: Friends List */}
        <section className="lg:col-span-1">
          <FriendListPanel 
            friends={friends} 
            title="Social Hub" 
            maxHeight="h-[calc(100vh-200px)]" 
            className="bg-slate-800/50 border border-slate-700 shadow-md"
          />
        </section>
      </main>

      {/* News/Events Dialog */}
      <Dialog open={isNewsDialogOpen} onOpenChange={setIsNewsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-purple-400 text-2xl">Latest News & Events</DialogTitle>
            <DialogDescription className="text-slate-400">
              Stay updated with what's happening in the game.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3 text-sm max-h-[60vh] overflow-y-auto">
            <h3 className="font-semibold text-lg text-pink-400">New Season "Cybernetic Dawn" is LIVE!</h3>
            <p className="text-slate-300">Explore a new map, unlock unique cybernetic skins, and climb the ranks in our latest competitive season. Double XP weekend starts Friday!</p>
            <img src="https://placehold.co/400x200/1A202C/E2E8F0?text=Cyber+Season" alt="New Season" className="rounded-md my-2" />
            <h3 className="font-semibold text-lg text-pink-400 mt-4">Upcoming Tournament: Titan's Clash</h3>
            <p className="text-slate-300">Sign-ups open next week for the Titan's Clash tournament. Huge prize pool and exclusive bragging rights await the champions!</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsNewsDialogOpen(false)} className="bg-purple-600 hover:bg-purple-700">Got it!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainLobbyScreen;