import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import React, { useState } from "react";
import { SidebarButtonDragOverlay } from "./designer/sidebar/elements/button-sidebar";
import { ElementsType, FormElements } from "@/components/form-elements";
import useDesigner from "@/hooks/use-designer";

const DragOverlayWrapper = () => {
  // Get the elements from the designer context
  const { elements } = useDesigner();

  // save the dragged element in the state
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  //   custom node
  let node = <div>No drag overlay</div>;

  //   Check if we're dragging a button element
  const isSidebarButton = draggedItem?.data?.current?.isDesignerButtonElement;

  if (isSidebarButton) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarButtonDragOverlay formElement={FormElements[type]} />;
  }

  // Drag designer element in the canvas
  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;

  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;

    // To have a drag overlay that equals the actual dragged element
    const element = elements.find((el) => el.id === elementId);

    if (!element) node = <div>Element not found.</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      node = (
        <div className="flex bg-purple500 border rounded-lg h-[120px] w-full py-1 px-1 opacity-80 pointer pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
