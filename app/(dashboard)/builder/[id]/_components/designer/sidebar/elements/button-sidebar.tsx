import { FormElement } from "@/components/form-elements";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

function SidebarButton({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerButtonElement;

  const draggable = useDraggable({
    id: `designer-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerButtonElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2.5 h-[100px] w-[100px] cursor-grab hover:border-purple800 hover:text-purple800 dark:hover:border-purple500 dark:hover:text-purple500 hover:bg-background",
        draggable.isDragging && "ring-2 ring-purple800 dark:ring-pruple500"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {/* {icon} */}
      <Icon className=" h-5 w-5 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export function SidebarButtonDragOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2.5 h-[100px] w-[100px] cursor-grab hover:border-purple800 hover:text-purple800 dark:hover:border-purple500 dark:hover:text-purple500 hover:bg-background"
    >
      {/* {icon} */}
      <Icon className=" h-5 w-5 cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}

export default SidebarButton;
