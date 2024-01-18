import { GetFormStats } from "@/actions/form";
import { Hand, Inbox, MousePointerClick, TrendingUp } from "lucide-react";
import StatsCard from "../../../components/stats-card";

interface CardsGridProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function CardsGrid(props: CardsGridProps) {
  const { data, loading } = props;

  return (
    <div className="w-full  gap-4 grid grid-col-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total visits"
        icon={<TrendingUp className="w-4 h-auto" />}
        description="All time"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="bg-purple500 text-black"
      />
      <StatsCard
        title="Total submissions"
        icon={<Inbox className="w-4 h-auto" />}
        description="All time"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="bg-green500 text-black"
      />
      <StatsCard
        title="Submission rate"
        icon={<MousePointerClick className="w-4 h-auto" />}
        description="All time"
        value={data?.submissionRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="bg-lemon500 text-black"
        helper={true}
        helperText="Visitors who submitted the form"
      />
      <StatsCard
        title="Bounce rate"
        icon={<Hand className="w-4 h-auto" />}
        description="All time"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="bg-background dark:bg-[#1D1D1D] dark:border dark:border-[#494949]"
        helper={true}
        helperText="Visitors who left without interacting"
      />
    </div>
  );
}

export default CardsGrid;
