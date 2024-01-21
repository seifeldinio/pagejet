import { GetFormStats, GetForms } from "@/actions/form";
import Image from "next/image";
import CardsGrid from "./_components/cards-grid";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import IconButton from "@/components/icon-button";
import CreateFormButton from "../../components/create-form-button";
import CreateFormCard from "./_components/create-form-card";
import FormCard from "./_components/form-card/form-card";
import SkeletonFormCard from "./_components/form-card/skeleton-form-card";

export default function Home() {
  return (
    <div className="container pt-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <CreateFormButton />
      </div>

      <Separator className="my-5" />
      <Suspense fallback={<CardsGrid loading={true} />}>
        <CardStatsWrapper />
      </Suspense>

      <Title />
      <Separator className="my-5" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <CreateFormCard />
        <Suspense
          fallback={[1, 2, 3, 4].map((el) => (
            <SkeletonFormCard key={el} />
          ))}
        >
          <FormCardsWrapper />
        </Suspense>
      </div>
    </div>
  );
}

// Statistics cards wrapper
async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <CardsGrid loading={false} data={stats} />;
}

// Title
async function Title() {
  const forms = await GetForms();
  return (
    <div className="flex flex-row items-center space-x-2 mt-12">
      <h2 className="text-3xl font-bold col-span-2">Forms</h2>
      {forms.length !== 0 && (
        <span className="flex items-center justify-center text-[#524a3ecd] bg-[#a59e922f] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] py-1 px-2 text-sm rounded-full">
          {forms.length}
        </span>
      )}
    </div>
  );
}

// Forms cards wrapper
async function FormCardsWrapper() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
