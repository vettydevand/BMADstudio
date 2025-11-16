import { BmadLogo } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

export default function IdeHeader() {
  return (
    <header>
      <div className="flex h-14 items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <BmadLogo className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">BMAD IDE</h1>
        </div>
      </div>
      <Separator />
    </header>
  );
}
