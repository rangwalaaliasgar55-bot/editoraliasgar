"use client";

import { useState } from "react";
import { ChatMessage } from "@/types";

// Falls back to this env-configured key when no visitor-supplied key is
// given (used by the internal admin AI Assistant). Never hardcode a real
// key here — set VITE_OPENROUTER_API_KEY in a local, gitignored .env file.
// See .env.example for the expected variable names.
const ENV_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as
  | string
  | undefined;
const PRIMARY_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || "openai/gpt-4o";
const FALLBACK_MODEL =
  import.meta.env.VITE_OPENROUTER_FALLBACK_MODEL || "openai/gpt-3.5-turbo";

const callModel = async (
  messages: ChatMessage[],
  model: string,
  apiKey: string
) => {
  return fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, messages }),
  });
};

interface ChatOptions {
  /** A visitor-supplied OpenRouter key. Falls back to the env key if omitted. */
  apiKey?: string;
}

const useOpenRouter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sends the full message history to OpenRouter and returns the
   * assistant's reply text, or null on failure (with `error` set).
   */
  const chat = async (messages: ChatMessage[], options?: ChatOptions) => {
    setLoading(true);
    setError(null);

    const key = options?.apiKey?.trim() || ENV_API_KEY;

    if (!key) {
      setError(
        "No OpenRouter API key configured. Add one to use the AI assistant."
      );
      setLoading(false);
      return null;
    }

    try {
      let response = await callModel(messages, PRIMARY_MODEL, key);

      // Fall back to a cheaper/alternate model on rate limit or server error.
      if (response.status === 429 || response.status >= 500) {
        response = await callModel(messages, FALLBACK_MODEL, key);
      }

      if (response.status === 401) {
        throw new Error("That API key was rejected by OpenRouter.");
      }
      if (!response.ok) {
        throw new Error(`OpenRouter request failed (${response.status})`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content ?? null;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get AI response."
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { chat, loading, error };
};

export default useOpenRouter;
