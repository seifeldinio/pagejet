"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// const months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

type DailyVisitsData = {
  date: string;
  count: number;
};

const PageViewsChart = ({ dailyVisits }: { dailyVisits: DailyVisitsData[] }) => {
  const data = dailyVisits?.reduce((accumulator, visit) => {
    const existingEntry = accumulator.find(
      (entry) => entry.name === visit.date
    );

    if (existingEntry) {
      // If the date exists, update the count
      existingEntry.Visits += visit.count;
    } else {
      // If the date doesn't exist, add a new entry
      accumulator.push({
        name: visit.date,
        Visits: visit.count,
        amt: visit.count,
      });
    }

    return accumulator;
  }, [] as { name: string; Visits: number; amt: number }[]);

  // Sort the data array in ascending order based on date
  const sortedData = data?.sort(
    (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()
  );

  return (
    <div className="fade-in w-full h-full pt-8 ml-[-22px]">
      <ResponsiveContainer width="100%" height={318}>
        <LineChart width={500} height={420} data={sortedData}>
          <CartesianGrid
            strokeDasharray="10 10"
            strokeOpacity={0.4}
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#898989" }}
            axisLine={{ stroke: "#D9D9D9" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#898989" }}
            axisLine={{ stroke: "#D9D9D9" }}
            tickLine={false}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="Visits"
            stroke="#5C50A1"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PageViewsChart;
