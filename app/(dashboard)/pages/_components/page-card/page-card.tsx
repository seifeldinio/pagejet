"use client";

import { ArchivePage } from "@/actions/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Page } from "@prisma/client";
import {
  BarChart3Icon,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const PageCard = ({ page }: { page: Page }) => {
  // const [mounted, setMounted] = useState(false);

  // Delete (Archive)
  const deletePage = async () => {
    try {
      await ArchivePage(page.id);
      toast({
        title: "Deleted! 👋",
        description: "Page has been deleted.",
      });
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) {
  //   return null; // To Avoid window not defined error
  // }

  return (
    <Card className="h-[242px] dark:bg-[#1D1D1D] dark:border-[#494949] hover:shadow-md transition-all duration-150 ease-in-out">
      <CardHeader className="pb-1.5 pt-4">
        {/* <CardTitle className="flex items-center gap-2 justify-between">
          {page.isPublished && <Badge variant="green">Published</Badge>}
          {!page.isPublished && <Badge variant="yellow">Draft</Badge>}
          {page.isPublished && (
            <span className="flex items-center gap-2 text-muted-foreground text-xs font-normal">
              <div className="flex flex-row items-center space-x-1">
                <Layers className="h-3 w-auto" />
                <span>{page.visits.toLocaleString()}</span>
              </div>
            </span>
          )}
        </CardTitle> */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <span className="truncate font-bold max-w-[140px]">
              {page.title}
            </span>
            {page.isPublished && (
              <div className="h-2 w-2 rounded-full bg-[#ADE89D]" />
            )}
            {!page.isPublished && (
              <div className="h-2 w-2 rounded-full bg-[#FED955]" />
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-[#252525] ">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              <DropdownMenuItem className="flex flex-row items-center space-x-1.5 dark:hover:bg-[#2f2f2f]">
                <BarChart3Icon className="h-3 w-3" />
                <span className="text-sm">Analytics</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-row items-center space-x-1.5 dark:hover:bg-[#2f2f2f]">
                <Copy className="h-3 w-3" />
                <span className="text-sm">Clone</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={deletePage}
                className="flex flex-row items-center space-x-1.5 text-red-500 focus:bg-red-500 focus:text-white"
              >
                <Trash className="h-3 w-3" />
                <span className="text-sm">Delete</span>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Subscription</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardDescription className="flex items-center justify-between text-muted-foreground text-xs">
          {/* {formatDistance(page.createdAt, new Date(), {
            addSuffix: true,
          })} */}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[132px] w-full rounded-lg pb-2">
        {/* {form.description || ""} */}
        <img
          src={page.coverImage || "/images/placeholder.webp"}
          className="object-cover h-full w-full rounded-lg dark:hidden"
          alt="Cover"
          draggable={false}
        />
        <img
          src={page.coverImage || "/images/placeholder-dark.webp"}
          className="object-cover h-full w-full rounded-lg hidden dark:block"
          alt="Cover"
          draggable={false}
        />
      </CardContent>

      <CardFooter>
        {page.isPublished && (
          <div className="flex flex-row items-center space-x-2.5 w-full">
            <Button
              size="sm"
              variant="outline"
              className="flex flex-row items-center space-x-1.5 w-full text-sm mt-2 dark:bg-primary dark:text-black"
              asChild
            >
              <Link href={`/live/${page.shareURL}`} target="_blank">
                <span>View</span> <ExternalLink className="w-3 h-auto" />
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex flex-row items-center space-x-1.5 w-full text-sm mt-2 dark:bg-primary dark:text-black"
              asChild
            >
              <Link href={`/pages/builder/${page.id}`}>
                <span>Edit</span>
              </Link>
            </Button>
          </div>
        )}
        {!page.isPublished && (
          <Button
            size="sm"
            variant="outline"
            className="flex flex-row items-center space-x-1.5 w-full text-sm mt-2 dark:bg-primary dark:text-black"
            asChild
          >
            <Link href={`/pages/builder/${page.id}`}>
              <span>Edit</span>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PageCard;
