import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CharacterPreview from '@/components/game/CharacterPreview';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, CheckCircle, Shield, Ghost, Zap, Palette } from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  type: 'Outfit' | 'Weapon Skin' | 'Emote' | 'Vehicle Skin';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  imageUrl: string;
  description: string;
  equipped?: boolean;
}

const placeholderItems: InventoryItem[] = [
  { id: 'outfit1', name: 'Cyber Ronin', type: 'Outfit', rarity: 'Legendary', imageUrl: 'https://placehold.co/200x300/FF6347/FFFFFF?text=Ronin+Outfit', description: 'Become the ghost of the digital age.', equipped: true },
  { id: 'outfit2', name: 'Arctic Ranger', type: 'Outfit', rarity: 'Epic', imageUrl: 'https://placehold.co/200x300/00FFFF/000000?text=Arctic+Gear', description: 'Blend into snowy environments.' },
  { id: 'wskin1', name: 'Neon Striker AR', type: 'Weapon Skin', rarity: 'Epic', imageUrl: 'https://placehold.co/200x100/FF00FF/FFFFFF?text=Neon+AR', description: 'Light up your foes.' },
  { id: 'wskin2', name: 'Gold Plated Pistol', type: 'Weapon Skin', rarity: 'Legendary', imageUrl: 'https://placehold.co/200x100/FFD700/000000?text=Gold+Pistol', description: 'For the distinguished operator.', equipped: true },
  { id: 'emote1', name: 'Victory Dance', type: 'Emote', rarity: 'Rare', imageUrl: 'https://placehold.co/150x150/32CD32/FFFFFF?text=Dance', description: 'Celebrate your win in style.' },
  { id: 'vskin1', name: 'Stealth Speeder', type: 'Vehicle Skin', rarity: 'Rare', imageUrl: 'https://placehold.co/200x150/483D8B/FFFFFF?text=Stealth+Car', description: 'Move like a shadow.' },
];

const InventoryManagementScreen = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryItem[]>(placeholderItems);
  const [equippedCharacterImage, setEquippedCharacterImage] = useState('https://placehold.co/400x600/1A202C/E2E8F0?text=Equipped+Hero');

  console.log('InventoryManagementScreen loaded');

  const handleEquipItem = (itemId: string, itemType: InventoryItem['type']) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.type === itemType) { // Unequip other items of the same type
          return { ...item, equipped: item.id === itemId };
        }
        if (item.id === itemId) { // Equip the selected item
          return { ...item, equipped: true };
        }
        return item;
      })
    );
    // Placeholder: In a real app, update character preview based on equipped item
    const selectedItem = items.find(item => item.id === itemId);
    if (selectedItem && selectedItem.type === 'Outfit') {
      setEquippedCharacterImage(selectedItem.imageUrl);
    }
    console.log(`Equipped item: ${itemId}`);
  };
  
  const getRarityColor = (rarity: InventoryItem['rarity']) => {
    switch(rarity) {
      case 'Common': return 'border-gray-500';
      case 'Uncommon': return 'border-green-500';
      case 'Rare': return 'border-blue-500';
      case 'Epic': return 'border-purple-500';
      case 'Legendary': return 'border-yellow-500';
      default: return 'border-gray-300';
    }
  };

  const renderItemList = (itemType: InventoryItem['type']) => {
    const filteredItems = items.filter(item => item.type === itemType);
    if (filteredItems.length === 0) {
      return <p className="text-slate-400 text-center py-10">No {itemType.toLowerCase()} items found.</p>;
    }
    return (
      <ScrollArea className="h-[calc(100vh-250px)] pr-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <TooltipProvider key={item.id} delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className={`overflow-hidden transition-all hover:shadow-xl bg-slate-800 border-2 ${getRarityColor(item.rarity)} ${item.equipped ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-green-400' : ''}`}>
                    <CardHeader className="p-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover aspect-video"/>
                    </CardHeader>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-sm truncate text-slate-100">{item.name}</h3>
                      <p className={`text-xs font-bold ${getRarityColor(item.rarity).replace('border-', 'text-')}`}>{item.rarity}</p>
                    </CardContent>
                    <CardFooter className="p-2">
                      <Button 
                        size="sm" 
                        className={`w-full ${item.equipped ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                        onClick={() => handleEquipItem(item.id, item.type)}
                        disabled={item.equipped}
                      >
                        {item.equipped ? <><CheckCircle className="h-4 w-4 mr-1" /> Equipped</> : 'Equip'}
                      </Button>
                    </CardFooter>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="bg-slate-700 border-slate-600 text-slate-200">
                  <p className="font-bold">{item.name} ({item.rarity})</p>
                  <p>{item.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>
    );
  };
  
  const tabCategories = [
    { value: "outfits", label: "Outfits", icon: <Ghost className="h-4 w-4 mr-2"/>, itemType: "Outfit" as InventoryItem['type'] },
    { value: "weapon-skins", label: "Weapon Skins", icon: <Shield className="h-4 w-4 mr-2"/>, itemType: "Weapon Skin" as InventoryItem['type'] },
    { value: "emotes", label: "Emotes", icon: <Zap className="h-4 w-4 mr-2"/>, itemType: "Emote" as InventoryItem['type'] },
    { value: "vehicle-skins", label: "Vehicle Skins", icon: <Palette className="h-4 w-4 mr-2"/>, itemType: "Vehicle Skin" as InventoryItem['type'] },
  ];


  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 p-4">
      <header className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate('/main-lobby')} className="border-purple-500 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Lobby
        </Button>
        <h1 className="text-3xl font-bold text-purple-400">Inventory</h1>
        <div className="w-[150px]"></div> {/* Spacer */}
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-slate-800/50 p-4 rounded-lg border border-slate-700 shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Character Preview</h2>
          <CharacterPreview 
            characterImageUrl={items.find(item => item.type === 'Outfit' && item.equipped)?.imageUrl || 'https://placehold.co/400x600/1A202C/E2E8F0?text=Default+Look'}
            characterName="My Character"
            aspectRatio={2/3}
            className="w-full max-w-xs"
          />
          <p className="mt-4 text-sm text-slate-400">Current Look</p>
        </div>

        <div className="lg:col-span-2 bg-slate-800/50 p-4 rounded-lg border border-slate-700 shadow-md">
          <Tabs defaultValue="outfits" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 bg-slate-700 border-slate-600">
              {tabCategories.map(cat => (
                 <TabsTrigger key={cat.value} value={cat.value} className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300 flex items-center justify-center">
                    {cat.icon} {cat.label}
                 </TabsTrigger>
              ))}
            </TabsList>
            {tabCategories.map(cat => (
                <TabsContent key={cat.value} value={cat.value}>
                    {renderItemList(cat.itemType)}
                </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagementScreen;