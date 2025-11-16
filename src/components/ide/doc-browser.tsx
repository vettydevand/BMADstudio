"use client"

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export default function DocBrowser() {
  return (
    <div className="flex h-full flex-col gap-4 p-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search documentation..." className="pl-9" />
      </div>
      <ScrollArea className="flex-1 rounded-md border p-4">
        <h2 className="mb-4 text-lg font-bold text-foreground">
          BMAD Method Reference
        </h2>

        <section className="mb-6">
          <h3 className="mb-2 text-md font-semibold text-primary">
            Method Declaration
          </h3>
          <p className="text-sm text-muted-foreground">
            A BMAD method starts with the `Method` keyword, followed by its name. It's the main container for your business logic.
          </p>
          <pre className="mt-2 rounded-md bg-muted p-2 font-code text-xs">
            {`Method: MyMethodName
  ...
END`}
          </pre>
        </section>

        <section className="mb-6">
          <h3 className="mb-2 text-md font-semibold text-primary">
            Action Block
          </h3>
          <p className="text-sm text-muted-foreground">
            The `BEGIN` and `END` block contains a sequence of actions. Actions are the fundamental steps of your method.
          </p>
          <pre className="mt-2 rounded-md bg-muted p-2 font-code text-xs">
            {`BEGIN
  Action: SomeAction
    Parameter: "Value"
  END
END`}
          </pre>
        </section>

         <section className="mb-6">
          <h3 className="mb-2 text-md font-semibold text-primary">
            Conditionals
          </h3>
          <p className="text-sm text-muted-foreground">
            Use `IF`, `ELSEIF`, and `ELSE` to control the flow of execution based on conditions.
          </p>
          <pre className="mt-2 rounded-md bg-muted p-2 font-code text-xs">
            {`IF (Condition) THEN
  ...
ELSE
  ...
ENDIF`}
          </pre>
        </section>
        
        <section>
          <h3 className="mb-2 text-md font-semibold text-primary">
            Loops
          </h3>
          <p className="text-sm text-muted-foreground">
            Use `LOOP WHILE` or `LOOP FOR` to repeat a block of actions.
          </p>
          <pre className="mt-2 rounded-md bg-muted p-2 font-code text-xs">
            {`LOOP WHILE (Condition)
  ...
ENDLOOP`}
          </pre>
        </section>
      </ScrollArea>
    </div>
  );
}
