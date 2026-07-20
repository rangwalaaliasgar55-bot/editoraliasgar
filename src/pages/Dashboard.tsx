"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ProjectStatusTimeline from "@/components/ProjectStatusTimeline";
import AIInsights from "@/components/AIInsights";
import useAIInsights from "@/hooks/use-ai-insights";

const Dashboard = () => {
  const { fetchAIInsights } = useAIInsights();
  const [aiInsights, setAiInsights] = useState<string[]>([]);

  useEffect(() => {
    fetchAIInsights();
  }, [fetchAIInsights]);

  return (
    <div className="flex min-h-screen bg-[#0B0C0E] text-white">
      {/* Existing dashboard content */}
      
      {/* AI Insights Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold">AI Insights</h2>
        <AIInsights insights={aiInsights} />
      </div>
    </div>
  );
};

export default Dashboard;