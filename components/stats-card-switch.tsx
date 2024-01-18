"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Hand, HelpCircle, MousePointerClick } from "lucide-react";
import React, { ReactNode, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StatsCardSwitch = ({
  submissionRateValue,
  bounceRateValue,
  description,
  loading,
  className,
}: {
  submissionRateValue: string;
  bounceRateValue: string;
  description: string;
  className: string;
  loading: boolean;
}) => {
  const [isSubmissionRateCard, setIsSubmissionRateCard] = useState(true);

  const submissionRateCard = {
    title: "Submission rate",
    icon: <MousePointerClick className="w-4 h-auto" />,
    value: submissionRateValue,
  };

  const bounceRateCard = {
    title: "Bounce rate",
    icon: <Hand className="w-4 h-auto" />,
    value: bounceRateValue,
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-row items-center space-x-1.5">
          <CardTitle className="text-sm font-medium">
            <Select
              onValueChange={(value) => {
                if (value === "bounce-rate") {
                  setIsSubmissionRateCard(false);
                } else {
                  setIsSubmissionRateCard(true);
                }
              }}
              defaultValue={"submission-rate"}
            >
              <SelectTrigger className="w-auto dark:bg-[#1D1D1D] border-none p-0 space-x-1 h-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="submission-rate">
                  {submissionRateCard.title}
                </SelectItem>
                <SelectItem value="bounce-rate">
                  {bounceRateCard.title}
                </SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </div>

        {isSubmissionRateCard && <MousePointerClick className="w-4 h-auto" />}
        {!isSubmissionRateCard && <Hand className="w-4 h-auto" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && isSubmissionRateCard && submissionRateValue}
          {!loading && !isSubmissionRateCard && bounceRateValue}
        </div>
        <p className="text-sm pt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCardSwitch;
