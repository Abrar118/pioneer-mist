"use client";
import { buttonVariants } from "@/components/ui/button";
import { SiteConfig } from "@/config/site";
import { cn, sortPosts } from "@/lib/utils";
import { posts } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Home() {
  const latestPosts = sortPosts(posts).filter(post => post.published).slice(0, 4);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slideshow = [
    { src: "/SY_MIC.jpg", caption: "Shykh Aashhabul Yamin at MIST Campus", subtitle: "CSE-21 Student, Martyred July 18, 2024" },
    { src: "/sr1.jpg", caption: "Md. Rakibul Hussein participating in Student Movement", subtitle: "ME-11 Alumnus, Martyred August 5, 2024" },
    { src: "/SY_MISTDS.jpg", caption: "Yamin with MIST Debating Society", subtitle: "Inspirational debater and brilliant programmer" },
    { src: "/sr2.jpg", caption: "Shahid Rakib - standing firm on the side of justice", subtitle: "Charismatic leader and dedicated professional" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshow.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Halo Glows */}
      <div className="absolute top-20 left-1/4 -z-10 w-[400px] h-[400px] rounded-full bg-radial-glow blur-3xl opacity-60" />
      <div className="absolute top-[500px] right-1/4 -z-10 w-[500px] h-[500px] rounded-full bg-accent-glow blur-3xl opacity-50" />

      {/* Hero Section */}
      <section className="container max-w-7xl mx-auto pt-8 pb-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 md:pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Honoring MISTian Martyrs
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none text-balance">
              Pioneers of <span className="bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">MIST</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed">
              Paying solemn tribute to the brave students who laid down their lives and fought tirelessly for rights, justice, and reform at the Military Institute of Science and Technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-full sm:w-fit font-semibold px-6 shadow-md hover:shadow-lg transition-all"
                )}
              >
                View Tribute Blogs
              </Link>
              <Link
                href={SiteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full sm:w-fit font-semibold px-6 border-border/80 hover:bg-muted"
                )}
              >
                MIST Official Website
              </Link>
            </div>
          </div>

          {/* Hero Right Slideshow Carousel */}
          <div className="lg:col-span-5 relative w-full h-[380px] sm:h-[450px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl border border-border/40 group bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={slideshow[currentImageIndex].src}
                  alt={slideshow[currentImageIndex].caption}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 md:opacity-90" />
              </motion.div>
            </AnimatePresence>

            {/* Slideshow Details Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end text-left select-none pointer-events-none z-20">
              <h4 className="text-lg md:text-xl font-bold text-foreground line-clamp-1">
                {slideshow[currentImageIndex].caption}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                {slideshow[currentImageIndex].subtitle}
              </p>
              {/* Pagination Dots */}
              <div className="flex gap-1.5 mt-4">
                {slideshow.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-7 h-1.5 rounded-full pointer-events-auto transition-all duration-300",
                      index === currentImageIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tribute Spotlights */}
      <section className="container max-w-7xl mx-auto py-16 border-t border-border/40">
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Featured Hero Spotlights</h2>
          <p className="text-muted-foreground">
            Remembering our bright classmates and seniors who fought courageously until their last breath.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Spotlight 1: Shykh Aashhabul Yamin */}
          <div className="relative group overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start hover:shadow-xl hover:border-primary/20 hover:shadow-primary/5 transition-all duration-300">
            <div className="relative w-36 h-36 shrink-0 rounded-xl overflow-hidden border border-border/60">
              <Image 
                src="/SY_profile.jpg" 
                fill 
                alt="Shykh Aashhabul Yamin" 
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col text-left justify-center flex-1">
              <span className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                Martyr • CSE-21
              </span>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">Shykh Aashhabul Yamin</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                A brilliant, kind-hearted student of Computer Science & Engineering batch 2021 who stood firm in his values and sacrificed his life on July 18, 2024.
              </p>
              <Link 
                href="/blog/yamin-poem" 
                className="text-xs font-semibold text-primary hover:underline mt-4 inline-flex items-center gap-1 group/link"
              >
                Read Yamin's Tribute <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Spotlight 2: Md. Rakibul Hussein */}
          <div className="relative group overflow-hidden rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start hover:shadow-xl hover:border-accent/20 hover:shadow-accent/5 transition-all duration-300">
            <div className="relative w-36 h-36 shrink-0 rounded-xl overflow-hidden border border-border/60">
              <Image 
                src="/SR_profile.png" 
                fill 
                alt="Md. Rakibul Hussein" 
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col text-left justify-center flex-1">
              <span className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-500/20 mb-2">
                Martyr • ME-11 Alumnus
              </span>
              <h3 className="text-xl font-bold group-hover:text-accent transition-colors">Md. Rakibul Hussein</h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                A highly charismatic Mechanical Engineering alumnus (batch 2013) known for helping others, who stepped forward during the protests and died for freedom on August 5, 2024.
              </p>
              <Link 
                href="/blog/rakib-vai" 
                className="text-xs font-semibold text-accent hover:underline mt-4 inline-flex items-center gap-1 group/link"
              >
                Read Rakib's Tribute <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Grid Section */}
      <section className="container max-w-7xl mx-auto py-16 border-t border-border/40">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Latest Tribute Posts</h2>
            <p className="text-muted-foreground">
              Read personal stories, poems, and journals shared by classmates, batchmates, and friends.
            </p>
          </div>
          <Link
            href="/blog"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "gap-1 group/all shrink-0 font-semibold"
            )}
          >
            See all blogs <ArrowRight className="h-4 w-4 group-hover/all:translate-x-1 transition-transform" />
          </Link>
        </div>

        {latestPosts?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestPosts.map((post) => (
              <PostItem
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-2xl bg-card">
            <p className="text-muted-foreground">No posts published yet.</p>
          </div>
        )}
      </section>
    </div>
  );
}
