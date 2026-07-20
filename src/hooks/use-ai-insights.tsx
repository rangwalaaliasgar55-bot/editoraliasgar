"use client";

import { useState } from "react";
import useOpenRouter from "@/hooks/use-openrouter";

const useAIInsights = () => {
  const { callOpenRouter } = useOpenRouter();
  const [insights, setInsights] = useState<string[]>([]);

  const fetchAIInsights = async () => {
    const prompt = "Generate 5 financial insights based on the following data: [simulated data]";
    const response = await callOpenRouter(prompt);
    if (response) {
      // Parse insights from response
      setInsights(response.split("\n").map(line => line.trim()));
    }
  };

  return { fetchAIInsights };
};

export default useAIInsights;