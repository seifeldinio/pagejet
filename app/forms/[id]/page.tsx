import { GetFormById } from "@/actions/form";
import ViewButton from "./_components/view-button";
import CopyButton from "./_components/copy-button";
import { Button } from "@/components/ui/button";
import Chart from "./_components/chart";
import StatsCard from "@/components/stats-card";
import {
  ArrowLeft,
  Hand,
  Inbox,
  Pencil,
  TrendingUp,
  TrendingUpIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import BackButton from "../../../components/back-button";
import StatsCardSwitch from "@/components/stats-card-switch";
import TableSubmissions from "./_components/table/table-submissions";
import { useRouter } from "next/navigation";
import EditButton from "./_components/buttons/edit-button";

async function FormDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  // Calculate the statistics
  const { visits, submissions, dailyVisits } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="pt-8 pb-4 border-b border-muted ">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center ">
            <BackButton />
            <h1 className="text-3xl font-bold truncate ml-1.5 mr-2.5">
              {form.name}
            </h1>
            <EditButton formId={form.id} />
          </div>
          <div className="flex flex-row items-center space-x-3.5">
            <CopyButton shareUrl={form.shareURL} />

            <ViewButton shareUrl={form.shareURL} />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start space-x-9 mt-5 mb-10 h-[420px]">
        <div className="flex flex-col flex-1 h-[420px] rounded-lg border border-[#EAEAEA] dark:border-[#494949] bg-background dark:bg-[#1D1D1D] p-5">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-xl">Form visits</h3>

            <div className="flex flex-row space-x-3">
              <Button variant="secondary" size="sm" className="cursor-default">
                Daily
              </Button>
            </div>
          </div>
          <Chart dailyVisits={dailyVisits} />
        </div>
        <div className="flex flex-col w-[320px] h-[420px]">
          <StatsCard
            title="Visits"
            icon={<TrendingUpIcon className="w-4 h-auto" />}
            description="All time"
            value={visits.toLocaleString() || ""}
            loading={false}
            className="bg-background dark:bg-[#1D1D1D] dark:border dark:border-[#494949]"
          />
          <StatsCard
            title="Submissions"
            icon={<Inbox className="w-4 h-auto" />}
            description="All time"
            value={submissions.toLocaleString() || ""}
            loading={false}
            className="mt-auto bg-background dark:bg-[#1D1D1D] dark:border dark:border-[#494949]"
          />
          <StatsCardSwitch
            submissionRateValue={submissionRate.toLocaleString() + "%" || ""}
            bounceRateValue={bounceRate.toLocaleString() + "%" || ""}
            description="All time"
            loading={false}
            className="mt-auto bg-background dark:bg-[#1D1D1D] dark:border dark:border-[#494949]"
          />
        </div>
      </div>
      <TableSubmissions id={form.id} />
      {/* <div className="flex flex-col">
        <div className="flex flex-row items-center space-x-2">
          <h2 className="text-3xl font-bold">Submissions</h2>
          <span className="flex items-center justify-center text-[#524a3ecd] bg-[#a59e922f] dark:bg-[#2D2D2D] dark:text-[#E8E8E8] py-1 px-2 text-sm rounded-full">
            313
          </span>
        </div>
        <Separator className="mt-4" />
        <div className="py-5">
          <TableSubmissions id={form.id} />
        </div>
      </div> */}
    </>
  );
}

export default FormDetailsPage;
