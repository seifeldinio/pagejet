"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function RecentlyDeletedButton() {
  const router = useRouter();

  return (
    <Button
      className="flex flex-row items-center space-x-1"
      variant="outline"
      size="sm"
      onClick={() => {
        router.push("/pages/recently-deleted");
      }}
    >
      <span>Recently deleted</span>
    </Button>
  );
}

export default RecentlyDeletedButton;
