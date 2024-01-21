"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton() {
  const router = useRouter();

  return (
    <Button
      size="icon"
      className="h-8 w-8 rounded-full"
      variant="ghost"
      onClick={() => {
        router.back();
      }}
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}

export default BackButton;
