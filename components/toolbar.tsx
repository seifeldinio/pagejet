"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { RemoveIcon, UpdatePage } from "@/actions/page";
import { IconPicker } from "@/components/icon-picker";
import { Button } from "@/components/ui/button";
import { Page } from "@prisma/client";
import { ImageIcon, SmileIcon, UploadCloud, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { usePageDesignerContext } from "@/context/page-designer-context";
import { useCoverImage } from "@/context/cover-image-context";
import CoverImageModal from "@/components/modals/cover-image-modal";

interface ToolbarProps {
  initialData: Page;
  preview?: boolean;
}

function Toolbar({ initialData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState(false);

  //   const [value, setValue] = useState(initialData.title);

  const {
    title,
    setTitle,
    icon,
    setIcon,
    coverImage,
    setCoverImage,
    content,
    setContent,
  } = usePageDesignerContext();

  const { onOpen } = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setTitle(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setTitle(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      UpdatePage({ id: initialData.id, title: title || "Untitled" });
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    console.log(icon);
    setIcon(icon);
    UpdatePage({
      id: initialData.id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    setIcon("");
    RemoveIcon(initialData.id);
  };

  useEffect(() => {
    setTitle(initialData.title);
    setIcon(initialData.icon || "");
    setCoverImage(initialData.coverImage || "");
    // setContent(initialData.content);
  }, [initialData.title, initialData.icon]);

  return (
    <>
      {/* {isOpen && <CoverImageModal />} */}
      <div className="pl-[54px] group relative">
        {!!icon && !preview && (
          <div className="flex items-center gap-x-2 group/icon pt-6">
            <IconPicker onChange={onIconSelect}>
              <p className="text-6xl hover:opacity-75 transition">{icon}</p>
            </IconPicker>
            <Button
              onClick={onRemoveIcon}
              className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
              variant="outline"
              size="icon"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!!icon && preview && <p className="text-6xl pt-6">{icon}</p>}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
          {!icon && !preview && (
            <IconPicker asChild onChange={onIconSelect}>
              <Button
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
              >
                <SmileIcon className="h-4 w-4 mr-2" />
                Add icon
              </Button>
            </IconPicker>
          )}
          {!coverImage && !preview && (
            <Button
              className="text-muted-foreground text-sm"
              variant="outline"
              size="sm"
              onClick={onOpen}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              <span>Add cover</span>
            </Button>
          )}
        </div>
        {isEditing && !preview ? (
          <TextareaAutosize
            ref={inputRef}
            onBlur={disableInput}
            onKeyDown={onKeyDown}
            value={title}
            onChange={(e) => onInput(e.target.value)}
            className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          />
        ) : (
          <div
            onClick={enableInput}
            className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          >
            {title}
          </div>
        )}
      </div>
    </>
  );
}

export default Toolbar;
