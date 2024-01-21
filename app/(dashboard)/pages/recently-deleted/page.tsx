import { GetArchivedPages } from "@/actions/page";
import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";
import SkeletonPageCard from "../_components/page-card/skeleton-page-card";
import DeletedCard from "./_components/deleted-card/deleted-card";
import BackButton from "@/components/back-button";

function RecentlyDeleted() {
  return (
    <div className="container pt-8 page-fade">
      <div className="flex flex-row items-center space-x-2">
        <BackButton />
        <Title />
      </div>

      <Separator className="my-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <SkeletonPageCard key={el} />
          ))}
        >
          <DeletedCardsWrapper />
        </Suspense>
      </div>
    </div>
  );
}

export default RecentlyDeleted;

// Page title
async function Title() {
  const pages = await GetArchivedPages();
  return (
    <div className="flex flex-row items-center space-x-2">
      <h1 className="text-3xl font-bold">Recently deleted</h1>
      {pages.length !== 0 && (
        <span className="flex items-center justify-center text-[#524a3ecd] bg-[#a59e922f] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] py-1 px-2 text-sm rounded-full">
          {pages.length}
        </span>
      )}
    </div>
  );
}

// Cards wrapper
async function DeletedCardsWrapper() {
  const pages = await GetArchivedPages();
  return (
    <>
      {pages.map((page) => (
        <DeletedCard key={page.id} page={page} />
      ))}
    </>
  );
}
