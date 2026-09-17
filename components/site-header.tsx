import { SiteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { ModeToggle } from "./mode-toggle";


export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/50">
      <div className="container flex h-16 max-w-(--breakpoint-2xl) items-center justify-between">
        <MainNav />
        <nav className="flex items-center space-x-1">
          <ModeToggle />
          <MobileNav />
        </nav>
      </div>
    </header>
  );
}

