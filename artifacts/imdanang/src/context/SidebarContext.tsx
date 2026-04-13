import { createContext, useContext, useState } from "react";

interface SidebarContextType {
  isExpanded: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isExpanded: false,
  toggle: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => setIsExpanded((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
