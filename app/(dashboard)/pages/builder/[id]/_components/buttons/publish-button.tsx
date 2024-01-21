"use client";

import { PublishForm, UpdateFormContent } from "@/actions/form";
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
import useDesigner from "@/hooks/use-designer";
import { Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const PublishButton = ({ id }: { id: number }) => {
  const router = useRouter();

  const { elements } = useDesigner();

  const [loading, startTransition] = useTransition();

  async function publishForm() {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      await PublishForm(id);
      toast({
        title: "🎉 Published!",
        description: "Your form is now accessible to the public.",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="green" className="space-x-1">
          {/* <Check className="h-4 w-auto" /> */}
          <span>Publish</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure? ✋</AlertDialogTitle>
          <AlertDialogDescription>
            Publishing makes this form live and ready to collect submissions.
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
              startTransition(publishForm);
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

export default PublishButton;
