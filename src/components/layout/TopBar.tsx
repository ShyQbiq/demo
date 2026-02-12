import { Search, Share2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import qbiqLogo from "@/assets/qbik-logo.jpeg";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card px-6 shadow-subtle shrink-0">
      <div className="flex items-center gap-2">
        <img src={qbiqLogo} alt="qbiq" className="h-7 w-7 rounded" />
        <span className="text-sm font-bold tracking-tight">qbiq</span>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
            TD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
