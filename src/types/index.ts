export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIInsight {
  text: string;
}