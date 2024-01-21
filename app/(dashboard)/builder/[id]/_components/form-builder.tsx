"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useDesigner from "@/hooks/use-designer";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Form } from "@prisma/client";
import { ArrowLeft, FileBarChart2, Globe2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PreviewButton from "./buttons/preview-button";
import PublishButton from "./buttons/publish-button";
import SaveButton from "./buttons/save-button";
import Designer from "./designer/designer";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import Loading from "@/components/loading";
import UnpublishButton from "./buttons/unpublish-button";

function FormBuilder({ form }: { form: Form }) {
  const router = useRouter();

  // To get the saved form content and update the state
  const { setElements, setSelectedElement } = useDesigner();

  // State to make sure the form is ready
  const [isReady, setIsReady] = useState(false);

  // To distinguish between drag and click events
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px -> activate drag event when we drag for at least 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  // Get the saved form content
  useEffect(() => {
    if (isReady) return;
    const elements = JSON.parse(form.content);
    setElements(elements);
    setSelectedElement(null);
    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, setElements, setSelectedElement]);

  if (!isReady) {
    return <Loading />;
  }

  // // If the form is published
  // const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  // if (form.published) {
  //   return <PublishedNotice shareUrl={shareUrl} id={form.id} />;
  // }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full ">
        {/* Nav */}
        <nav className="flex justify-between border-b-2 px-4 py-3 gap-3 items-center ">
          <div className="flex flex-row items-center">
            <Button
              size="icon"
              className="h-8 w-8 rounded-full"
              variant="ghost"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="truncate font-medium ml-1.5 mr-2.5">{form.name}</h2>
            {!form.published && (
              <Label className="bg-[#ECEBE9] text-[#635C52] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] px-1.5 py-0.5 rounded-full text-xs font-normal">
                Draft
              </Label>
            )}
            {form.published && (
              <Label className="bg-green500 text-black dark:bg-green500/90  px-1.5 py-0.5 rounded-full text-xs font-normal">
                Published
              </Label>
            )}
          </div>
          <div className="flex items-center gap-3">
            <PreviewButton />
            <SaveButton id={form.id} />
            {!form.published && (
              <>
                <PublishButton id={form.id} />
              </>
            )}
            {form.published && (
              <>
                <UnpublishButton id={form.id} />
              </>
            )}
          </div>
        </nav>
        {/* Editor */}
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/grid.svg)] dark:bg-[url(/grid-dark.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
