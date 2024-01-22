"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type PagesSearchContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
};

const PageSearchContext = createContext<PagesSearchContextType | undefined>(
  undefined
);

interface PagesSearchProviderProps {
  children: ReactNode;
}

export const PagesSearchProvider: React.FC<PagesSearchProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const value: PagesSearchContextType = {
    isOpen,
    onOpen,
    onClose,
    toggle,
  };

  return (
    <PageSearchContext.Provider value={value}>
      {children}
    </PageSearchContext.Provider>
  );
};

export const usePageSearch = () => {
  const context = useContext(PageSearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
