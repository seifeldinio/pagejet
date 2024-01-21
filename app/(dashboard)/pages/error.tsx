"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-4 pb-12">
      <div className="w-[160px]">
        <img
          src="/images/error.webp"
          className="dark:hidden"
          alt="Illustration"
          draggable={false}
        />
        <img
          src="/images/error-dark.webp"
          className="hidden dark:block"
          alt="Illustration"
          draggable={false}
        />
      </div>
      {/* <div className="flex flex-col items-center justify-center"> */}
      <h2>Something went wrong!</h2>
      {/* <h3>😶</h3> */}
      {/* </div> */}
      <Button asChild>
        <Link href={"/"}>Go to dashboard</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
