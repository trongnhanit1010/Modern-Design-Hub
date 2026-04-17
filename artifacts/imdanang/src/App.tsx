import { useEffect, useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Hotels from "@/pages/Hotels";
import HotelDetail from "@/pages/HotelDetail";
import TouristMapPage from "@/pages/TouristMapPage";
import Destinations from "@/pages/Destinations";
import DestinationDetail from "@/pages/DestinationDetail";
import Restaurants from "@/pages/Restaurants";
import Transport from "@/pages/Transport";
import Events from "@/pages/Events";
import Shopping from "@/pages/Shopping";
import AIAssistant from "@/pages/AIAssistant";
import WeatherDetail from "@/pages/WeatherDetail";
import LocalFood from "@/pages/LocalFood";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import BackToTopButton from "@/components/layout/BackToTopButton";
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
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      <BottomNav />
      <BackToTopButton />
      <motion.div
        animate={{ marginLeft: isMobile ? 0 : isExpanded ? 224 : 60 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pt-14 pb-16 md:pb-0"
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/luu-tru-khach-san" component={Hotels} />
          <Route path="/luu-tru-khach-san/:slug" component={HotelDetail} />
          <Route path="/ban-do" component={TouristMapPage} />
          <Route path="/destinations/:slug" component={DestinationDetail} />
          <Route path="/destinations" component={Destinations} />
          <Route path="/restaurants" component={Restaurants} />
          <Route path="/mon-ngon" component={LocalFood} />
          <Route path="/transport" component={Transport} />
          <Route path="/events" component={Events} />
          <Route path="/shopping" component={Shopping} />
          <Route path="/ai" component={AIAssistant} />
          <Route path="/thoi-tiet/:slug" component={WeatherDetail} />
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
