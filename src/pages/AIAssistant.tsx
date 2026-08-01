"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AIChat from "@/components/AIChat";
import useOpenRouter from "@/hooks/use-openrouter";
import { ChatMessage } from "@/types";

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { callOpenRouter, loading, error } = useOpenRouter();

  const handleSend = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;

    const userMessage: ChatMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const reply = await callOpenRouter(prompt);
    if (reply) {
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">AI Assistant</h1>
        <p className="text-gray-500 mt-1">
          Ask about your clients, projects, or finances.
        </p>
      </header>

      <div className="rounded-xl bg-white/[0.04] border border-white/5 p-6 space-y-4">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No messages yet. Ask something to get started.
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
            placeholder="Ask the AI assistant..."
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
