import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { RecordingProvider } from "@/contexts/RecordingContext";
import Index from "./pages/marketing/Index";
import Privacy from "./pages/marketing/Privacy";
import Terms from "./pages/marketing/Terms";
import Pricing from "./pages/marketing/Pricing";
import Enterprise from "./pages/marketing/Enterprise";
import Blog from "./pages/marketing/Blog";
import AINoteTaker from "./pages/marketing/AINoteTaker";
import Explore from "./pages/marketing/Explore";
import Startups from "./pages/marketing/Startups";
import Security from "./pages/marketing/Security";
import SalesCase from "./pages/marketing/SalesCase";
import ProductCase from "./pages/marketing/ProductCase";
import Contact from "./pages/marketing/Contact";

import Auth from "./pages/saas/Auth";
import Chat from "./pages/marketing/Chat";
import Home from "./pages/saas/Home";
import Meetings from "./pages/saas/Meetings";
import Templates from "./pages/saas/Templates";
import Drafts from "./pages/saas/Drafts";
import Settings from "./pages/saas/Settings";
import NotFound from "./pages/marketing/NotFound";
import SharedWithMe from "./pages/saas/SharedWithMe";
import Chatt from "./pages/saas/Chatt";
import MyNotes from "./pages/saas/MyNotes";
import People from "./pages/saas/People";
import Recipe from "./pages/saas/Recipe";
import FolderView from "./pages/saas/FolderView";
import LoopPreview from "./pages/saas/LoopPreview";
import ChatPreview from "./pages/saas/ChatPreview";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <RecordingProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/enterprise" element={<Enterprise />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/ai-note-taker" element={<AINoteTaker />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/security" element={<Security />} />
            
            {/* Use Case Routes */}
            <Route path="/use-cases/sales" element={<SalesCase />} />
            <Route path="/use-cases/product" element={<ProductCase />} />
            <Route path="/use-cases/ai-note-taker" element={<AINoteTaker />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected SaaS Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/drafts" element={<Drafts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/shared-with-me" element={<SharedWithMe />} />
                <Route path="/chatt" element={<Chatt />} />
                <Route path="/my-notes" element={<MyNotes />} />
                <Route path="/people" element={<People />} />
                <Route path="/recipe" element={<Recipe />} />
                <Route path="/folder/:folderId" element={<FolderView />} />
                <Route path="/chat-preview" element={<ChatPreview />} />
              </Route>
              
              {/* LoopPreview is standalone (no sidebar) but still protected */}
              <Route path="/loop/:id" element={<LoopPreview />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </RecordingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
