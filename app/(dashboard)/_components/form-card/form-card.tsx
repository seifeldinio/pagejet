import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@prisma/client";
import React from "react";
import { formatDistance } from "date-fns";
import { ArrowRight, Edit, Eye, Inbox, Layers } from "lucide-react";
import IconButton from "@/components/icon-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card className="h-[242px] dark:bg-[#1D1D1D] dark:border-[#494949] hover:shadow-md transition-all duration-150 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          {form.published && <Badge variant="green">Published</Badge>}
          {!form.published && <Badge variant="yellow">Draft</Badge>}
          {form.published && (
            <span className="flex items-center gap-2 text-muted-foreground text-xs font-normal">
              <div className="flex flex-row items-center space-x-1">
                <Eye className="h-3 w-auto" />
                <span>{form.visits.toLocaleString()}</span>
              </div>

              <div className="flex flex-row items-center space-x-1">
                <Inbox className="h-3 w-auto" />
                <span>{form.submissions.toLocaleString()}</span>
              </div>
            </span>
          )}
        </CardTitle>
        <span className="truncate font-bold">{form.name}</span>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-xs">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || ""}
      </CardContent>
      <CardFooter className="mt-[48px]">
        {form.published && (
          <Button
            size="sm"
            variant="outline"
            className="flex flex-row items-center space-x-1.5 w-full text-sm mt-2 dark:bg-primary dark:text-black"
            asChild
          >
            <Link href={`/forms/${form.id}`}>
              <span>Open</span> <ArrowRight className="w-3 h-auto" />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button
            size="sm"
            variant="outline"
            className="flex flex-row items-center space-x-1.5 w-full text-sm mt-2 dark:bg-primary dark:text-black"
            asChild
          >
            <Link href={`/builder/${form.id}`}>
              <span>Edit</span>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormCard;
