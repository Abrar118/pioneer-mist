import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SiteConfig } from "@/config/site";
import type { Metadata } from "next";
import Image from "next/image";
import { Award, Calendar, Heart, Shield, Milestone } from "lucide-react";

export const metadata: Metadata = {
  title: "About Pioneers of MIST",
  description: "Honoring the brave students and martyrs of the Military Institute of Science and Technology.",
};

export default async function AboutPage() {
  const timeline = [
    {
      date: "July 18, 2024",
      title: "The Sacrifice of Yamin",
      description: "Shykh Aashhabul Yamin, a student of CSE-21, stood at the forefront of the student movement. He was shot and martyred near Savar while defending his fellow classmates, sparking a wave of resolve across MIST.",
      icon: Shield,
      color: "border-emerald-500 bg-emerald-500/10 text-emerald-500"
    },
    {
      date: "August 5, 2024",
      title: "The Final Stand of Rakib",
      description: "Md. Rakibul Hussein (ME-11), an alumnus and professional engineer, returned to the streets to stand in solidarity with the students. He was martyred on this decisive day, just hours before victory was achieved.",
      icon: Award,
      color: "border-amber-500 bg-amber-500/10 text-amber-500"
    },
    {
      date: "Late August 2024",
      title: "Establishment of Pioneers of MIST",
      description: "The MIST student community established this portal as a digital memory capsule. It serves as an archive of blogs, poetry, and stories, ensuring that the legacy of our heroes is passed to future batches.",
      icon: Milestone,
      color: "border-primary bg-primary/10 text-primary"
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background glow meshes */}
      <div className="absolute top-20 left-1/4 -z-10 w-[450px] h-[450px] rounded-full bg-radial-glow blur-3xl opacity-40" />
      <div className="absolute bottom-20 right-1/4 -z-10 w-[450px] h-[450px] rounded-full bg-accent-glow blur-3xl opacity-35" />

      <div className="container max-w-5xl mx-auto py-10 md:py-16">
        {/* Editorial Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
            <Heart className="h-3.5 w-3.5 fill-primary text-primary" />
            Solemn Memorial Page
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-balance">
            Honoring Our <span className="bg-linear-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Pioneers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-balance">
            A digital memory space dedicated to preserving the stories, voices, and immense sacrifices of MIST students who stood on the side of justice and reform.
          </p>
        </div>

        {/* Tribute Spotlights Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Card 1: Yamin */}
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 flex flex-col items-center text-center hover:shadow-xl hover:border-primary/20 transition-all duration-300">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary mb-4 shadow-md bg-muted">
              <Image src="/SY_profile.jpg" fill alt="Shykh Aashhabul Yamin" className="object-cover" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Shykh Aashhabul Yamin</h2>
            <p className="text-sm font-semibold text-emerald-500 mt-1">Martyr • Computer Science (CSE-21)</p>
            
            {/* Quick Metadata Box */}
            <div className="grid grid-cols-2 gap-4 w-full bg-muted/40 rounded-xl p-3 my-4 border border-border/40 text-xs">
              <div className="text-left">
                <span className="text-muted-foreground block">MIST Batch</span>
                <span className="font-semibold text-foreground">CSE-21 Batch</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground block">Martyrdom</span>
                <span className="font-semibold text-foreground">July 18, 2024</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed text-justify">
              Yamin was an incredibly brilliant and energetic student in MIST's Department of Computer Science and Engineering. He was beloved by all classmates for his helpful nature, quick learning abilities, and vibrant spirit. He laid down his life while defending the values of freedom and justice.
            </p>
          </div>

          {/* Card 2: Rakib */}
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 flex flex-col items-center text-center hover:shadow-xl hover:border-accent/20 transition-all duration-300">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-accent mb-4 shadow-md bg-muted">
              <Image src="/SR_profile.png" fill alt="Md. Rakibul Hussein" className="object-cover" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Md. Rakibul Hussein</h2>
            <p className="text-sm font-semibold text-amber-500 mt-1">Martyr • Mechanical (ME-11)</p>

            {/* Quick Metadata Box */}
            <div className="grid grid-cols-2 gap-4 w-full bg-muted/40 rounded-xl p-3 my-4 border border-border/40 text-xs">
              <div className="text-left">
                <span className="text-muted-foreground block">MIST Batch</span>
                <span className="font-semibold text-foreground">ME-11 Alumnus</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground block">Martyrdom</span>
                <span className="font-semibold text-foreground">August 5, 2024</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed text-justify">
              Rakib was a charismatic alumnus of MIST batch 2013 (Mechanical Engineering). Despite having graduated and working as a professional engineer, he returned to the student marches, driven by his lifelong commitment to standing beside people in need. He fell hours before victory.
            </p>
          </div>
        </div>

        {/* Editorial Tribute Details */}
        <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xs p-6 md:p-10 mb-20 space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Our Mission & Purpose</h2>
          <p className="text-muted-foreground text-md leading-relaxed text-justify">
            Our platform serves as an open space for MISTians to share their poetry, essays, first-hand experiences, and reflections. The student community at MIST has historically been a hub of scientific curiosity and excellence, but during the historic events of July and August 2024, our students proved they also held deep, unshakable courage.
          </p>
          <p className="text-muted-foreground text-md leading-relaxed text-justify">
            By building this digital memorial, we make sure that our classmates, seniors, and alumni who paid the ultimate price are not reduced to simple names on a wall. We recount their days, their humor, their quick coding skills, their friendly guidance, and their absolute bravery.
          </p>
          <div className="border-l-4 border-primary pl-6 my-6 italic text-lg text-foreground/95 bg-muted/30 py-3 rounded-r-xl">
            "Tales of your days will be told, under the sun, on the south sea shores. We will carry the anchor and the ship, keeping your memory alive for all eternity."
          </div>
        </div>

        {/* Visual Milestones Timeline */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Timeline of Honor</h2>
            <p className="text-muted-foreground">Key dates that defined our resolve and memory archive.</p>
          </div>

          <div className="relative border-l-2 border-border/60 ml-4 md:ml-32 pl-8 md:pl-10 py-2 space-y-12 max-w-3xl mx-auto">
            {timeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative group">
                  {/* Timeline Badge Dot */}
                  <div className={`absolute left-[-45px] md:left-[-53px] top-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-xs z-10 bg-background ${item.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  {/* Timeline content card */}
                  <div className="space-y-2 p-5 rounded-2xl border border-border bg-card group-hover:shadow-md hover:border-primary/20 transition-all duration-300">
                    <span className="text-xs font-bold text-primary tracking-wide block uppercase">
                      {item.date}
                    </span>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
