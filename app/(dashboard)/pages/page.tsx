import { Separator } from "@/components/ui/separator";
import React, { Suspense } from "react";
import CreateFormCard from "../_components/create-form-card";
import CreatePageCard from "./_components/create-page-card";
import SkeletonPageCard from "./_components/page-card/skeleton-page-card";
import { GetArchivedPages, GetPages } from "@/actions/page";
import PageCard from "./_components/page-card/page-card";
import CreatePageButton from "@/components/create-page-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeletedCard from "./_components/deleted-card/deleted-card";
import { PagesSearchCommand } from "@/components/pages-search-command";
import { SearchInput } from "@/components/search-input";

export default function Pages() {
  return (
    <div className="container pt-8">
      <PagesSearchCommand />
      <div className="flex flex-row items-center justify-between">
        <Title />
        <div className="flex flex-row items-center space-x-2.5">
          {/* <CreatePageButton /> */}
        </div>
      </div>

      <Tabs defaultValue="created" className="w-full mt-2.5 ">
        <TabsList className="w-full">
          <TabsTrigger value="created">Created</TabsTrigger>
          <TabsTrigger value="deleted">Deleted</TabsTrigger>
          <div className="mb-8 ml-auto">
            <SearchInput searchPages={true} />
          </div>
        </TabsList>
        <hr className=" border-[#DCDCDC] dark:border-[#3A3A3A] mt-[-4px] mb-[28px]" />
        {/* Created */}
        <TabsContent value="created">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <CreatePageCard />
            <Suspense
              fallback={[1, 2, 3, 4].map((el) => (
                <SkeletonPageCard key={el} />
              ))}
            >
              <PageCardsWrapper />
            </Suspense>
          </div>
        </TabsContent>
        {/* Deleted */}
        <TabsContent value="deleted">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Suspense
              fallback={[1, 2, 3, 4].map((el) => (
                <SkeletonPageCard key={el} />
              ))}
            >
              <DeletedCardsWrapper />
            </Suspense>
          </div>
        </TabsContent>
      </Tabs>
      <div className="h-12" />
    </div>
  );
}

// Page title
async function Title() {
  const pages = await GetPages();
  return (
    <div className="flex flex-row items-center space-x-2">
      <h1 className="text-3xl font-bold">Pages</h1>
      {pages.length !== 0 && (
        <span className="flex items-center justify-center text-[#524a3ecd] bg-[#a59e922f] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] py-1 px-2 text-sm rounded-full">
          {pages.length}
        </span>
      )}
    </div>
  );
}

// Pages cards wrapper
async function PageCardsWrapper() {
  const pages = await GetPages();
  return (
    <>
      {pages.map((page) => (
        <PageCard key={page.id} page={page} />
      ))}
    </>
  );
}

// Deleted cards wrapper
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
