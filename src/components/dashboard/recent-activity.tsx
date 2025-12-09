"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileEdit,
  Send,
  CheckCircle,
  Upload,
  Brain,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "update" | "submit" | "complete" | "document" | "ai";
  application: string;
  applicationName: string;
  action: string;
  user: string;
  timestamp: string;
  timeAgo: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const iconMap: Record<string, React.ElementType> = {
  update: FileEdit,
  submit: Send,
  complete: CheckCircle,
  document: Upload,
  ai: Brain,
};

const typeStyles: Record<string, string> = {
  update: "bg-primary/20 text-primary",
  submit: "bg-accent/20 text-accent",
  complete: "bg-success/20 text-success",
  document: "bg-warning/20 text-warning",
  ai: "bg-primary/20 text-primary",
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/applications">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = iconMap[activity.type] || FileEdit;

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={cn(
                      "p-2 rounded-lg shrink-0",
                      typeStyles[activity.type]
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/applications/${activity.application}`}
                      className="text-sm font-medium hover:text-primary transition-colors line-clamp-1"
                    >
                      {activity.applicationName}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.user} · {activity.timeAgo}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
