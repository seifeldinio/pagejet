"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePageDesignerContext } from "@/context/page-designer-context";
import { Page } from "@prisma/client";
import Cover from "@/components/cover";
import Toolbar from "@/components/toolbar";
import ErrorPage from "@/components/error";
import NotFound from "@/components/not-found";

function LivePage({ page }: { page: Page }) {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const { coverImage, setCoverImage, setContent } = usePageDesignerContext();

  const onChange = async (content: string) => {
    setContent(content);
  };

  useEffect(() => {
    setCoverImage(page.coverImage || "");
    setContent(page.content || "");
  }, [page.coverImage]);

  if (page === undefined) {
    return (
      <div className="flex flex-col w-full h-full">
        <Cover.Skeleton />
        <div className="flex flex-col max-w-4xl mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (page === null) {
    return <NotFound />;
  }

  return (
    <div className="pb-40 w-full dark:dark:bg-[#1F1F1F]">
      <Cover preview url={coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={page} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={page.content}
        />
        <div className="h-40" />
      </div>
    </div>
  );
}

export default LivePage;
