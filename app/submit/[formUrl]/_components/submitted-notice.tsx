"use client";

import React, { useEffect, useState } from "react";
import Footer from "./footer";
import { Button } from "@/components/ui/button";

function SubmittedNotice({ formName }: { formName: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // To Avoid window not defined error
  }
  return (
    <div className="flex flex-col w-full h-full items-center p-8">
      <div className="pb-4 border-b border-muted w-full max-w-[620px]">
        <h1 className="text-2xl font-bold">{formName}</h1>
        <p className="text-muted-foreground">
          Your response has been recorded.
        </p>
        <Button
          size="sm"
          variant="outline"
          className="mt-2"
          onClick={() => {
            window.location.reload();
          }}
        >
          Submit another response
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default SubmittedNotice;
