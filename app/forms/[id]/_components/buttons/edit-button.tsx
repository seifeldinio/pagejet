"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

function EditButton({ formId }: { formId: number }) {
  const router = useRouter();

  return (
    <Button
      size="icon"
      className="h-8 w-8"
      variant="outline"
      onClick={() => {
        router.push(`/builder/${formId}`);
      }}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}

export default EditButton;
