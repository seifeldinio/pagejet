"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

function CopyButton({ shareUrl }: { shareUrl: string }) {
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
      size="sm"
      variant="outline"
      className="space-x-1"
      onClick={() => {
        navigator.clipboard.writeText(link);
        toast({
          title: "Copied! 📋",
          description: "Link copied to clipboard.",
        });
      }}
    >
      <Copy className="h-4 w-auto" />
      <span>Copy link</span>
    </Button>
  );
}

export default CopyButton;
