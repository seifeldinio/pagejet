"use client";

import { ArchivePage, DeletePage, RestorePage } from "@/actions/page";
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
  RefreshCcw,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteForeverButton from "./delete-forever-button";

const DeletedCard = ({ page }: { page: Page }) => {
  // const router = useRouter();

  // const [mounted, setMounted] = useState(false);

  // Restore
  const restorePage = async () => {
    try {
      await RestorePage(page.id);
      toast({
        title: "Restored! 👏",
        description: "Page has been restored.",
      });
      // router.replace("/pages");
      window.location.replace("/pages");
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
        <div className="flex flex-row items-center space-x-1.5">
          {page.icon && <span className="text-xs">{page.icon}</span>}
          <span className="truncate font-bold max-w-[140px]">{page.title}</span>
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
        <div className="flex flex-row items-center space-x-2.5 w-full">
          <Button
            onClick={restorePage}
            size="sm"
            variant="outline"
            className="flex flex-row items-center space-x-1.5 w-full text-sm mt-2 dark:bg-primary dark:text-black"
          >
            <div className="flex flex-row items-center space-x-1.5">
              <span>Restore</span> <RefreshCcw className="w-3 h-auto" />
            </div>
          </Button>
          <DeleteForeverButton pageId={page.id} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DeletedCard;
