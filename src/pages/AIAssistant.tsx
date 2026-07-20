"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import useOpenRouter from "@/hooks/use-openrouter";
import AIChat from "@/components/AIChat";

const AIAssistant = () => {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { callOpenRouter, loading, error } = useOpenRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to history
    setHistory([...history, { role: "user", content: message }]);

    // Get AI response
    const response = await callOpenRouter(message);

    if (response) {
      // Add assistant response to history
      setHistory([...history, { role: "assistant", content: response }]);
    } else {
      // Use proper toast API
      toast({
        title: "Error",
        description: "Failed to get AI response",
        variant: "destructive",
      });
    }

    // Clear input
    setMessage("");
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#0B0C0E]/80 border border-white/5 rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">AI Financial Assistant</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Ask about your finances..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-white/20 bg-[#0B0C0E]/80 text-white placeholder-text-white"
          />
        </div>
        <Button variant="primary" type="submit">
          Ask
        </Button>
      </form>

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      <div className="mt-4">
        <AIChat messages={history} />
      </div>
    </div>
  );
};

export default AIAssistant;