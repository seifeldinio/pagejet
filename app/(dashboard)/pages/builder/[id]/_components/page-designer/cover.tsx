"use client";

import { RemoveCoverImage } from "@/actions/page";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useCoverImage } from "@/context/cover-image-context";
import { usePageDesignerContext } from "@/context/page-designer-context";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

interface CoverImageProps {
  url?: string | null;
  preview?: boolean;
}

export default function Cover({ url, preview }: CoverImageProps) {
  const { edgestore } = useEdgeStore();

  const params = useParams();

  const { setCoverImage } = usePageDesignerContext();
  const { onReplace } = useCoverImage();

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }

    try {
      await RemoveCoverImage(Number(params.id));
      setCoverImage("");
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong.",
      });
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-[35vh] group ",
        !url && "h-[4vh]",
        url && "bg-muted"
      )}
    >
      {!!url && <Image src={url} fill alt="Cover" className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => {
              onReplace(url);
            }}
            className="text-xs"
            size="sm"
          >
            <UploadCloud className="h-4 w-4 mr-1.5" />
            <span>Change cover</span>
          </Button>
          <Button
            onClick={onRemove}
            className="text-xs"
            size="sm"
            variant="outline"
          >
            <span>Remove</span>
          </Button>
        </div>
      )}
    </div>
  );
}

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
