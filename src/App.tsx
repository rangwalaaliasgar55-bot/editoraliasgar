import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ClientsList from "./pages/ClientsList";
import ClientForm from "./pages/ClientForm";
import ClientProfile from "./pages/ClientProfile";
import ProjectsList from "./pages/ProjectsList";
import ProjectForm from "./components/ProjectForm";
import ProjectDetail from "./pages/ProjectDetail";
import AIAssistant from "./pages/AIAssistant";
import Invoices from "./pages/Invoices";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* All admin pages share the sidebar/topbar shell via AdminLayout */}
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />

            {/* Client Management Routes */}
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/clients/new" element={<ClientForm />} />
            <Route path="/clients/:id" element={<ClientProfile />} />
            <Route path="/clients/:id/edit" element={<ClientForm />} />

            {/* Project Management Routes */}
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/projects/:id/edit" element={<ProjectForm />} />

            {/* Finance & Ops */}
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/ai" element={<AIAssistant />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;