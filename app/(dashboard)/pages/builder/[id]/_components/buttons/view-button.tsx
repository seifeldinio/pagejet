"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrigin } from "@/hooks/use-origin";

const ViewButton = ({ url }: { url: string }) => {
  const origin = useOrigin();

  const shareUrl = `${origin}/live/${url}`;

  if (!origin) {
    return <Skeleton className="h-3 w-8" />;
  }

  return (
    <>
      <Button
        onClick={() => {
          window.open(shareUrl, "_blank");
        }}
        size="sm"
        variant="green"
        className="space-x-1"
      >
        <ExternalLink className="h-4 w-auto" />
        <span>View</span>
      </Button>
    </>
  );
};

export default ViewButton;
