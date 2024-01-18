import React from "react";
import { FormElements } from "@/components/form-elements";
import useDesigner from "@/hooks/use-designer";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function PropertiesSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button
          size="icon"
          className="h-8 w-8"
          variant="ghost"
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="mt-2 mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default PropertiesSidebar;
