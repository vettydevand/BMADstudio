"use client";

import { useEffect, useMemo, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
}

export default function CodeEditor({ code, onCodeChange }: CodeEditorProps) {
  const lineNumbers = useMemo(() => code.split("\n").length, [code]);
  const lineCounterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleScroll = () => {
    if (lineCounterRef.current && textareaRef.current) {
      lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea?.addEventListener("scroll", handleScroll);
    return () => {
      textarea?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex h-full flex-1 overflow-hidden rounded-md border bg-card">
      <div
        ref={lineCounterRef}
        className="h-full select-none overflow-hidden bg-muted/50 p-3 text-right text-sm text-muted-foreground"
      >
        {Array.from({ length: lineNumbers }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <Textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => onCodeChange(e.target.value)}
        placeholder="Enter BMAD code here..."
        className="h-full flex-1 resize-none rounded-l-none border-0 border-l font-code !ring-0 focus-visible:!ring-0"
        spellCheck="false"
      />
    </div>
  );
}
