import { FormElements } from "@/components/form-elements";
import React from "react";
import SidebarButton from "./elements/button-sidebar";
import useDesigner from "@/hooks/use-designer";
import ElementsSidebar from "./elements/elements-sidebar";
import PropertiesSidebar from "./properties/properties-sidebar";

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    // w-[400px]
    <aside className="w-[400px] max-w-[252px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {/* Elements sidebar */}
      {!selectedElement && <ElementsSidebar />}

      {/* Properties sidebar */}
      {selectedElement && <PropertiesSidebar />}
    </aside>
  );
}

export default DesignerSidebar;
