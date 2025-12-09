"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, X, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  confidence?: number;
  timestamp: Date;
}

interface SuggestedQuery {
  text: string;
  icon: string;
}

const suggestedQueries: SuggestedQuery[] = [
  { text: "Show high priority applications", icon: "🔥" },
  { text: "Which applications are overdue?", icon: "⏰" },
  { text: "What's the average processing time?", icon: "📊" },
  { text: "Show compliance issues", icon: "⚠️" },
  { text: "Predict next week's completions", icon: "🔮" },
];

const aiResponses: Record<string, { response: string; confidence: number }> = {
  "show high priority applications": {
    response: "Found 23 high priority applications in the Medical department. 7 require immediate attention due to approaching deadlines. Would you like me to show the detailed list?",
    confidence: 0.95,
  },
  "which applications are overdue": {
    response: "There are 7 applications overdue for review:\n• APP-2024-156: 3 days overdue\n• APP-2024-189: 2 days overdue\n• APP-2024-201: 1 day overdue\n...and 4 more. These are flagged in the Applications dashboard.",
    confidence: 0.92,
  },
  "average processing time": {
    response: "The average processing time this month is 3.2 days, which is 15% faster than last month (3.8 days). AI-assisted validation has contributed to this improvement.",
    confidence: 0.98,
  },
  "compliance issues": {
    response: "3 potential compliance issues detected:\n• APP-2024-312: Missing HIPAA documentation\n• APP-2024-298: Incomplete IRB approval\n• APP-2024-267: Budget exceeds department limit\n\nReview these in the Admin panel.",
    confidence: 0.89,
  },
  "predict": {
    response: "Based on historical patterns:\n• Next 7 days: 45 completions expected (89% confidence)\n• Next 30 days: 178 completions expected (82% confidence)\n\nNote: Medical department may experience 2-3 day delays due to high volume.",
    confidence: 0.85,
  },
  default: {
    response: "I can help you with:\n• Application status and priorities\n• Processing time analytics\n• Compliance monitoring\n• Workload predictions\n\nTry asking about specific applications or metrics!",
    confidence: 0.75,
  },
};

function getAIResponse(query: string): { response: string; confidence: number } {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("high priority") || lowerQuery.includes("priority")) {
    return aiResponses["show high priority applications"];
  }
  if (lowerQuery.includes("overdue") || lowerQuery.includes("late")) {
    return aiResponses["which applications are overdue"];
  }
  if (lowerQuery.includes("processing time") || lowerQuery.includes("average")) {
    return aiResponses["average processing time"];
  }
  if (lowerQuery.includes("compliance") || lowerQuery.includes("issue")) {
    return aiResponses["compliance issues"];
  }
  if (lowerQuery.includes("predict") || lowerQuery.includes("forecast") || lowerQuery.includes("next week")) {
    return aiResponses["predict"];
  }

  return aiResponses["default"];
}

export function ChatFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "Hello! I'm EIDS AI Assistant. I can help you find applications, check compliance status, and provide analytics insights. What would you like to know?",
      confidence: 1.0,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (query: string) => {
    if (!query.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: query,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const { response, confidence } = getAIResponse(query);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        type: "assistant",
        content: response,
        confidence,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full",
          "bg-primary text-primary-foreground",
          "shadow-lg shadow-primary/25",
          "hover:shadow-xl hover:shadow-primary/40",
          "transition-all duration-300",
          "group",
          isOpen && "hidden"
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Open AI Assistant chat"
      >
        {/* Glow ring - slower pulse animation */}
        <span className="absolute inset-0 rounded-full bg-primary/50 animate-pulse opacity-75" />
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent-cyber opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
        <Bot className="h-6 w-6 relative z-10" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] h-[600px] max-h-[calc(100vh-100px)] flex flex-col rounded-2xl shadow-2xl shadow-primary/20"
            role="dialog"
            aria-label="AI Assistant chat panel"
          >
            {/* Glass card styling - lighter in dark mode, darker in light mode */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-[hsl(220,15%,92%)] dark:bg-[hsl(220,20%,16%)] border border-glass-border backdrop-blur-xl" />

            {/* Close button - positioned absolutely with high z-index */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="absolute top-3 right-3 z-[100] w-8 h-8 rounded-full flex items-center justify-center bg-background hover:bg-destructive text-foreground hover:text-destructive-foreground transition-all duration-200 border-2 border-border hover:border-destructive shadow-lg"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="relative z-10 flex items-center p-4 pr-14 border-b border-glass-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-sm tracking-wide">EIDS AI ASSISTANT</h3>
                  <p className="text-xs text-muted-foreground">Powered by NLP</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex",
                    message.type === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary/50 border border-glass-border rounded-bl-md"
                    )}
                  >
                    <p className="whitespace-pre-line">{message.content}</p>
                    {message.type === "assistant" && message.confidence && (
                      <p className="mt-2 text-xs text-muted-foreground font-mono">
                        Confidence: {(message.confidence * 100).toFixed(0)}%
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/50 border border-glass-border rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested queries */}
            {messages.length <= 2 && (
              <div className="relative z-10 px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.slice(0, 3).map((query) => (
                    <button
                      key={query.text}
                      onClick={() => handleSend(query.text)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 border border-glass-border hover:bg-primary/20 hover:border-primary/50 transition-colors"
                    >
                      {query.icon} {query.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="relative z-10 p-4 border-t border-glass-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 h-10 px-4 rounded-full bg-secondary/50 border border-glass-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  aria-label="Type your message"
                />
                <Button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  size="icon"
                  className="rounded-full h-10 w-10"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
