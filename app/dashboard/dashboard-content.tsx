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
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  Search,
  ChevronRight,
  DollarSign,
  MoreVertical,
  MapPin,
  Phone,
  Plus,
  RefreshCw,
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

// Stats Card Component
function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendLabel,
  backgroundColor = "bg-blue-900/20" 
}: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  trend?: number;
  trendLabel?: string;
  backgroundColor?: string;
}) {
  return (
    <Card className="bg-slate-50 border-slate-200 hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
            {trend !== undefined && (
              <p className={`text-xs mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${backgroundColor}`}>
            {Icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Job Card Component
function JobCard({ 
  id, 
  customerName, 
  service, 
  address, 
  time, 
  status,
  priority = "normal"
}: { 
  id: string;
  customerName: string; 
  service: string; 
  address: string; 
  time: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority?: 'high' | 'normal' | 'low';
}) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
  };

  const priorityColors = {
    high: 'text-red-600',
    normal: 'text-yellow-600',
    low: 'text-green-600',
  };

  return (
    <Card className="bg-white border-slate-200 hover:shadow-md transition-all cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-slate-900">{customerName}</h4>
            <p className="text-sm text-slate-600">{service}</p>
          </div>
          <span className={`px-2 py-1 rounded-md text-xs font-medium border ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <MapPin className="h-4 w-4 text-slate-500" />
            {address}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Clock className="h-4 w-4 text-slate-500" />
            {time}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <span className={`text-xs font-medium ${priorityColors[priority]}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </span>
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Sample mock data for demo purposes
const mockUpcomingJobs = [
  {
    id: "JOB001",
    customerName: "John Anderson",
    service: "Pipe Repair & Replacement",
    address: "123 Oak Street, Springfield",
    time: "9:00 AM - 11:30 AM",
    status: "pending" as const,
    priority: "high" as const,
  },
  {
    id: "JOB002",
    customerName: "Sarah Mitchell",
    service: "Water Heater Installation",
    address: "456 Elm Avenue, Downtown",
    time: "1:00 PM - 3:00 PM",
    status: "pending" as const,
    priority: "normal" as const,
  },
  {
    id: "JOB003",
    customerName: "Michael Chen",
    service: "Drain Cleaning & Inspection",
    address: "789 Pine Road, North Side",
    time: "3:30 PM - 4:30 PM",
    status: "pending" as const,
    priority: "normal" as const,
  },
];

const mockRecentActivity = [
  { id: 1, action: "Job Completed", details: "Pipe repair at 123 Oak St completed by Mike Johnson", time: "2 hours ago", type: "completed" },
  { id: 2, action: "Worker Assigned", details: "David Lee assigned to JOB003 - Drain Cleaning", time: "1 hour ago", type: "assigned" },
  { id: 3, action: "Customer Booking", details: "New booking from Emily Rodriguez for plumbing inspection", time: "45 minutes ago", type: "booking" },
  { id: 4, action: "Invoice Generated", details: "Invoice #INV-2026-0145 created for Sarah Mitchell", time: "30 minutes ago", type: "invoice" },
  { id: 5, action: "System Alert", details: "3 jobs scheduled for tomorrow morning", time: "15 minutes ago", type: "alert" },
];

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "jobs" | "customers" | "team" | "reports" | "settings">("home");

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

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-slate-50 text-slate-900 font-sans">
          
          {/* Admin Sidebar */}
          <Sidebar className="border-r border-slate-200 bg-white">
            <SidebarHeader className="border-b border-slate-200 p-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-blue-600">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">PlumbFlow</span>
                  <span className="text-xs text-slate-500">Admin Dashboard</span>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="p-2">
              <SidebarGroup>
                <SidebarGroupLabel className="text-slate-500 text-xs uppercase tracking-wider px-3 py-2">
                  Main Menu
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "home"}
                        onClick={() => setActiveTab("home")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "home"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "jobs"}
                        onClick={() => setActiveTab("jobs")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "jobs"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Wrench className="h-4 w-4" />
                        <span>Jobs</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "customers"}
                        onClick={() => setActiveTab("customers")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "customers"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Users className="h-4 w-4" />
                        <span>Customers</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "team"}
                        onClick={() => setActiveTab("team")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "team"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <User className="h-4 w-4" />
                        <span>Team</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "reports"}
                        onClick={() => setActiveTab("reports")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "reports"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <TrendingUp className="h-4 w-4" />
                        <span>Reports</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel className="text-slate-500 text-xs uppercase tracking-wider px-3 py-2">
                  Settings
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={activeTab === "settings"}
                        onClick={() => setActiveTab("settings")}
                        className={`w-full justify-start gap-3 px-3 py-2 rounded-md transition-colors ${
                          activeTab === "settings"
                            ? "bg-blue-100 text-blue-700 font-medium"
                            : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-slate-200 p-4">
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                    {user.name ? user.name[0] : "A"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-900 truncate">{user.name || "Admin"}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  className="w-full border-slate-300 text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 h-8 text-xs"
                >
                  {isSigningOut ? (
                    <RefreshCw className="h-3 w-3 animate-spin mr-2" />
                  ) : (
                    <LogOut className="h-3 w-3 mr-2" />
                  )}
                  Sign Out
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content Area */}
          <SidebarInset className="flex flex-col flex-1 bg-slate-50 overflow-hidden">
            {/* Top Navbar */}
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-200 px-6 bg-white sticky top-0 z-40">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-slate-600 hover:text-slate-900" />
                <h2 className="text-lg font-semibold text-slate-900">
                  {activeTab === "home" && "Dashboard"}
                  {activeTab === "jobs" && "Jobs"}
                  {activeTab === "customers" && "Customers"}
                  {activeTab === "team" && "Team"}
                  {activeTab === "reports" && "Reports"}
                  {activeTab === "settings" && "Settings"}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </header>

            {/* Dashboard Content */}
            <main className="flex-1 overflow-y-auto p-6">
              
              {/* HOME TAB - ADMIN DASHBOARD */}
              {activeTab === "home" && (
                <div className="space-y-6 animate-in fade-in">
                  
                  {/* Welcome Header */}
                  <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white shadow-md">
                    <h1 className="text-3xl font-bold">Welcome back, {user.name || "Admin"}! 👋</h1>
                    <p className="mt-2 text-blue-100">Here's your business summary for today</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard 
                      title="Today's Jobs"
                      value="8"
                      icon={<Wrench className="h-5 w-5 text-blue-500" />}
                      trend={12}
                      trendLabel="vs yesterday"
                      backgroundColor="bg-blue-100"
                    />
                    <StatsCard 
                      title="Pending Jobs"
                      value="3"
                      icon={<AlertCircle className="h-5 w-5 text-yellow-500" />}
                      trend={-5}
                      trendLabel="vs yesterday"
                      backgroundColor="bg-yellow-100"
                    />
                    <StatsCard 
                      title="Completed Today"
                      value="5"
                      icon={<CheckCircle className="h-5 w-5 text-green-500" />}
                      trend={8}
                      trendLabel="vs yesterday"
                      backgroundColor="bg-green-100"
                    />
                    <StatsCard 
                      title="Today's Revenue"
                      value="$2,450"
                      icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
                      trend={15}
                      trendLabel="vs yesterday"
                      backgroundColor="bg-emerald-100"
                    />
                  </div>

                  {/* Main Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Upcoming Jobs - 2 columns */}
                    <div className="lg:col-span-2">
                      <Card className="border-slate-200 bg-white shadow-sm">
                        <CardHeader className="border-b border-slate-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-slate-900">Upcoming Jobs</CardTitle>
                              <CardDescription className="text-slate-500 mt-1">
                                Jobs scheduled for today
                              </CardDescription>
                            </div>
                            <Button variant="outline" size="sm" className="border-slate-300 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              View All
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {mockUpcomingJobs.map((job) => (
                              <JobCard key={job.id} {...job} />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <Card className="border-slate-200 bg-white shadow-sm">
                        <CardHeader>
                          <CardTitle className="text-slate-900 text-base">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
                            <Plus className="h-4 w-4 mr-2" />
                            New Job
                          </Button>
                          <Button variant="outline" className="w-full border-slate-300 justify-start text-slate-600 hover:text-slate-900">
                            <Users className="h-4 w-4 mr-2" />
                            Add Customer
                          </Button>
                          <Button variant="outline" className="w-full border-slate-300 justify-start text-slate-600 hover:text-slate-900">
                            <Calendar className="h-4 w-4 mr-2" />
                            View Calendar
                          </Button>
                        </CardContent>
                      </Card>

                      <Card className="bg-linear-to-br from-blue-50 to-indigo-50 shadow-sm border-blue-200">
                        <CardContent className="p-4">
                          <p className="text-sm font-medium text-slate-900 mb-2">Active Workers</p>
                          <p className="text-2xl font-bold text-blue-600">12</p>
                          <p className="text-xs text-slate-500 mt-1">On active jobs</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader className="border-b border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-slate-900">Recent Activity</CardTitle>
                          <CardDescription className="text-slate-500 mt-1">
                            Latest actions from your business
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {mockRecentActivity.map((activity) => (
                          <div key={activity.id} className="flex gap-4 pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                            <div className="shrink-0 pt-1">
                              <div className="h-2 w-2 rounded-full bg-blue-600 mt-1.5"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                              <p className="text-sm text-slate-600 mt-0.5">{activity.details}</p>
                              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                </div>
              )}

              {/* JOBS TAB */}
              {activeTab === "jobs" && (
                <div className="space-y-6 animate-in fade-in">
                  <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-slate-900">All Jobs</CardTitle>
                      <CardDescription className="text-slate-500">Manage and track all plumbing jobs</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockUpcomingJobs.map((job) => (
                          <JobCard key={job.id} {...job} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* CUSTOMERS TAB */}
              {activeTab === "customers" && (
                <div className="space-y-6 animate-in fade-in">
                  <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-slate-900">Customers</CardTitle>
                      <CardDescription className="text-slate-500">Manage your customer database</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">Customer management interface coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* TEAM TAB */}
              {activeTab === "team" && (
                <div className="space-y-6 animate-in fade-in">
                  <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-slate-900">Team Members</CardTitle>
                      <CardDescription className="text-slate-500">Manage your plumbing team</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">Team management interface coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* REPORTS TAB */}
              {activeTab === "reports" && (
                <div className="space-y-6 animate-in fade-in">
                  <Card className="border-slate-200 bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-slate-900">Reports</CardTitle>
                      <CardDescription className="text-slate-500">View business analytics and reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">Reports dashboard coming soon...</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === "settings" && (
                <div className="space-y-6 animate-in fade-in">
                  <Card className="border-slate-200 bg-white shadow-sm max-w-2xl">
                    <CardHeader className="border-b border-slate-200">
                      <CardTitle className="text-slate-900">System Settings</CardTitle>
                      <CardDescription className="text-slate-500">Configure your dashboard preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="company_email" className="text-slate-900">Company Email</Label>
                        <Input
                          id="company_email"
                          defaultValue={user.email}
                          disabled
                          className="bg-slate-100 border-slate-200 text-slate-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="admin_name" className="text-slate-900">Admin Name</Label>
                        <Input
                          id="admin_name"
                          defaultValue={user.name}
                          disabled
                          className="bg-slate-100 border-slate-200 text-slate-900"
                        />
                      </div>

                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Save Settings
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
