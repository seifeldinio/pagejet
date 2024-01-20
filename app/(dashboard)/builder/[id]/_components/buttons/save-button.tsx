import { UpdateFormContent } from "@/actions/form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import useDesigner from "@/hooks/use-designer";
import { Loader2, Save } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";

const SaveButton = ({ id }: { id: number }) => {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // To Avoid window not defined error
  }

  const updateFormContent = async () => {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      toast({
        title: "🙌 Saved!",
        description: "Changes has been saved.",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className="space-x-1"
      disabled={loading}
      onClick={() => {
        startTransition(updateFormContent);
      }}
    >
      <Save className="h-4 w-auto" />
      <span>Save</span>
      {loading && <Loader2 className="w-4 h-auto animate-spin" />}
    </Button>
  );
};

export default SaveButton;
