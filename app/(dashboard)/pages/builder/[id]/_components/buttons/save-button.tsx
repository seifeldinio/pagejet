"use client";

import { UpdateFormContent } from "@/actions/form";
import { UpdatePage } from "@/actions/page";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { usePageDesignerContext } from "@/context/page-designer-context";
import useDesigner from "@/hooks/use-designer";
import { Loader2, Save } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";

const SaveButton = ({ id }: { id: number }) => {
  const { content } = usePageDesignerContext();

  const [loading, startTransition] = useTransition();

  const [mounted, setMounted] = useState(false);

  const save = async () => {
    try {
      await UpdatePage({ id: id, content });
      toast({
        title: "Saved! 🙌",
        //  description: "",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while saving.",
      });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // To Avoid window not defined error
  }

  return (
    <Button
      onClick={() => {
        startTransition(save);
      }}
      size="sm"
      variant="outline"
      className="space-x-1"
      disabled={loading}
    >
      <Save className="h-4 w-auto" />
      <span>Save</span>
      {loading && <Loader2 className="w-4 h-auto animate-spin" />}
    </Button>
  );
};

export default SaveButton;
