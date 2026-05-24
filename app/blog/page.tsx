"use client";
import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortPosts, sortTagsByCount } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Search, Compass, BookOpen, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Get all published posts
  const allPosts = useMemo(() => {
    return sortPosts(posts.filter((post) => post.published));
  }, []);

  // 2. Filter posts by search query and selected tag
  const filteredPosts = useMemo(() => {
    let result = allPosts;

    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return result;
  }, [allPosts, searchQuery, selectedTag]);

  // 3. Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const displayPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  // 4. Tags catalog
  const tags = useMemo(() => getAllTags(allPosts), [allPosts]);
  const sortedTags = useMemo(() => sortTagsByCount(tags), [tags]);

  // Reset page when filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTagSelect = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null); // toggle off
    } else {
      setSelectedTag(tag);
    }
    setCurrentPage(1);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background radial halos */}
      <div className="absolute top-20 right-1/4 -z-10 w-[400px] h-[400px] rounded-full bg-radial-glow blur-3xl opacity-40" />
      <div className="absolute bottom-20 left-1/4 -z-10 w-[500px] h-[500px] rounded-full bg-accent-glow blur-3xl opacity-30" />

      <div className="container max-w-7xl mx-auto py-10 md:py-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <BookOpen className="h-3 w-3" />
              Tribute Archive
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">Blogs and Memories</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Explore the collective memories, journals, and heartfelt tributes written by MIST students and alumni.
            </p>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="relative max-w-md w-full mb-8 group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="text"
            placeholder="Search blogs, tags, topics..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-11 h-12 rounded-xl bg-card border-border/80 shadow-xs focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:ring-1"
          />
        </div>

        {/* Main Grid content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Posts Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {displayPosts?.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {displayPosts.map((post) => (
                    <PostItem
                      key={post.slug}
                      slug={post.slug}
                      date={post.date}
                      title={post.title}
                      description={post.description}
                      tags={post.tags}
                    />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 text-sm font-semibold rounded-xl border border-border/60 bg-card hover:bg-muted disabled:opacity-50 disabled:pointer-events-none transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-sm font-medium text-muted-foreground">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 text-sm font-semibold rounded-xl border border-border/60 bg-card hover:bg-muted disabled:opacity-50 disabled:pointer-events-none transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 px-6 border border-dashed rounded-2xl bg-card/50">
                <AlertCircle className="h-10 w-10 text-muted-foreground/80 mb-3" />
                <h3 className="text-lg font-bold">No results found</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  We couldn't find any tribute matching your search query or selected tag. Try resetting the filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag(null);
                  }}
                  className="mt-4 text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar - Tags Catalogue */}
          <aside className="lg:col-span-4 sticky top-24">
            <Card className="rounded-2xl border border-border/50 shadow-xs bg-card/80 backdrop-blur-xs">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Compass className="h-4.5 w-4.5 text-primary" />
                  Filter by Tag
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5 flex flex-wrap gap-2.5">
                {sortedTags?.map((tag) => {
                  const isSelected = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 select-none ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-xs scale-95"
                          : "bg-muted/40 hover:bg-muted text-muted-foreground border-border/80 hover:text-foreground"
                      }`}
                    >
                      #{tag}
                      <span className={`ml-1.5 px-1 py-0.2 rounded-full text-[9px] ${
                        isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                      }`}>
                        {tags[tag]}
                      </span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
