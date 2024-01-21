"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Page } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PreviewButton from "./buttons/preview-button";
import SaveButton from "./buttons/save-button";
import PublishButton from "./buttons/publish-button";
import TitleComponent from "./title-component";
import BackButton from "@/components/back-button";
import PageDesigner from "./page-designer/page-designer";
import Loading from "../loading";

function PageBuilder({ page }: { page: Page }) {
  // State to make sure the page is ready
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) return;

    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [page]);

  if (!isReady) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col w-full ">
      {/* Nav */}
      <nav className="flex justify-between border-b-2 px-4 py-3 gap-3 items-center ">
        <div className="flex flex-row items-center">
          <BackButton />
          <TitleComponent initialData={page} />
          {!page.isPublished && (
            <Label className="bg-[#ECEBE9] text-[#635C52] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] px-1.5 py-0.5 rounded-full text-xs font-normal">
              Draft
            </Label>
          )}
          {page.isPublished && (
            <Label className="bg-green500 text-black dark:bg-green500/90  px-1.5 py-0.5 rounded-full text-xs font-normal">
              Published
            </Label>
          )}
        </div>
        <div className="flex items-center gap-3">
          <PreviewButton />
          {!page.isPublished && (
            <>
              <SaveButton id={page.id} />
              <PublishButton id={page.id} />
            </>
          )}
        </div>
      </nav>
      {/* Editor */}
      <div className="flex w-full flex-grow relative overflow-y-auto h-[200px] dark:bg-[#1F1F1F]">
        <PageDesigner page={page} />
      </div>
    </main>
  );
}

export default PageBuilder;
