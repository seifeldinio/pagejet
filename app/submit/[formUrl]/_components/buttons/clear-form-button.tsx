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
import React, { MouseEventHandler } from "react";

function ClearFormButton({
  onClick,
}: {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="outline" className="space-x-1">
          <span>Clear form</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure? ✋</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove your answers from all questions, and cannot be
            undone.
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
          <AlertDialogAction onClick={onClick}>Clear form</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ClearFormButton;
