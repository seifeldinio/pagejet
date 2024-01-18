"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

function ViewButton({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // To Avoid window not defined error
  }

  const link = `${window.location.origin}/submit/${shareUrl}`;

  return (
    <Button
      onClick={() => {
        window.open(link, "_blank");
      }}
      size="sm"
      className="space-x-1"
    >
      <ExternalLink className="h-4 w-auto" />
      <span>View</span>
    </Button>
  );
}

export default ViewButton;
