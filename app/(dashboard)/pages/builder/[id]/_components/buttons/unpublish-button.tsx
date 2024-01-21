"use client";

import { PublishForm, UpdateFormContent } from "@/actions/form";
import { UpdatePage } from "@/actions/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { usePageDesignerContext } from "@/context/page-designer-context";
import useDesigner from "@/hooks/use-designer";
import { useOrigin } from "@/hooks/use-origin";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

const UnpublishButton = ({ id }: { id: number }) => {
  // const origin = useOrigin();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // const { elements } = useDesigner();

  const { title, icon, coverImage, content } = usePageDesignerContext();

  const [loading, startTransition] = useTransition();

  async function publishPage() {
    try {
      await UpdatePage({
        id: id,
        title: title,
        icon: icon,
        coverImage: coverImage,
        content: content,
        isPublished: false,
      });
      toast({
        title: "Unpublished!",
        description: "Your page is now a draft.",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "default",
      });
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="space-x-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        >
          {/* <Check className="h-4 w-auto" /> */}
          <span>Unpublish</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure? ✋</AlertDialogTitle>
          <AlertDialogDescription>
            This page will turn to draft.
            {/* <span 
            className="font-medium">
              Publishing makes this form live and ready to collect submissions.
            </span> */}
            {/* <br />
            Once published, this form cannot be edited. */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishPage);
            }}
          >
            <span>Continue</span>
            {loading && <Loader2 className="w-4 h-auto animate-spin ml-1.5" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnpublishButton;
