"use client";

import { Input } from "@/components/ui/input";
import { useSearch } from "@/context/form-search-context";
import { usePageSearch } from "@/context/page-search-context";
import { Search } from "lucide-react";

export function SearchInput({
  searchForms,
  searchPages,
}: {
  searchForms?: boolean;
  searchPages?: boolean;
}) {
  const { toggle } = useSearch();
  const { toggle: pagesToggle } = usePageSearch();

  return (
    <div
      onClick={() => {
        if (searchForms) {
          toggle();
        } else {
          pagesToggle();
        }
      }}
      className="h-[36px] w-[260px] bg-background/95 "
    >
      <div className="flex flex-row items-center relative h-[36px] w-[260px] ">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground " />
        <Input
          placeholder="Search"
          className="pl-8 rounded-lg focus-visible:ring-none"
        />
        <kbd className="absolute right-2 top-2.5 ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span> {searchForms && "F"}{" "}
          {searchPages && "P"}
        </kbd>
      </div>
    </div>
  );
}
