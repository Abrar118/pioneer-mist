"use client";

import { SiteConfig } from "@/config/site";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center space-x-5 lg:space-x-7">
      <Link href="/" className="mr-4 flex items-center space-x-2.5 group">
        <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
          <Icons.logo className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold tracking-tight text-lg group-hover:text-primary transition-colors">
            {SiteConfig.name}
          </span>
          <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/15 text-accent-foreground border border-accent/20">
            Tribute
          </span>
        </div>
      </Link>
      <div className="hidden sm:flex items-center space-x-5 lg:space-x-6">
        <Link
          href="/blog"
          className={cn(
            "relative text-sm font-medium transition-colors hover:text-primary py-1.5",
            pathname === "/blog" ? "text-foreground font-semibold" : "text-foreground/60"
          )}
        >
          Blog
          {pathname === "/blog" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
          )}
        </Link>
        <Link
          href="/about"
          className={cn(
            "relative text-sm font-medium transition-colors hover:text-primary py-1.5",
            pathname === "/about" ? "text-foreground font-semibold" : "text-foreground/60"
          )}
        >
          About
          {pathname === "/about" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
          )}
        </Link>
        <Link
          href="/admin"
          className={cn(
            "relative text-sm font-medium transition-colors hover:text-primary py-1.5",
            pathname === "/admin" ? "text-foreground font-semibold" : "text-foreground/60"
          )}
        >
          Admin
          {pathname === "/admin" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
          )}
        </Link>
      </div>
    </nav>
  );
}

