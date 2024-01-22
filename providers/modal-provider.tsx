"use client";

import { useEffect, useState } from "react";
import CoverImageModal from "@/components/modals/cover-image-modal";
import PageAnalyticsModal from "@/components/modals/page-analytics-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CoverImageModal />
    </>
  );
};
