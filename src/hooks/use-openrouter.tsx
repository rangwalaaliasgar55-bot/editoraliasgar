"use client";

import { useState } from "react";

const useOpenRouter = () => {
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callOpenRouter = async (prompt: string) => {
    setLoading(true);
    setError(null);

    try {
      // Use native fetch instead of axios
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch from OpenRouter");
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      setError("Failed to get AI response");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callOpenRouter, loading, error };
};

export default useOpenRouter;