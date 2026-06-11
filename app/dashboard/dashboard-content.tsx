"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  LogOut,
  LayoutDashboard,
  Settings,
  User,
  Activity,
  ShieldCheck,
  Database,
  Server,
  RefreshCw,
  Search,
  Bell,
  HardDrive,
  Cpu,
  Terminal,
  FileCode,
  ShieldAlert,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardContentProps {
  user: {
    name: string;
    email: string;
    role?: string;
  };
}

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "nodes" | "logs" | "settings">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/admin/login");
          },
        },
      });
    } catch (err) {
      console.error("Sign out error", err);
    } finally {
      setIsSigningOut(false);
    }
  };

  const triggerNodeSync = () => {
    setIsSyncing(true);
    setSyncStatus("Initiating cluster sync...");
    setTimeout(() => {
      setSyncStatus("Sync completed. All database nodes online.");
      setIsSyncing(false);
      setTimeout(() => setSyncStatus(null), 3000);
    }, 2000);
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-100 font-sans">
          
          {/* Shadcn App Sidebar */}
          <Sidebar 
            style={{ "--sidebar": "#000000" } as React.CSSProperties}
            className="border-r border-zinc-900 text-zinc-300"
          >
            <SidebarHeader className="border-b border-zinc-900 p-4 h-16 flex items-center">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-md bg-zinc-900 border border-zinc-800 text-white">
                  <Database className="h-4.5 w-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold tracking-tight text-white leading-none">Plumbflow</span>
                  <span className="text-[10px] text-zinc-500 font-mono mt-0.5">console_v4.2</span>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="p-2">
              <SidebarGroup>
                <SidebarGroupLabel className="text-zinc-500 text-[10px] uppercase tracking-wider px-3 py-2">
                  Navigation
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "overview"}
                        onClick={() => setActiveTab("overview")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "overview"
                            ? "bg-zinc-900 text-white font-medium border border-zinc-800"
                            : "hover:bg-zinc-900/60 hover:text-zinc-100 text-zinc-400"
                        }`}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Console Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "nodes"}
                        onClick={() => setActiveTab("nodes")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "nodes"
                            ? "bg-zinc-900 text-white font-medium border border-zinc-800"
                            : "hover:bg-zinc-900/60 hover:text-zinc-100 text-zinc-400"
                        }`}
                      >
                        <Server className="h-4 w-4" />
                        <span>Node Clusters</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "logs"}
                        onClick={() => setActiveTab("logs")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "logs"
                            ? "bg-zinc-900 text-white font-medium border border-zinc-800"
                            : "hover:bg-zinc-900/60 hover:text-zinc-100 text-zinc-400"
                        }`}
                      >
                        <ShieldCheck className="h-4 w-4" />
                        <span>Audit & Security</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "settings"}
                        onClick={() => setActiveTab("settings")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "settings"
                            ? "bg-zinc-900 text-white font-medium border border-zinc-800"
                            : "hover:bg-zinc-900/60 hover:text-zinc-100 text-zinc-400"
                        }`}
                      >
                        <Settings className="h-4 w-4" />
                        <span>System Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-zinc-900 p-4">
              <div className="flex items-center justify-between gap-2 p-1 bg-zinc-900/40 rounded-lg border border-zinc-900">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white text-xs font-semibold uppercase">
                    {user.name ? user.name[0] : "A"}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-medium text-white truncate">{user.name || "Admin"}</span>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                      {user.role || "Admin"}
                    </span>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Sidebar Inset Main Screen */}
          <SidebarInset className="flex flex-col flex-1 bg-zinc-950 overflow-hidden">
            {/* Nav Header */}
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-zinc-900 px-6 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-zinc-400 hover:text-white" />
                <Separator orientation="vertical" className="h-4 bg-zinc-800" />
                <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                  <span>console</span>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-zinc-200 capitalize">{activeTab}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] text-emerald-400 font-mono">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  ACTIVE GUARD
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  className="border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white bg-zinc-900/50 hover:bg-zinc-900 h-8 flex items-center gap-2 transition-all text-xs"
                >
                  {isSigningOut ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <LogOut className="h-3 w-3" />
                  )}
                  Sign Out
                </Button>
              </div>
            </header>

            {/* Viewport Dashboard Content */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Tab: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Page Title Header */}
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white">Console Overview</h1>
                    <p className="text-sm text-zinc-400 mt-1">
                      Real-time node synchronization throughput and environment orchestrations.
                    </p>
                  </div>

                  {/* Synchronize Notification Alert */}
                  {syncStatus && (
                    <div className="p-3 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                      <RefreshCw className="h-3.5 w-3.5 animate-spin text-zinc-400" />
                      <span>{syncStatus}</span>
                    </div>
                  )}

                  {/* 4 Grid Cards Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-zinc-900/40 border-zinc-800/80 shadow-md">
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">System Integrity</span>
                          <span className="text-xl font-semibold tracking-tight text-white block">99.98%</span>
                        </div>
                        <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                          <Activity className="h-5 w-5" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/40 border-zinc-800/80 shadow-md">
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Access Control</span>
                          <span className="text-xl font-semibold tracking-tight text-white block">3 Active</span>
                        </div>
                        <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                          <User className="h-5 w-5" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/40 border-zinc-800/80 shadow-md">
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">Active Nodes</span>
                          <span className="text-xl font-semibold tracking-tight text-white block">4 Online</span>
                        </div>
                        <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                          <Server className="h-5 w-5" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/40 border-zinc-800/80 shadow-md">
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">DB Sync Throughput</span>
                          <span className="text-xl font-semibold tracking-tight text-white block">14.2k ops/s</span>
                        </div>
                        <div className="p-2.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300">
                          <Database className="h-5 w-5" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* 2-Column Section: Telemetry Graph & Node Status */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* SVG Telemetry Chart */}
                    <Card className="lg:col-span-2 bg-zinc-900/20 border-zinc-800 shadow-md">
                      <CardHeader className="border-b border-zinc-900 pb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-md font-semibold text-white">Database Sync Telemetry</CardTitle>
                            <CardDescription className="text-xs text-zinc-500 mt-0.5">Real-time data replication traffic logs (last 24h)</CardDescription>
                          </div>
                          <Button
                            onClick={triggerNodeSync}
                            disabled={isSyncing}
                            className="bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs px-3 h-8 flex items-center gap-1.5 transition-all"
                          >
                            <RefreshCw className={`h-3 w-3 ${isSyncing ? "animate-spin" : ""}`} />
                            Sync Cluster
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="relative w-full h-[240px]">
                          {/* SVG Telemetry Graph */}
                          <svg viewBox="0 0 500 200" className="w-full h-full text-zinc-700 overflow-visible" preserveAspectRatio="none">
                            <defs>
                              <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            
                            {/* Grid Lines */}
                            <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="3,3" />
                            <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.04)" strokeDasharray="3,3" />
                            <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.04)" strokeDasharray="3,3" />
                            <line x1="0" y1="190" x2="500" y2="190" stroke="rgba(255,255,255,0.06)" />

                            {/* Gradient Area Fill */}
                            <path
                              d="M 0 190 Q 50 140 100 120 T 200 70 T 300 110 T 400 60 T 500 40 L 500 190 Z"
                              fill="url(#glowGradient)"
                            />

                            {/* White Plot Line */}
                            <path
                              d="M 0 190 Q 50 140 100 120 T 200 70 T 300 110 T 400 60 T 500 40"
                              fill="none"
                              stroke="rgba(255,255,255,0.85)"
                              strokeWidth="2.5"
                            />

                            {/* Hover Active Markers */}
                            <circle cx="200" cy="70" r="5" fill="#ffffff" stroke="rgba(0,0,0,0.8)" strokeWidth="2" />
                            <circle cx="400" cy="60" r="5" fill="#ffffff" stroke="rgba(0,0,0,0.8)" strokeWidth="2" />
                            
                            {/* Legend Labels */}
                            <text x="5" y="32" fill="rgba(255,255,255,0.3)" fontSize="8" fontFamily="monospace">Peak: 14.8k ops</text>
                          </svg>
                          
                          {/* Live Graph Badge */}
                          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded">
                            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            LIVE FEEDS
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-zinc-900 pt-4 mt-2">
                          <span>00:00 AM</span>
                          <span>06:00 AM</span>
                          <span>12:00 PM</span>
                          <span>06:00 PM</span>
                          <span>11:59 PM</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats Panel */}
                    <Card className="bg-zinc-900/20 border-zinc-800 shadow-md">
                      <CardHeader className="border-b border-zinc-900 pb-4">
                        <CardTitle className="text-md font-semibold text-white">Cluster Health</CardTitle>
                        <CardDescription className="text-xs text-zinc-500 mt-0.5">Database node resources</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        
                        {/* CPU Bar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-400 flex items-center gap-1.5">
                              <Cpu className="h-3.5 w-3.5 text-zinc-500" />
                              CPU Utilization
                            </span>
                            <span className="font-mono text-zinc-200">18.4%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                            <div className="h-full bg-white rounded-full" style={{ width: "18.4%" }} />
                          </div>
                        </div>

                        {/* Memory Bar */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-400 flex items-center gap-1.5">
                              <HardDrive className="h-3.5 w-3.5 text-zinc-500" />
                              Memory Allocation
                            </span>
                            <span className="font-mono text-zinc-200">42.1%</span>
                          </div>
                          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-850">
                            <div className="h-full bg-white rounded-full" style={{ width: "42.1%" }} />
                          </div>
                        </div>

                        {/* Node status indicators */}
                        <div className="pt-4 border-t border-zinc-900 space-y-2.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">primary-node-us</span>
                            <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-white px-2 py-0.5 rounded">ONLINE</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">replica-node-eu</span>
                            <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-white px-2 py-0.5 rounded">ONLINE</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-zinc-500">replica-node-ap</span>
                            <span className="text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-white px-2 py-0.5 rounded">ONLINE</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Logs Table */}
                  <Card className="bg-zinc-900/20 border-zinc-800 shadow-md">
                    <CardHeader className="border-b border-zinc-900 pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-md font-semibold text-white">Recent Security Logs</CardTitle>
                          <CardDescription className="text-xs text-zinc-500 mt-0.5">Audit trail of system modifications and access requests.</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => setActiveTab("logs")}
                          className="text-xs text-zinc-400 hover:text-white"
                        >
                          View All Audit Logs
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 px-0">
                      <Table>
                        <TableHeader className="border-b border-zinc-900">
                          <TableRow className="border-b border-zinc-900">
                            <TableHead className="text-zinc-400 text-xs px-6 font-medium">Timestamp</TableHead>
                            <TableHead className="text-zinc-400 text-xs font-medium">Operator</TableHead>
                            <TableHead className="text-zinc-400 text-xs font-medium">Event Code</TableHead>
                            <TableHead className="text-zinc-400 text-xs font-medium">Target Node</TableHead>
                            <TableHead className="text-zinc-400 text-xs text-right px-6 font-medium">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b border-zinc-900 hover:bg-zinc-900/20">
                            <TableCell className="font-mono text-zinc-500 text-xs px-6">13:30:12</TableCell>
                            <TableCell className="text-zinc-300 font-medium text-xs">{user.email}</TableCell>
                            <TableCell className="text-zinc-400 font-mono text-xs">console_session_init</TableCell>
                            <TableCell className="text-zinc-500 text-xs">local_client</TableCell>
                            <TableCell className="text-right px-6 text-xs text-emerald-400">Success</TableCell>
                          </TableRow>
                          <TableRow className="border-b border-zinc-900 hover:bg-zinc-900/20">
                            <TableCell className="font-mono text-zinc-500 text-xs px-6">13:12:04</TableCell>
                            <TableCell className="text-zinc-300 font-medium text-xs">node_daemon</TableCell>
                            <TableCell className="text-zinc-400 font-mono text-xs">db_replicate_users</TableCell>
                            <TableCell className="text-zinc-500 text-xs">replica-node-eu</TableCell>
                            <TableCell className="text-right px-6 text-xs text-emerald-400">Success</TableCell>
                          </TableRow>
                          <TableRow className="border-b border-zinc-900 hover:bg-zinc-900/20">
                            <TableCell className="font-mono text-zinc-500 text-xs px-6">12:54:19</TableCell>
                            <TableCell className="text-zinc-300 font-medium text-xs">cron_scheduler</TableCell>
                            <TableCell className="text-zinc-400 font-mono text-xs">backup_snapshot_full</TableCell>
                            <TableCell className="text-zinc-500 text-xs">replica-node-ap</TableCell>
                            <TableCell className="text-right px-6 text-xs text-emerald-400">Success</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Tab: Node Clusters */}
              {activeTab === "nodes" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white">Cluster Nodes</h1>
                    <p className="text-sm text-zinc-400 mt-1">
                      Operational latency, heartbeats, and synchronization states across nodes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-zinc-900/20 border-zinc-800">
                      <CardHeader className="pb-2 border-b border-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-white">primary-node-us</span>
                          <span className="px-2 py-0.5 rounded bg-zinc-900 text-white text-[10px] font-mono border border-zinc-800">ONLINE</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3 text-xs">
                        <div className="flex justify-between"><span className="text-zinc-500">IP Address:</span><span className="font-mono text-zinc-300">10.0.1.4</span></div>
                        <div className="flex justify-between"><span className="text-zinc-500">Latency:</span><span className="font-mono text-zinc-300">12ms</span></div>
                        <div className="flex justify-between"><span className="text-zinc-500">Synchronized:</span><span className="font-mono text-zinc-300">100%</span></div>
                      </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/20 border-zinc-800">
                      <CardHeader className="pb-2 border-b border-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-white">replica-node-eu</span>
                          <span className="px-2 py-0.5 rounded bg-zinc-900 text-white text-[10px] font-mono border border-zinc-800">ONLINE</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3 text-xs">
                        <div className="flex justify-between"><span className="text-zinc-500">IP Address:</span><span className="font-mono text-zinc-300">10.0.2.8</span></div>
                        <div className="flex justify-between"><span className="text-zinc-500">Latency:</span><span className="font-mono text-zinc-300">84ms</span></div>
                        <div className="flex justify-between"><span className="text-zinc-500">Synchronized:</span><span className="font-mono text-zinc-300">100%</span></div>
                      </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/20 border-zinc-800">
                      <CardHeader className="pb-2 border-b border-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-white">replica-node-ap</span>
                          <span className="px-2 py-0.5 rounded bg-zinc-900 text-white text-[10px] font-mono border border-zinc-800">ONLINE</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4 space-y-3 text-xs">
                        <div className="flex justify-between"><span className="text-zinc-500">IP Address:</span><span className="font-mono text-zinc-300">10.0.3.15</span></div>
                        <div className="flex justify-between"><span className="text-zinc-500">Latency:</span><span className="font-mono text-zinc-300">194ms</span></div>
                        <div className="flex justify-between"><span className="text-zinc-500">Synchronized:</span><span className="font-mono text-zinc-300">100%</span></div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Tab: Logs */}
              {activeTab === "logs" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white">Audit & Security Logs</h1>
                    <p className="text-sm text-zinc-400 mt-1">
                      System authentication records, access logs, and environmental changes.
                    </p>
                  </div>

                  <Card className="bg-zinc-900/20 border-zinc-800 shadow-md">
                    <CardHeader className="pb-4 border-b border-zinc-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                        <Input
                          placeholder="Search event logs..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 bg-zinc-900/50 border-zinc-800 text-white text-xs h-10 placeholder:text-zinc-600 focus-visible:ring-zinc-400"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader className="border-b border-zinc-900">
                          <TableRow className="border-b border-zinc-900">
                            <TableHead className="px-6 text-zinc-400 text-xs font-medium">Timestamp</TableHead>
                            <TableHead className="text-zinc-400 text-xs font-medium">User</TableHead>
                            <TableHead className="text-zinc-400 text-xs font-medium">Event Code</TableHead>
                            <TableHead className="text-zinc-400 text-xs font-medium">IP Address</TableHead>
                            <TableHead className="text-zinc-400 text-xs text-right px-6 font-medium">State</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="border-b border-zinc-900 hover:bg-zinc-900/10">
                            <TableCell className="font-mono text-zinc-500 text-xs px-6">2026-06-04 13:30:12</TableCell>
                            <TableCell className="text-zinc-300 font-medium text-xs">{user.email}</TableCell>
                            <TableCell className="text-zinc-400 font-mono text-xs">console_session_init</TableCell>
                            <TableCell className="text-zinc-500 text-xs font-mono">192.168.1.45</TableCell>
                            <TableCell className="text-right px-6 text-xs text-emerald-400 font-mono">OK</TableCell>
                          </TableRow>
                          <TableRow className="border-b border-zinc-900 hover:bg-zinc-900/10">
                            <TableCell className="font-mono text-zinc-500 text-xs px-6">2026-06-04 13:12:04</TableCell>
                            <TableCell className="text-zinc-300 font-medium text-xs">node_daemon</TableCell>
                            <TableCell className="text-zinc-400 font-mono text-xs">db_replicate_users</TableCell>
                            <TableCell className="text-zinc-500 text-xs font-mono">10.0.2.8</TableCell>
                            <TableCell className="text-right px-6 text-xs text-emerald-400 font-mono">OK</TableCell>
                          </TableRow>
                          <TableRow className="border-b border-zinc-900 hover:bg-zinc-900/10">
                            <TableCell className="font-mono text-zinc-500 text-xs px-6">2026-06-04 12:54:19</TableCell>
                            <TableCell className="text-zinc-300 font-medium text-xs">cron_scheduler</TableCell>
                            <TableCell className="text-zinc-400 font-mono text-xs">backup_snapshot_full</TableCell>
                            <TableCell className="text-zinc-500 text-xs font-mono">10.0.3.15</TableCell>
                            <TableCell className="text-right px-6 text-xs text-emerald-400 font-mono">OK</TableCell>
                          </TableRow>
                          <TableRow className="border-b border-zinc-900 hover:bg-zinc-900/10">
                            <TableCell className="font-mono text-zinc-500 text-xs px-6">2026-06-04 12:45:00</TableCell>
                            <TableCell className="text-zinc-300 font-medium text-xs">security_agent</TableCell>
                            <TableCell className="text-zinc-400 font-mono text-xs">vulnerability_scan_cron</TableCell>
                            <TableCell className="text-zinc-500 text-xs font-mono">10.0.1.4</TableCell>
                            <TableCell className="text-right px-6 text-xs text-emerald-400 font-mono">PASSED</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Tab: Settings */}
              {activeTab === "settings" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white">System Settings</h1>
                    <p className="text-sm text-zinc-400 mt-1">
                      Configure your Plumbflow administrative dashboard controls.
                    </p>
                  </div>

                  <Card className="bg-zinc-900/20 border-zinc-800 max-w-xl">
                    <CardHeader className="border-b border-zinc-900 pb-4">
                      <CardTitle className="text-md font-semibold text-white">General Configuration</CardTitle>
                      <CardDescription className="text-xs text-zinc-500 mt-0.5">Configure authentication guards and node thresholds.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="admin_email" className="text-zinc-300">Administrator Contact Email</Label>
                        <Input
                          id="admin_email"
                          defaultValue={user.email}
                          disabled
                          className="bg-zinc-900/50 border-zinc-800 text-white text-xs h-10 placeholder:text-zinc-650 focus-visible:ring-zinc-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sync_interval" className="text-zinc-300">Default Re-Sync Interval (seconds)</Label>
                        <Input
                          id="sync_interval"
                          type="number"
                          defaultValue="300"
                          className="bg-zinc-900/50 border-zinc-800 text-white text-xs h-10 placeholder:text-zinc-650 focus-visible:ring-zinc-400"
                        />
                      </div>

                      <Button className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold h-10 px-5 text-xs transition-all duration-200 mt-4">
                        Save System Configuration
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
