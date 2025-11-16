"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { generateCodeAction } from "@/app/actions";
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
    const result = await generateCodeAction({ description: values.description, apiKey });
    setIsGenerating(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error,
      });
    } else if (result.code) {
      onCodeGenerated(result.code);
      toast({
        title: "Code Generated",
        description: "The BMAD code has been loaded into the editor.",
      });
      form.reset();
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
