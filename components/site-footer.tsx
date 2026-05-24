import { SiteConfig } from "@/config/site";
import { Mail } from "lucide-react";
import { Icons } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xs mt-20">
      <div className="container max-w-7xl mx-auto py-10 md:py-14 flex flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-sm font-semibold tracking-tight text-foreground">
            {SiteConfig.name}
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-left max-w-md">
            Dedicated in solemn memory of Shykh Aashhabul Yamin, Md. Rakibul Hussein, and all the courageous students of the Military Institute of Science and Technology.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center space-x-4">
            <a 
              target="_blank" 
              rel="noreferrer" 
              href="mailto:hello@example.com"
              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <span className="sr-only">Mail</span>
              <Mail className="h-5 w-5" />
            </a>
            <a 
              target="_blank" 
              rel="noreferrer" 
              href={SiteConfig.links.github}
              className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200"
            >
              <span className="sr-only">GitHub</span>
              <Icons.gitHub className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SiteConfig.author}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

