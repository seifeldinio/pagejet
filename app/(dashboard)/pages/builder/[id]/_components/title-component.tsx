"use client";

import { useEffect, useRef, useState } from "react";
import { GetPageByIdForBuilder, UpdatePage } from "@/actions/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Page } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageDesignerContext } from "@/context/page-designer-context";

export default function TitleComponent({ initialData }: { initialData: Page }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  // const [editedTitle, setEditedTitle] = useState(
  //   initialData.title || "Untitled"
  // );

  const { title, setTitle } = usePageDesignerContext();

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    // To focus on the input
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  //   If the user presses enter then we'll save the title
  const onKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        await UpdatePage({
          id: initialData.id,
          title: title || "Untitled",
        });
        disableInput();
        toast({
          title: "Title saved! 🙌",
        });
      } catch (error) {
        toast({
          title: "Error!",
          description: "Something went wrong.",
        });
        // Handle errors if needed
      } finally {
        disableInput();
      }
    }
  };

  //   const handleSaveClick = () => {
  //     UpdatePage({ id: initialData.id, title: editedTitle });
  //     setIsEditing(false);
  //   };

  useEffect(() => {
    setTitle(initialData.title);
  }, [initialData.title]);

  if (initialData === undefined) {
    return <TitleComponent.Skeleton />;
  }

  return (
    <div className="flex items-center gap-x-1">
      <p>{initialData?.icon}</p>

      {isEditing ? (
        <>
          <Input
            ref={inputRef}
            onClick={enableInput}
            onBlur={disableInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={title}
            className="h-7 px-2 w-fit mr-2.5 focus-visible:ring-transparent"
          />
          {/* <Button
            onClick={handleSaveClick}
            variant="ghost"
            size="sm"
            className="h-auto p-1"
          >
            Save
          </Button> */}
        </>
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="h-auto py-1 px-1 w-fit ml-1.5 mr-2.5"
        >
          <h2 className="truncate font-medium">{title}</h2>
        </Button>
      )}
    </div>
  );
}

TitleComponent.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-6 w-16 rounded-lg mr-2.5" />;
};
