"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([
    "BMAD IDE Terminal v1.0.0",
    "Type 'help' for a list of available commands.",
  ]);
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleCommand = (command: string) => {
    let newLines = [...lines, `> ${command}`];
    let output = "";

    switch (command.trim().toLowerCase()) {
      case "help":
        output = "Available commands: help, clear, version, run";
        break;
      case "clear":
        setLines([]);
        return;
      case "version":
        output = "BMAD IDE v1.0.0";
        break;
      case "run":
        output = "Executing script... Done. (simulation)";
        break;
      default:
        output = `command not found: ${command}`;
        break;
    }
    newLines.push(output);
    setLines(newLines);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [lines]);

  return (
    <div className="flex h-full flex-1 flex-col overflow-hidden rounded-md border bg-card font-code">
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-3 text-sm">
          {lines.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center border-t p-2">
        <span className="mr-2 text-primary">$</span>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter command..."
          className="h-8 flex-1 border-0 bg-transparent font-code !ring-0 focus-visible:!ring-0"
        />
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            if(input) {
              handleCommand(input);
              setInput("");
            }
          }}
          className="ml-2 animate-pulse hover:animate-none"
        >
          Execute
        </Button>
      </div>
    </div>
  );
}
