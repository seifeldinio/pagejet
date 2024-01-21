"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

type CoverImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

// type CoverImageContextType = {
//   state: CoverImageStore;
//   setState: Dispatch<SetStateAction<CoverImageStore>>;
// };

export const CoverImageContext = createContext<CoverImageStore | undefined>(
  undefined
);

export const CoverImageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<any>({
    url: undefined,
    isOpen: false,
    onOpen: () =>
      setState((prev: any) => ({ ...prev, isOpen: true, url: undefined })),
    onClose: () =>
      setState((prev: any) => ({ ...prev, isOpen: false, url: undefined })),
    onReplace: (url: string) =>
      setState((prev: any) => ({ ...prev, isOpen: true, url })),
  });

  return (
    <CoverImageContext.Provider value={state}>
      {children}
    </CoverImageContext.Provider>
  );
};

export const useCoverImage = () => {
  const context = useContext(CoverImageContext);
  if (!context) {
    throw new Error("useCoverImage must be used within a CoverImageProvider");
  }
  return context;
};
