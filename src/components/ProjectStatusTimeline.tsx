"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ProjectStatus = "Inquiry" | "Negotiation" | "Editing" | "Revision" | "Delivered" | "Waiting Payment" | "Paid" | "Cancelled";

interface ProjectStatusTimelineProps {
  status: ProjectStatus;
  totalSteps: number;
}

const statuses: ProjectStatus[] = [
  "Inquiry",
  "Negotiation",
  "Editing",
  "Revision",
  "Delivered",
  "Waiting Payment",
  "Paid",
  "Cancelled",
];

const ProjectStatusTimeline = ({ status, totalSteps }: ProjectStatusTimelineProps) => {
  const statusIndex = statuses.indexOf(status);
  if (statusIndex === -1) return null;

  const stepWidth = (100 / totalSteps) * (statusIndex + 1);
  const playheadX = (statusIndex * (100 / totalSteps)) + 5;

  return (
    <motion.div
      className="relative h-12 w-full bg-[#2DD4BF]/10 rounded-lg"
      animate={{ x: playheadX }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 h-full bg-[#2DD4BF]/30 rounded-lg"
        style={{ width: `${stepWidth}%` }}
        animate={{ x: playheadX }}
      />
      <motion.div
        className="absolute inset-y-0 left-[calc(var(--playhead-x,0%))] -translate-x-1/2 flex items-center justify-center h-6 w-6 bg-[#2DD4BF] rounded-full"
        style={{ left: `${playheadX}%` }}
        animate={{ x: playheadX }}
      >
        <div className="text-xs font-medium text-white">{status}</div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectStatusTimeline;