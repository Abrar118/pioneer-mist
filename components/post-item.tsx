import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
}: PostItemProps) {
  // Simple reading time estimator based on title/description length
  const wordCount = (title + (description || "")).split(/\s+/).length + 150; // add base weight
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-border/50 bg-card hover:bg-card/85 p-6 hover:shadow-xl hover:-translate-y-1 hover:border-primary/25 transition-all duration-300">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {tags?.slice(0, 3).map((tag) => (
            <Tag tag={tag} key={tag} />
          ))}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
            <Link href={`/${slug}`} className="focus:outline-none">
              <span className="absolute inset-0 rounded-2xl" aria-hidden="true" />
              {title}
            </Link>
          </h3>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-5 text-xs md:text-sm font-medium text-muted-foreground select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground/80" />
            <time dateTime={date}>{formatDate(date)}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground/80" />
            <span>{readingTime} min read</span>
          </div>
        </div>
        <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
          Read <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </article>
  );
}

