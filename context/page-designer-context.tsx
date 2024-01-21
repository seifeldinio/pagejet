"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PageDesignerContextType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  icon: string;
  setIcon: Dispatch<SetStateAction<string>>;
  coverImage: string;
  setCoverImage: Dispatch<SetStateAction<string>>;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  // Add other properties as needed
};

const PageDesignerContext = createContext<PageDesignerContextType | null>(null);

export const PageDesignerContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [title, setTitle] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <PageDesignerContext.Provider
      value={{
        title,
        setTitle,
        icon,
        setIcon,
        coverImage,
        setCoverImage,
        content,
        setContent,
      }}
    >
      {children}
    </PageDesignerContext.Provider>
  );
};

export const usePageDesignerContext = () => {
  const context = useContext(PageDesignerContext);
  if (!context) {
    throw new Error(
      "usePageDesignerContext must be used within a PageDesignerContextProvider"
    );
  }
  return context;
};
