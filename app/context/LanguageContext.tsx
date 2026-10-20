"use client";

import React, { createContext, useContext } from "react";
import { Language, translations } from "../utils/translations";

// O site está só em português. A versão em inglês foi desativada, mas os
// textos continuam em translations.ts caso ela volte um dia.
const LANGUAGE: Language = "PT";

interface LanguageContextType {
  language: Language;
  t: typeof translations.PT;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const t = translations[LANGUAGE];

  return (
    <LanguageContext.Provider value={{ language: LANGUAGE, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de um LanguageProvider");
  }
  return context;
}
