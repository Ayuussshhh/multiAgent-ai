"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Send, Sparkles, Wand2, Brain, Target, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef(null); // JS ref, no TypeScript syntax
  const router = useRouter();

  useEffect(() => {
    setWordCount(
      prompt
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length
    );
  }, [prompt]);

  const handleSubmit = () => {
    if (prompt.trim()) {
      setIsTyping(true);
      // Simulate processing delay
      setTimeout(() => {
        router.push("/analysis");
      }, 1000);
    }
  };

  const suggestions = [
    {
      icon: Brain,
      text: "Analyze user behavior patterns",
      category: "Analytics",
    },
    {
      icon: Target,
      text: "Define product market fit strategy",
      category: "Strategy",
    },
    { icon: Users, text: "Create user persona profiles", category: "Research" },
    {
      icon: Wand2,
      text: "Generate feature prioritization matrix",
      category: "Planning",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary animate-float">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">
              AI-Powered Product Requirements
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Describe Your Product Vision
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our multiagent system will analyze your requirements and provide
            comprehensive insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Input Area */}
          <Card
            className="p-8 glass animate-float"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Product Requirements Prompt
                </label>
                <div className="relative">
                  <Textarea
                    ref={textareaRef}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your product idea, target audience, key features, and business goals. Be as detailed as possible to get the best analysis from our AI agents..."
                    className="min-h-[200px] text-base leading-relaxed resize-none border-2 focus:border-primary/50 transition-all duration-300"
                    disabled={isTyping}
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {wordCount} words
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>AI Agents Ready</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isTyping}
                  size="lg"
                  className="group animate-pulse-glow"
                >
                  {isTyping ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Analyze with AI Agents
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>

          {/* Suggestions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">
              Need inspiration? Try these prompts:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((suggestion, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 glass-dark group"
                  onClick={() => setPrompt(suggestion.text)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <suggestion.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {suggestion.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground group-hover:text-primary transition-colors">
                        {suggestion.text}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
