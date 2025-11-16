"use client";

import { useState } from "react";
import { Book, Bot, Code, Terminal as TerminalIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import AiGenerator from "@/components/ide/ai-generator";
import CodeEditor from "@/components/ide/code-editor";
import DocBrowser from "@/components/ide/doc-browser";
import Terminal from "@/components/ide/terminal";
import IdeHeader from "@/components/ide/header";
import { Toaster } from "@/components/ui/toaster";

const initialCode = `// Welcome to the BMAD IDE
// --------------------------
// Use the AI Generator to create BMAD code from a description.
// Or, start typing your own BMAD method here.

Method: ExampleMethod
  Description: "A simple example to demonstrate the IDE."
  
  BEGIN
    Action: DisplayMessage
      Message: "Hello, BMAD World!"
    END
  END
`;

export default function Home() {
  const [code, setCode] = useState<string>(initialCode);

  return (
    <div className="flex h-screen w-full flex-col bg-background font-body text-foreground">
      <IdeHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="flex w-full max-w-sm flex-col border-r p-2 md:max-w-md lg:max-w-lg">
          <Tabs defaultValue="generator" className="flex flex-1 flex-col overflow-hidden">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generator">
                <Bot className="mr-2 h-4 w-4" />
                AI Generator
              </TabsTrigger>
              <TabsTrigger value="docs">
                <Book className="mr-2 h-4 w-4" />
                Docs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="generator" className="flex-1 overflow-y-auto">
              <AiGenerator onCodeGenerated={setCode} />
            </TabsContent>
            <TabsContent value="docs" className="flex-1 overflow-y-auto">
              <DocBrowser />
            </TabsContent>
          </Tabs>
        </div>

        {/* Separator */}
        <Separator orientation="vertical" />

        {/* Right Section */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Main Content: Code Editor */}
          <div className="flex flex-1 flex-col overflow-hidden p-2">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="h-4 w-4" />
              <span>Code Editor</span>
            </div>
            <CodeEditor code={code} onCodeChange={setCode} />
          </div>

          {/* Separator */}
          <Separator orientation="horizontal" />

          {/* Bottom Panel: Terminal */}
          <div className="flex h-1/3 flex-col overflow-hidden p-2">
             <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <TerminalIcon className="h-4 w-4" />
              <span>Terminal</span>
            </div>
            <Terminal />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
