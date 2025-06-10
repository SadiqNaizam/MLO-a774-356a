import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthenticationScreen from "./pages/AuthenticationScreen";
import MainLobbyScreen from "./pages/MainLobbyScreen";
import MatchmakingStatusScreen from "./pages/MatchmakingStatusScreen";
import InventoryManagementScreen from "./pages/InventoryManagementScreen";
import PostMatchSummaryScreen from "./pages/PostMatchSummaryScreen";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationScreen />} />
          <Route path="/main-lobby" element={<MainLobbyScreen />} />
          <Route path="/matchmaking-status" element={<MatchmakingStatusScreen />} />
          <Route path="/inventory-management" element={<InventoryManagementScreen />} />
          <Route path="/post-match-summary" element={<PostMatchSummaryScreen />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;