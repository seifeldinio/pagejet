import React from "react";
import SidebarButton from "./button-sidebar";
import { FormElements } from "@/components/form-elements";

function ElementsSidebar() {
  return (
    <div>
      Elements
      <SidebarButton formElement={FormElements.TextInput} />
    </div>
  );
}

export default ElementsSidebar;
