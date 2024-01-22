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
import { Form } from "@prisma/client";
import { Label } from "./ui/label";

export const FormsSearchCommand = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const { toggle, isOpen, onClose } = useSearch();

  const [forms, setForms] = useState<Form | any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const formsData = await GetFormsSearch();
      setForms(formsData);
    };

    fetchData();
  }, []); // Run once on mount

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: number, published: boolean) => {
    if (published) {
      router.push(`/forms/${id}`);
      onClose();
    } else {
      router.push(`/builder/${id}`);
      onClose();
    }
  };

  if (!isMounted) {
    return null; // prevent hydration errors
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder={"Search forms"} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Forms">
          {forms?.map((form: Form) => (
            <CommandItem
              key={form.id}
              value={`${form.id}-${form.name}`}
              title={form.name}
              onSelect={() => {
                onSelect(form.id, form.published);
              }}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex flex-row items-center space-x-0.5">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <span>{form.name}</span>
              </div>
              {!form.published && (
                <Label className="bg-[#ECEBE9] text-[#635C52] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] px-1.5 py-0.5 rounded-full text-xs font-normal">
                  Draft
                </Label>
              )}
              {form.published && (
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
