import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";

import Sites from "./pages/Sites";
import Program from "./pages/Program";
import Designs from "./pages/Designs";
import Analytics from "./pages/Analytics";
import Cost from "./pages/Cost";
import Tour from "./pages/Tour";
import Deliverables from "./pages/Deliverables";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<AppLayout />}>
            
            <Route path="/sites" element={<Sites />} />
            <Route path="/program" element={<Program />} />
            <Route path="/designs" element={<Designs />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/cost" element={<Cost />} />
            <Route path="/tour" element={<Tour />} />
            <Route path="/deliverables" element={<Deliverables />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
