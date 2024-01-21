import { DeletePage } from "@/actions/page";
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
import { Loader2 } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";

function DeleteForeverButton({ pageId }: { pageId: number }) {
  //   const [mounted, setMounted] = useState(false);

  const [loading, startTransition] = useTransition();

  // Delete forever
  const deleteForeverPage = async () => {
    try {
      await DeletePage(pageId);
      toast({
        title: "Deleted forever!",
        description: "Page has been deleted.",
      });
      // router.replace("/pages");
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  //   if (!mounted) {
  //     return null; // To Avoid window not defined error
  //   }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          className="flex flex-row items-center space-x-1.5 w-full text-sm mt-2 cursor-pointer"
          asChild
        >
          <span>Delete forever</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure? ✋</AlertDialogTitle>
          <AlertDialogDescription>
            You will not be able to restore this page again.
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
            onClick={() => {
              startTransition(deleteForeverPage);
            }}
          >
            <span>Delete forever</span>
            {loading && <Loader2 className="w-4 h-auto animate-spin ml-1.5" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteForeverButton;
