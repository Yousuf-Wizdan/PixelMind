"use client";

import { RedirectToSignIn, SignedIn } from "@daveyplate/better-auth-ui";
import {
  Loader2,
  Image as ImageIcon,
  Sparkles,
  Users,
  Calendar,
  TrendingUp,
  Camera,
  Star,
  ArrowRight,
  Plus,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { getUserProjects } from "@/actions/projects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Image as ImageKitImage } from "@imagekit/next";

interface Project {
  id: string;
  name: string | null;
  imageUrl: string;
  imageKitId: string;
  filePath: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserStats {
  totalProjects: number;
  thisMonth: number;
  thisWeek: number;
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalProjects: 0,
    thisMonth: 0,
    thisWeek: 0,
  });
  const [user, setUser] = useState<{ name?: string; createdAt?: string | Date } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user);
        }

        // Fetch user projects
        const projectsResult = await getUserProjects();
        if (projectsResult.success && projectsResult.projects) {
          const projects = projectsResult.projects;
          setUserProjects(projects);

          // Calculate stats
          const now = new Date();
          const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

          setUserStats({
            totalProjects: projects.length,
            thisMonth: projects.filter(
              (p) => new Date(p.createdAt) >= thisMonth,
            ).length,
            thisWeek: projects.filter((p) => new Date(p.createdAt) >= thisWeek)
              .length,
          });
        }
      } catch (error) {
        console.error("Dashboard initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void initializeDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground text-sm">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <RedirectToSignIn />
      <SignedIn>
        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="from-purple-600 via-blue-600 to-teal-600 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
              Welcome back{user?.name ? `, ${user.name}` : ""}!
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Here&apos;s an overview of your AI image editing workspace
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200/60 shadow-lg shadow-purple-500/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Total Projects
                </CardTitle>
                <div className="rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 p-2 shadow-md">
                  <ImageIcon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-purple-700 text-2xl font-bold">
                  {userStats.totalProjects}
                </div>
                <p className="text-purple-600/70 text-xs">
                  All your creations
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200/60 shadow-lg shadow-blue-500/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  This Month
                </CardTitle>
                <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-2 shadow-md">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-700">
                  {userStats.thisMonth}
                </div>
                <p className="text-blue-600/70 text-xs">
                  Projects created
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-teal-100/50 border-teal-200/60 shadow-lg shadow-teal-500/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">This Week</CardTitle>
                <div className="rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 p-2 shadow-md">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-700">
                  {userStats.thisWeek}
                </div>
                <p className="text-teal-600/70 text-xs">Recent activity</p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200/60 shadow-lg shadow-amber-500/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Member Since
                </CardTitle>
                <div className="rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 p-2 shadow-md">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-700">
                  {user?.createdAt
                    ? new Date(user.createdAt as string | number | Date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </div>
                <p className="text-amber-600/70 text-xs">Account created</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-white to-purple-50/30 border-purple-200/40 shadow-lg shadow-purple-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 p-1.5 shadow-md">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Button
                  onClick={() => router.push("/dashboard/create")}
                  className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-500/25 h-auto flex-col gap-2 p-6 transition-all duration-200"
                >
                  <Camera className="h-8 w-8 transition-transform group-hover:scale-110" />
                  <div className="text-center">
                    <div className="font-semibold">Create New Project</div>
                    <div className="text-xs opacity-80">
                      Upload and edit images with AI
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => router.push("/dashboard/projects")}
                  variant="outline"
                  className="group hover:bg-blue-50 hover:border-blue-300 border-blue-200/60 bg-gradient-to-br from-blue-50/50 to-blue-100/30 h-auto flex-col gap-2 p-6 transition-all duration-200"
                >
                  <div className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 p-2">
                    <ImageIcon className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-blue-700">View All Projects</div>
                    <div className="text-xs text-blue-600/70">
                      Browse your image library
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={() => router.push("/dashboard/settings")}
                  variant="outline"
                  className="group hover:bg-teal-50 hover:border-teal-300 border-teal-200/60 bg-gradient-to-br from-teal-50/50 to-teal-100/30 h-auto flex-col gap-2 p-6 transition-all duration-200"
                >
                  <div className="rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 p-2">
                    <Users className="h-6 w-6 text-white transition-transform group-hover:scale-110" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-teal-700">Account Settings</div>
                    <div className="text-xs text-teal-600/70">
                      Manage your profile
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card className="bg-gradient-to-br from-white to-blue-50/30 border-blue-200/40 shadow-lg shadow-blue-500/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 p-1.5 shadow-md">
                  <ImageIcon className="h-4 w-4 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-700 to-teal-700 bg-clip-text text-transparent">Recent Projects</span>
              </CardTitle>
              {userProjects.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/dashboard/projects")}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {userProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative mb-4">
                    <div className="border-purple-300 bg-gradient-to-br from-purple-100 to-purple-200/50 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed shadow-lg">
                      <ImageIcon className="text-purple-600 h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">
                    No projects yet
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Start creating amazing images with AI tools
                  </p>
                  <Button
                    onClick={() => router.push("/dashboard/create")}
                    className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Create Your First Project
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {userProjects.slice(0, 8).map((project) => (
                    <div
                      key={project.id}
                      className="group relative cursor-pointer overflow-hidden rounded-lg border transition-all hover:shadow-md"
                      onClick={() => router.push("/dashboard/create")}
                    >
                      <div className="aspect-square overflow-hidden">
                        <ImageKitImage
                          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
                          src={project.filePath}
                          alt={project.name ?? "Project"}
                          width={200}
                          height={200}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          transformation={[
                            {
                              width: 200,
                              height: 200,
                              crop: "maintain_ratio",
                              quality: 85,
                            },
                          ]}
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="truncate text-sm font-medium">
                          {project.name ?? "Untitled Project"}
                        </h4>
                        <p className="text-muted-foreground text-xs">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SignedIn>
    </>
  );
}