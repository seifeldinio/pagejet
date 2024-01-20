import React from "react";
import SidebarButton from "./button-sidebar";
import { FormElements } from "@/components/form-elements";

function ElementsSidebar() {
  return (
    <div>
      <p className="text-[#8B8B8B] text-xs mb-[18px] font-light">
        💡 Drag & drop elements
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center ">
        <p className="text-sm font-semibold col-span-1 md:col-span-2 mb-1.5 place-self-start">
          Layout elements
        </p>
        <SidebarButton formElement={FormElements.Title} />
        <SidebarButton formElement={FormElements.Subtitle} />
        <SidebarButton formElement={FormElements.Paragraph} />
        <SidebarButton formElement={FormElements.Separator} />
        <SidebarButton formElement={FormElements.Spacer} />
        <p className="text-sm font-semibold col-span-1 md:col-span-2 mb-1.5 mt-[18px] place-self-start">
          Form elements
        </p>
        <SidebarButton formElement={FormElements.TextInput} />
        <SidebarButton formElement={FormElements.Number} />
        <SidebarButton formElement={FormElements.TextArea} />
        <SidebarButton formElement={FormElements.DatePicker} />
        <SidebarButton formElement={FormElements.Select} />
        <SidebarButton formElement={FormElements.Checkbox} />
      </div>
    </div>
  );
}

export default ElementsSidebar;
