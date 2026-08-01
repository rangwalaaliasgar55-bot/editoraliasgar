export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIInsight {
  text: string;
}