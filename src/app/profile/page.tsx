"use client";

import Image from "next/image";
import {
  User,
  Mail,
  Building2,
  Calendar,
  Shield,
  Award,
  Clock,
  FileText,
  CheckCircle,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const user = {
  name: "Dr. Sarah Chen",
  email: "sarah.chen@dha.mil",
  role: "Principal Investigator",
  department: "Medical Research",
  avatar: "/avatars/dr-sarah-chen.jpg",
  joinDate: "March 15, 2021",
  lastLogin: "December 9, 2025 at 8:42 AM",
  clearanceLevel: "Secret",
  certifications: ["HIPAA Certified", "GCP Trained", "IRB Certified"],
};

const stats = [
  { label: "Applications Submitted", value: "47", icon: FileText },
  { label: "Applications Approved", value: "42", icon: CheckCircle },
  { label: "Approval Rate", value: "89%", icon: TrendingUp },
  { label: "Avg Processing Time", value: "2.8 days", icon: Clock },
];

const recentActivity = [
  { action: "Submitted application", detail: "Healthcare Training Initiative", date: "2 hours ago" },
  { action: "Updated documents", detail: "APP-2024-312", date: "5 hours ago" },
  { action: "Completed review", detail: "Mental Health Support Program", date: "1 day ago" },
  { action: "Submitted application", detail: "Telemedicine Expansion", date: "3 days ago" },
];

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-6 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8">MY PROFILE</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full border-4 border-primary/20 overflow-hidden mb-4">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-primary text-sm font-medium">{user.role}</p>
              <p className="text-muted-foreground text-sm">{user.department}</p>

              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{user.department}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Clearance: {user.clearanceLevel}</span>
                </div>
              </div>

              <div className="w-full mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">Certifications</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {user.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Activity */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">RECENT ACTIVITY</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="p-2 rounded-lg bg-muted">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.detail}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Session Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SESSION INFORMATION</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Login</p>
                  <p className="text-sm">{user.lastLogin}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Session Status</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-success rounded-full"></span>
                    <p className="text-sm">Active - Expires in 7h 23m</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
