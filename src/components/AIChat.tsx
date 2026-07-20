"use client";

import { ChatMessage } from "@/types";
import React from "react";

const AIChat = ({ messages }: { messages: ChatMessage[] }) => {
  return (
    <div className="flex flex-col space-y-2">
      {messages.map((msg, index) => (
        <div key={index} className={`flex items-${msg.role === "user" ? "start" : "end"} gap-2`}>
          <div className="rounded-md bg-[#2DD4BF]/20 p-2">
            <p className="text-sm font-medium">
              {msg.role === "user" ? "You" : "AI"}
            </p>
            <p className="text-sm">{msg.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIChat;