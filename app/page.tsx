import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type TributeCard = {
  src: string;
  eyebrow: string;
  title: string;
  href: string;
};

const heroSmallCards: TributeCard[] = [
  { src: "/sr1.jpg", eyebrow: "Rakib • ME-11", title: "Our heroic Alumnus Rakib Vai", href: "/blog/rakib-vai" },
  { src: "/SY_MISTDS.jpg", eyebrow: "Yamin • CSE-21", title: "First Offline Class", href: "/blog/first-offline-class" }
];

const featureCard = {
  src: "/SY_MIC.jpg",
  eyebrow: "Yamin • CSE-21",
  title: "In Memory of My Brave Friend, Yamin",
  sub: "MIST CSE-21 • Martyred July 18, 2024",
  href: "/blog/yamin-poem"
};

const popularCards: TributeCard[] = [
  { src: "/p1.jpeg", eyebrow: "Yamin • Game-Development", title: "Yamin's Appreciation for My Game Development", href: "/blog/rubaid-game" },
  { src: "/rub1.jpg", eyebrow: "Internship • DESCO", title: "Industrial Attachment", href: "/blog/internship" },
  { src: "/rub2.jpg", eyebrow: "ARCED • Research", title: "ARCED Foundation Research Program", href: "/blog/arced-java" }
];

function CardLink({ card, className }: { card: TributeCard; className?: string }) {
  return (
    <Link
      href={card.href}
      className={cn("group relative overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
    >
      <Image
        src={card.src}
        alt={card.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
          {card.eyebrow}
        </span>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug text-white line-clamp-2 group-hover:underline group-hover:decoration-white/40">
          {card.title}
        </h3>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section — editorial card grid */}
      <section className="bg-hero-bg text-hero-fg">
        <div className="container mx-auto pt-6 pb-16 md:pb-24">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            {/* Stacked small cards (left) */}
            <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-1">
              {heroSmallCards.map((card) => (
                <CardLink key={card.href} card={card} className="h-64 sm:h-72 lg:h-auto lg:min-h-[350px]" />
              ))}
            </div>

            {/* Feature card (right) */}
            <Link
              href={featureCard.href}
              className="group relative min-h-[420px] overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[480px] lg:col-span-3 lg:min-h-0"
            >
              <Image
                src={featureCard.src}
                alt={featureCard.title}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                  {featureCard.eyebrow}
                </span>
                <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                  {featureCard.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors group-hover:bg-black/60">
                    Read Article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                    <span className="h-5 w-5 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600" />
                    {featureCard.sub}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Most Popular Articles — lavender band */}
      <section className="bg-[#cdc5e6] text-[#17142b] dark:bg-[#161329] dark:text-white">
        <div className="container mx-auto py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Our most
                <br />
                popular articles
              </h2>
              <p className="mt-4 max-w-md text-sm text-[#46426b] md:text-base dark:text-white/60">
                Tributes, poems, and journals shared by classmates, batchmates, and friends.
              </p>
            </div>
            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#17142b] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2a2745] dark:bg-white dark:text-[#17142b] dark:hover:bg-white/90"
            >
              Read All Article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            {popularCards.map((card) => (
              <CardLink key={card.href} card={card} className="h-72 md:h-80" />
            ))}
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
    </div>
  );
}
