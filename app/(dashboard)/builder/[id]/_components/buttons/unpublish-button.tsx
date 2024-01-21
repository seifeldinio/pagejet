import { PublishForm, UnpublishForm, UpdateFormContent } from "@/actions/form";
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
import { useEffect, useState, useTransition } from "react";

const UnpublishButton = ({ id }: { id: number }) => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  const { elements } = useDesigner();

  const [loading, startTransition] = useTransition();

  async function unpublishForm() {
    try {
      const jsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, jsonElements);
      await UnpublishForm(id);
      toast({
        title: "Unpublished!",
        description: "Your form is now a draft.",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
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
            This form will turn to draft.
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
              startTransition(unpublishForm);
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
