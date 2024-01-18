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

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chart = ({ monthlyVisits }: { monthlyVisits: number[] }) => {
  const data = monthlyVisits?.map((visits, index) => ({
    name: months[index], // assuming you have an array of month names like ['Jan', 'Feb', ...]
    Visits: visits,
    amt: visits,
  }));

  return (
    <div className="fade-in w-full h-full pt-8 ml-[-22px]">
      <ResponsiveContainer width="100%" height={318}>
        <LineChart width={500} height={420} data={data}>
          <CartesianGrid
            strokeDasharray="10 10"
            strokeOpacity={0.4}
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#898989" }}
            axisLine={{ stroke: "#D9D9D9" }}
            tickLine={false} // Set this to remove the dash
          />
          <YAxis
            tick={{ fill: "#898989" }}
            axisLine={{ stroke: "#D9D9D9" }}
            // tickFormatter={formatSales}
            tickLine={false} // Set this to remove the dash
          />
          <Tooltip
          // formatter={tooltipFormatter}
          />
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

export default chart;
