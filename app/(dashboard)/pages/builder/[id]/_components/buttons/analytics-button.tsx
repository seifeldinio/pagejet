"use client";
import { FormElements } from "@/components/form-elements";
import IconButton from "@/components/icon-button";
import PageAnalyticsModal from "@/components/modals/page-analytics-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useDesigner from "@/hooks/use-designer";
import { BarChart3, Eye, EyeIcon } from "lucide-react";
import React, { useState } from "react";

const AnalyticsButton = ({
  onClick,
  visits,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  visits: number;
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        size="sm"
        variant="outline"
        className="space-x-1"
        disabled={visits === 0}
      >
        <BarChart3 className="h-4 w-auto" />
        <span>Analytics</span>
      </Button>
    </>
  );
};

export default AnalyticsButton;
