"use client";
import React, { useState } from "react";
import { 
  Settings, 
  Database, 
  FileText, 
  Users, 
  Heart, 
  CheckCircle, 
  Clock, 
  Plus, 
  Flame, 
  Globe 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([
    { id: 1, author: "Yasin_CSE21", type: "Blog Draft", title: "Memory of Yamin's first terminal code", status: "Approved", time: "2 hours ago" },
    { id: 2, author: "Mahmud_ME14", type: "Photo Archive", title: "Rakib Vai at the batch sports day", status: "Approved", time: "1 day ago" },
    { id: 3, author: "Anika_EE22", type: "Poem Draft", title: "A silent prayer for Savar Martyrs", status: "Pending Review", time: "3 days ago" },
    { id: 4, author: "MISTian_99", type: "Editorial", title: "Why we fought: The story of August 5", status: "Pending Review", time: "4 days ago" }
  ]);

  const stats = [
    { title: "Total Tributes", value: "7 Published", desc: "+2 in moderation queue", icon: FileText, color: "text-emerald-500 bg-emerald-500/10" },
    { title: "Media Archives", value: "50 Files", desc: "100% cloud nodes active", icon: Database, color: "text-blue-500 bg-blue-500/10" },
    { title: "Tribute Guardians", value: "1,240 Active", desc: "MIST student community", icon: Users, color: "text-amber-500 bg-amber-500/10" },
    { title: "Memorial Uptime", value: "99.99%", desc: "Hosted on Vercel nodes", icon: Globe, color: "text-purple-500 bg-purple-500/10" }
  ];

  const handleAction = (actionName: string) => {
    toast.success(`Action Triggered: ${actionName}`, {
      description: "This is a mock admin console. In production, this connects to the database.",
    });
  };

  return (
    <div className="relative min-h-screen">
      {/* Glow Halo Circles */}
      <div className="absolute top-20 left-1/4 -z-10 w-[400px] h-[400px] rounded-full bg-radial-glow blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-1/4 -z-10 w-[400px] h-[400px] rounded-full bg-accent-glow blur-3xl opacity-25" />

      <div className="container max-w-7xl mx-auto py-10 md:py-16 space-y-10">
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
              <Settings className="h-3.5 w-3.5 animate-spin duration-3000" />
              Tribute Database Portal
            </div>
            <h1 className="text-4xl font-black tracking-tight">Memorial Dashboard</h1>
            <p className="text-muted-foreground text-md">
              Maintain memory indexes, review student drafts, and regulate the Pioneers of MIST archive node.
            </p>
          </div>
          <Button 
            onClick={() => handleAction("Create New Post")} 
            className="rounded-xl font-semibold shadow-md inline-flex items-center gap-1.5 w-full md:w-auto"
          >
            <Plus className="h-4 w-4" /> Create Archive Entry
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="rounded-2xl border border-border/50 shadow-sm bg-card hover:border-primary/20 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-semibold text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-xl ${stat.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                  <CardDescription className="text-xs">{stat.desc}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Action Panel & Queue Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Moderation Queue */}
          <Card className="lg:col-span-8 rounded-2xl border border-border/50 shadow-sm bg-card/85 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-primary" />
                Moderation & Review Stream
              </CardTitle>
              <CardDescription>Review submitted posts, poems, and media assets from MIST batchmates.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border/40">
                {submissions.map((sub) => (
                  <div key={sub.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-4 group">
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{sub.type}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{sub.time}</span>
                      </div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{sub.title}</h4>
                      <p className="text-xs text-muted-foreground">Submitted by: <span className="font-mono">{sub.author}</span></p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        sub.status === "Approved" 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                        {sub.status}
                      </span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAction(`Manage ${sub.author}'s Draft`)}
                        className="h-8 rounded-lg text-xs"
                      >
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Config Control Card */}
          <Card className="lg:col-span-4 rounded-2xl border border-border/50 shadow-sm bg-card/80 backdrop-blur-sm">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-accent" />
                Quick Config
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-3">
                <Button 
                  onClick={() => handleAction("Synchronize velite content")} 
                  className="w-full justify-start rounded-xl font-semibold border-border/60 hover:bg-muted"
                  variant="outline"
                >
                  <Database className="h-4 w-4 mr-2 text-primary" /> Synchronize Content Node
                </Button>
                <Button 
                  onClick={() => handleAction("Export backup")} 
                  className="w-full justify-start rounded-xl font-semibold border-border/60 hover:bg-muted"
                  variant="outline"
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-blue-500" /> Export Backup Archive (.json)
                </Button>
                <Button 
                  onClick={() => handleAction("Guard Settings")} 
                  className="w-full justify-start rounded-xl font-semibold border-border/60 hover:bg-muted"
                  variant="outline"
                >
                  <Heart className="h-4 w-4 mr-2 text-red-500 fill-red-500/10" /> Regulate Moderation Guidelines
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border/40 text-xs text-muted-foreground leading-relaxed text-left">
                <strong>Moderation Protocol:</strong> In keeping with MIST's dedication to honoring our martyred pioneers Shykh Aashhabul Yamin & Md. Rakibul Hussein, all submissions must remain respectful, factual, and strictly focused on student tributes.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
