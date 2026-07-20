"use client";

import { AIInsight } from "@/types";
import React from "react";

const AIInsights = ({ insights }: { insights: AIInsight[] }) => {
  return (
    <div className="space-y-4">
      {insights.map((insight, index) => (
        <div key={index} className="p-4 bg-[#2DD4BF]/20 rounded-md">
          <p className="text-sm font-medium">{insight.text}</p>
        </div>
      ))}
    </div>
  );
};

export default AIInsights;