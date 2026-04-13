import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";
import { DarkModeProvider } from "@/context/DarkModeContext";

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.2 });

const queryClient = new QueryClient();

function PageLoader() {
  useEffect(() => {
    NProgress.start();
    const t = setTimeout(() => NProgress.done(), 600);
    return () => clearTimeout(t);
  }, []);
  return null;
}

function Layout() {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <motion.div
        animate={{ marginLeft: isExpanded ? 224 : 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pt-14"
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DarkModeProvider>
          <SidebarProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <PageLoader />
              <Layout />
            </WouterRouter>
          </SidebarProvider>
        </DarkModeProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
