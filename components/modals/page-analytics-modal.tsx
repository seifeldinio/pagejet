"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GetPageById } from "@/actions/page";
import { useParams } from "next/navigation";
import Modal from "./modal";
import { Button } from "../ui/button";
import PageViewsChart from "../page-views-chart";
import { Page } from "@prisma/client";
import { Eye } from "lucide-react";

const PageAnalyticsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const params = useParams();
  const { id } = params;

  const [isMounted, setIsMounted] = useState(false);
  const [page, setPage] = useState<{
    id: number;
    title: string;
    userId: string;
    visits: number;
    pageDailyVisits: {
      id: number;
      date: string;
      count: number;
      pageId: number;
    }[];
  } | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const pageData = await GetPageById(Number(id));
        if (!pageData) {
          throw new Error("Page not found");
        }
        setPage(pageData);
        setIsMounted(true);
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    };

    fetchPage();
  }, [id]);

  if (!isMounted || !page) {
    return null;
  }

  const { visits, pageDailyVisits } = page;

  return (
    <Modal title="Analytics" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col flex-1 h-[420px] rounded-lg border border-[#EAEAEA] dark:border-[#494949] bg-background dark:bg-[#1D1D1D] p-5">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center space-x-1.5">
            <Eye className="w-5 h-5" />
            <h3>
              All time views: <span className="font-bold">{visits}</span>{" "}
            </h3>
          </div>

          <div className="flex flex-row space-x-3">
            <Button variant="secondary" size="sm" className="cursor-default">
              Daily
            </Button>
          </div>
        </div>
        <PageViewsChart dailyVisits={pageDailyVisits} />
      </div>
    </Modal>
  );
};

export default PageAnalyticsModal;
