import { GetFormWithSubmissions } from "@/actions/form";
import { ElementsType, FormElementInstance } from "@/components/form-elements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import React from "react";
import RowCell from "./row-cell";
import { Separator } from "@/components/ui/separator";

type Row = { [key: string]: string } & {
  submittedAt: Date;
};

async function TableSubmissions({ id }: { id: number }) {
  const form = await GetFormWithSubmissions(id);

  if (!form) {
    throw new Error("Form not found.");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextInput":
      case "Number":
      case "TextArea":
      case "DatePicker":
      case "Select":
      case "Checkbox":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];

  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);

    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <div className="flex flex-col mb-10">
      <div className="flex flex-row items-center space-x-2">
        <h2 className="text-3xl font-bold">Submissions</h2>
        <span className="flex items-center justify-center text-[#524a3ecd] bg-[#a59e922f] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] py-1 px-2 text-sm rounded-full">
          {form.FormSubmissions.length}
        </span>
      </div>
      <Separator className="mt-4" />
      <div className="py-5">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <>
                    <TableHead key={column.id}>{column.label}</TableHead>
                  </>
                ))}
                <TableHead className="text-muted-foreground text-right ">
                  Submitted at
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <RowCell
                      key={column.id}
                      type={column.type}
                      value={row[column.id]}
                    />
                  ))}
                  <TableCell className="text-muted-foreground text-right">
                    {formatDistance(row.submittedAt, new Date(), {
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default TableSubmissions;
