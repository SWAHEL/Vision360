// src/App.tsx
import { StrictMode, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";              // <- Your DGILayout (GraphVisualization in the center)
import Timeline from "./pages/Timeline";
import SearchPage from "./pages/SearchPage";
import WatchLists from "./pages/WatchLists";
import WatchListDetails from "./pages/WatchListDetails";
import NotFound from "./pages/NotFound";

// Optional: code-split the graph playground if you add it
const GraphPage = lazy(() => import("./pages/GraphPage"));

const queryClient = new QueryClient();

export default function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Toast systems (both can live at root) */}
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Suspense fallback={<div style={{ padding: 16 }}>Loading…</div>}>
              <Routes>
                {/* Main app layout with the real D3 graph in the center */}
                <Route path="/" element={<Index />} />

                {/* Extra routes */}
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/watchlists" element={<WatchLists />} />
                <Route path="/watchlists/:id" element={<WatchListDetails />} />

                {/* Optional: standalone graph playground */}
                <Route path="/graph" element={<GraphPage />} />

                {/* Keep this last */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
