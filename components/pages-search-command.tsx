"use client";

import { GetFormsSearch } from "@/actions/form";
import { useSearch } from "@/context/form-search-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { File, FileSpreadsheet } from "lucide-react";
import { Form, Page } from "@prisma/client";
import { Label } from "./ui/label";
import { GetPagesSearch } from "@/actions/page";
import { usePageSearch } from "@/context/page-search-context";

export const PagesSearchCommand = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const { toggle, isOpen, onClose } = usePageSearch();

  const [pages, setPages] = useState<Page | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const pagesData = await GetPagesSearch();
      setPages(pagesData);
    };

    fetchData();
  }, []); // Run once on mount

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "p" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: number) => {
    router.push(`pages/builder/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null; // prevent hydration errors
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={"Search pages"} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {pages?.map((page: Page) => (
            <CommandItem
              key={page.id}
              value={`${page.id}-${page.title}`}
              title={page.title}
              onSelect={() => {
                onSelect(page.id);
              }}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex flex-row items-center space-x-0.5">
                {page.icon && <span className="mr-2">{page.icon}</span>}
                {!page.icon && <File className="mr-2 h-4 w-4" />}
                <span>{page.title}</span>
              </div>
              {!page.isPublished && (
                <Label className="bg-[#ECEBE9] text-[#635C52] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] px-1.5 py-0.5 rounded-full text-xs font-normal">
                  Draft
                </Label>
              )}
              {page.isPublished && (
                <Label className="bg-green500 text-black dark:bg-green500/90  px-1.5 py-0.5 rounded-full text-xs font-normal">
                  Published
                </Label>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
