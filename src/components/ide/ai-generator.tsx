"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { generateBMADCodeFromDescription } from "@/ai/flows/generate-bmad-code-from-description";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface AiGeneratorProps {
  onCodeGenerated: (code: string) => void;
  apiKey: string;
}

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Please provide a more detailed description (min 10 characters).",
  }),
});

export default function AiGenerator({ onCodeGenerated, apiKey }: AiGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "API Key Missing",
        description: "Please enter your Google AI API Key in the Settings tab first.",
      });
      return;
    }
    
    setIsGenerating(true);
    try {
      const result = await generateBMADCodeFromDescription({ description: values.description, apiKey });
      if (result && result.code) {
        onCodeGenerated(result.code);
        toast({
          title: "Code Generated",
          description: "The BMAD code has been loaded into the editor.",
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Failed to get a valid response from the AI.",
        });
      }
    } catch (error: any) {
      console.error("AI Generation Error:", error);
      const errorMessage = error.message || "An unexpected error occurred.";
      if (errorMessage.includes("API key not valid")) {
        toast({
          variant: "destructive",
          title: "Invalid API Key",
          description: "The provided API key is not valid. Please check and try again.",
        });
      } else {
         toast({
          variant: "destructive",
          title: "Generation Failed",
          description: `An unexpected error occurred: ${errorMessage}`,
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-2">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>BMAD Code Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Method Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'Create a method that greets a user and then displays the current date.'"
                        className="min-h-[150px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the business method you want to create in plain
                      English.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isGenerating || !apiKey} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Code"
                )}
              </Button>
              {!apiKey && (
                <p className="text-center text-xs text-destructive">
                  API Key required to generate code.
                </p>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
