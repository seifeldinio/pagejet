"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "@/context/cover-image-context";
import { useEdgeStore } from "@/lib/edgestore";
import { UpdatePage } from "@/actions/page";
import { useParams } from "next/navigation";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { usePageDesignerContext } from "@/context/page-designer-context";

function CoverImageModal() {
  const params = useParams();

  const [file, setFile] = useState<File>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { url, isOpen, onClose, onReplace } = useCoverImage();

  const { setCoverImage } = usePageDesignerContext();

  const { edgestore } = useEdgeStore();

  const clear = () => {
    setFile(undefined);
    setIsSubmitting(false);
    onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: url,
        },
      });

      await UpdatePage({ id: Number(params.id), coverImage: res.url });

      setCoverImage(res.url);

      clear();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="font-semibold text-lg">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
}

export default CoverImageModal;
