"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

export function ModeToggle() {
  const { setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const currentPage = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // to avoid rehyrdration errors

  // Check if the current pathname includes 'builder'
  const isBuilderPage = currentPage.includes("builder");
  const isSubmitPage = currentPage.includes("submit");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={isBuilderPage || isSubmitPage ? "outline" : "outlineNavbar"}
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
