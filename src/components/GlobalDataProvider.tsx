"use client";

import { createContext, useContext, ReactNode } from "react";
import { ApiSettings, ApiEducationItem, ApiDesignationItem } from "@/lib/api";

interface GlobalDataContextType {
  settings: ApiSettings;
  educations: ApiEducationItem[];
  designations: ApiDesignationItem[];
}

const GlobalDataContext = createContext<GlobalDataContextType | null>(null);

export function GlobalDataProvider({
  children,
  settings,
  educations,
  designations,
}: {
  children: ReactNode;
  settings: ApiSettings;
  educations: ApiEducationItem[];
  designations: ApiDesignationItem[];
}) {
  return (
    <GlobalDataContext.Provider value={{ settings, educations, designations }}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export function useGlobalData() {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider");
  }
  return context;
}
