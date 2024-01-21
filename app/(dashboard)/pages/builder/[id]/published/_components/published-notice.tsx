"use client";

import React from "react";
import { ArrowLeft, FileBarChart2, Globe2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { useOrigin } from "@/hooks/use-origin";
import Loading from "@/components/loading";

export const PublishedNotice = ({ url, id }: { url: string; id: number }) => {
  const origin = useOrigin();

  const shareUrl = `${origin}/live/${url}`;

  if (!origin) {
    return <Loading />;
  }

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
      />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-md">
          <h1 className="text-center text-3xl font-bold text-primary border-b pb-4 mb-4">
            Your page is live! 🙌
          </h1>
          <div className="flex flex-row items-center space-x-3 mb-10">
            <div className="bg-green500 h-10 w-10 rounded-full flex items-center justify-center">
              <Globe2 className="h-6 w-6 text-black" />
            </div>
            <div className="flex flex-col items-start space-y-1">
              <h3>Anyone with the link</h3>
              <p className="text-muted-foreground text-sm">
                Anyone with the link can view your page.
              </p>
            </div>
          </div>
          <div className="my-4 flex flex-col gap-2 items-center w-full pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button
              className="mt-2 w-full"
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                toast({
                  title: "Copied! 📋",
                  description: "Link copied to clipboard.",
                });
              }}
            >
              Copy link
            </Button>
          </div>
          {/* Go back to the dashboard */}
          <div className="flex justify-between">
            <Button variant="link" asChild>
              <Link href={"/pages"} className="gap-1.5">
                <ArrowLeft className="h-4 w-auto" />
                Go to dashboard
              </Link>
            </Button>

            {/* <Button variant="link" asChild>
              <Link href={`/forms/${id}`} className="gap-1.5">
                <FileBarChart2 className="h-4 w-auto" />
                Form details
              </Link>
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
};
