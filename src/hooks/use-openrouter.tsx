"use client";

import { useState } from "react";

// Read the key from the environment, never hardcode it here.
// Set VITE_OPENROUTER_API_KEY in a local, gitignored .env file
// (see .env.example for the expected variable names).
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
const PRIMARY_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || "openai/gpt-4o";
const FALLBACK_MODEL =
  import.meta.env.VITE_OPENROUTER_FALLBACK_MODEL || "openai/gpt-3.5-turbo";

const callModel = async (prompt: string, model: string) => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY ?? ""}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  return response;
};

const useOpenRouter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callOpenRouter = async (prompt: string) => {
    setLoading(true);
    setError(null);

    if (!API_KEY) {
      setError(
        "OpenRouter isn't configured yet. Add VITE_OPENROUTER_API_KEY to a local .env file (see .env.example)."
      );
      setLoading(false);
      return null;
    }

    try {
      let response = await callModel(prompt, PRIMARY_MODEL);

      // Fall back to a cheaper/alternate model on rate limit or server error.
      if (response.status === 429 || response.status >= 500) {
        response = await callModel(prompt, FALLBACK_MODEL);
      }

      if (!response.ok) {
        throw new Error(`OpenRouter request failed (${response.status})`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content ?? null;
    } catch (err) {
      setError("Failed to get AI response. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callOpenRouter, loading, error };
};

export default useOpenRouter;