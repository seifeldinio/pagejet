import { ElementsType } from "@/components/form-elements";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import React, { ReactNode } from "react";

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  // Checking the type and based on it we'll show a different UI component in the cell
  // switch (type) {
  //   case "DateField":
  //     if (!value) break;
  //     const date = new Date(value);
  //     node = <Badge variant="outline">{format(date, "dd/MM/yyyy")}</Badge>;
  //     break;
  //   case "CheckboxField":
  //     const checked = value === "true" ? true : false;
  //     node = <Checkbox checked={checked} disabled />;
  //     break;
  //   default:
  //     break;
  // }

  return <TableCell>{node}</TableCell>;
}

export default RowCell;
