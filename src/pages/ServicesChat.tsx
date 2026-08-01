"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AIChat from "@/components/AIChat";
import useOpenRouter from "@/hooks/use-openrouter";
import { ChatMessage } from "@/types";

const STORAGE_KEY = "vfc_openrouter_key";

const SYSTEM_PROMPT = `You are the assistant for Vision Fold Creative, a video
editing agency founded by Aliasgar with 2+ years of experience. Answer
visitor questions about our services, pricing, and process, using only the
facts below. If asked something outside this, say you can only speak to
Vision Fold Creative's services and suggest contacting the team directly.

Services:
- Short Form Editing (Reels, Shorts, TikTok, social/promo clips): starting
  at ₹700 per finished minute.
- Long Form Editing (YouTube, educational, business, storytelling videos):
  starting at ₹700 per finished minute.
- These are starting prices; final quotes depend on complexity, raw
  footage length, motion graphics requirements, and number of revisions.

Editing style: story-first editing, retention-focused pacing, modern
visual effects, clean motion design, professional sound design, engaging
captions, platform-optimized content.

Contact: visionfoldcreative@gmail.com, WhatsApp +91 7725004639.

Keep answers short, friendly, and specific — you're helping a potential
client decide if Vision Fold Creative is a good fit.`;

const ServicesChat = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [keyInput, setKeyInput] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { chat, loading, error } = useOpenRouter();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setApiKey(stored);
  }, []);

  const saveKey = () => {
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    localStorage.setItem(STORAGE_KEY, trimmed);
    setApiKey(trimmed);
    setKeyInput("");
  };

  const clearKey = () => {
    localStorage.removeItem(STORAGE_KEY);
    setApiKey(null);
    setMessages([]);
  };

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || loading || !apiKey) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: prompt },
    ];
    setMessages(nextMessages);
    setInput("");

    const reply = await chat(
      [{ role: "system", content: SYSTEM_PROMPT }, ...nextMessages],
      { apiKey }
    );
    if (reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Ask about Vision Fold Creative
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Chat with our AI about services, pricing, and process.
          </p>
        </header>

        {!apiKey ? (
          <div className="rounded-xl bg-white/[0.04] border border-white/5 p-6 space-y-4">
            <p className="text-sm text-gray-300">
              This chat runs on your own OpenRouter API key. It's stored only
              in your browser and sent directly to OpenRouter — never to our
              server.
            </p>
            <p className="text-sm text-gray-500">
              Don't have one?{" "}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2DD4BF] hover:underline"
              >
                Get a free key at openrouter.ai/keys
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveKey()}
                placeholder="sk-or-v1-..."
              />
              <Button onClick={saveKey}>Save key</Button>
            </div>
          </div>
        ) : (
          <div className="rounded-xl bg-white/[0.04] border border-white/5 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">
                Using your saved OpenRouter key.
              </p>
              <button
                onClick={clearKey}
                className="text-xs text-gray-500 hover:text-white underline"
              >
                Remove key
              </button>
            </div>

            {messages.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Ask us anything about our editing services or pricing.
              </p>
            ) : (
              <AIChat messages={messages} />
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-2 pt-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="e.g. How much for a 2 minute Reel edit?"
                disabled={loading}
              />
              <Button onClick={handleSend} disabled={loading}>
                {loading ? "Thinking..." : "Ask"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesChat;
