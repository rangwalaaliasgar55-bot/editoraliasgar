"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AIChat from "@/components/AIChat";
import useOpenRouter from "@/hooks/use-openrouter";
import { ChatMessage } from "@/types";

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
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { chat, loading, error } = useOpenRouter();

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: prompt },
    ];
    setMessages(nextMessages);
    setInput("");

    // No apiKey passed here — the hook falls back to the agency's own
    // VITE_OPENROUTER_API_KEY, set once in the deployment's env config.
    const reply = await chat([
      { role: "system", content: SYSTEM_PROMPT },
      ...nextMessages,
    ]);
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

        <div className="rounded-xl bg-white/[0.04] border border-white/5 p-6 space-y-4">
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
      </div>
    </div>
  );
};

export default ServicesChat;
