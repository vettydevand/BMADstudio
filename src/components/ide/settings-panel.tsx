"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KeyRound, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface SettingsPanelProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

const formSchema = z.object({
  apiKey: z.string().min(1, { message: "API Key cannot be empty." }),
});

export default function SettingsPanel({ apiKey, onApiKeyChange }: SettingsPanelProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: apiKey,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onApiKeyChange(values.apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Google AI API Key has been set for this session.",
    });
  };

  return (
    <div className="p-2">
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-primary" />
            <span>API Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Google AI API Key</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your Google AI API Key"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your key is stored in your browser for this session only. Get a key from{" "}
                      <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="underline">
                        Google AI Studio
                      </a>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save API Key</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
