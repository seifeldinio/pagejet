import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle } from "lucide-react";
import React, { ReactNode } from "react";

const StatsCard = ({
  title,
  value,
  icon,
  description,
  loading,
  className,
  helper,
  helperText,
}: {
  title: string;
  value: string;
  description: string;
  className: string;
  loading: boolean;
  icon: ReactNode;
  helper?: boolean;
  helperText?: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex flex-row items-center space-x-1.5">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {helper && (
            <HoverCard>
              <HoverCardTrigger>
                <HelpCircle className="w-3 h-auto" />
              </HoverCardTrigger>
              <HoverCardContent className="text-xs">
                {helperText}
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-sm pt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
