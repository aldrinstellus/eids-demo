"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Send,
  Bot,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  FileText,
  Upload,
  ChevronRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/applications/status-badge";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

import applicationsData from "@/data/applications.json";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ApplicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const application = applicationsData.applications.find((app) => app.id === id);

  if (!application) {
    return (
      <div className="container mx-auto py-8 px-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold">Application Not Found</h1>
          <p className="text-muted-foreground mt-2">
            The application you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild className="mt-4">
            <Link href="/applications">Back to Applications</Link>
          </Button>
        </div>
      </div>
    );
  }

  const insightIcons: Record<string, React.ElementType> = {
    suggestion: Lightbulb,
    recommendation: Lightbulb,
    compliance: CheckCircle,
    warning: AlertTriangle,
    success: CheckCircle,
    info: Lightbulb,
  };

  const insightStyles: Record<string, string> = {
    suggestion: "text-primary",
    recommendation: "text-accent",
    compliance: "text-success",
    warning: "text-warning",
    success: "text-success",
    info: "text-primary",
  };

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Back button */}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/applications">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Link>
        </Button>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{application.name}</h1>
            <StatusBadge status={application.status as "draft" | "active" | "review" | "completed"} />
          </div>
          <p className="text-muted-foreground mt-1">
            {application.id} · {application.department} · {application.type}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </div>
      </motion.div>

      {/* Progress stepper */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium">Progress</p>
              <p className="text-xs text-muted-foreground">
                Step {application.currentStep} of {application.totalSteps}
              </p>
            </div>
            <span className="text-2xl font-bold text-primary">
              {application.progress}%
            </span>
          </div>
          <Progress value={application.progress} className="h-2 mb-4" />
          <nav aria-label="Application progress">
            <ol className="flex items-center justify-between">
              {application.steps.map((step, index) => (
                <li key={index} className="flex items-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium",
                      step.status === "completed" &&
                        "bg-success border-success text-success-foreground",
                      step.status === "in_progress" &&
                        "border-primary text-primary",
                      step.status === "pending" && "border-muted text-muted-foreground"
                    )}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "ml-2 text-sm hidden sm:inline",
                      step.status === "in_progress" && "font-medium",
                      step.status === "pending" && "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </span>
                  {index < application.steps.length - 1 && (
                    <div
                      className={cn(
                        "hidden sm:block w-8 h-0.5 mx-2",
                        step.status === "completed" ? "bg-success" : "bg-muted"
                      )}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Card>
      </motion.div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Program Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium" htmlFor="name">
                  Program Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  defaultValue={application.name}
                  className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="type">
                  Program Type <span className="text-destructive">*</span>
                </label>
                <select
                  id="type"
                  defaultValue={application.type}
                  className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="research">Research & Development</option>
                  <option value="training">Training</option>
                  <option value="procurement">Procurement</option>
                  <option value="modernization">Modernization</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="description"
                  rows={4}
                  defaultValue={application.description}
                  className="mt-1.5 w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {application.description.length}/500 characters
                </p>
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="amount">
                  Requested Amount <span className="text-destructive">*</span>
                </label>
                <input
                  id="amount"
                  type="text"
                  defaultValue={formatCurrency(application.requestedAmount)}
                  className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center mb-4">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drop files here or{" "}
                  <button className="text-primary hover:underline">browse</button>
                </p>
              </div>
              {application.documents.length > 0 && (
                <ul className="space-y-2">
                  {application.documents.map((doc) => (
                    <li
                      key={doc.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(doc.size / 1000000).toFixed(1)} MB
                        </p>
                      </div>
                      <Badge variant="success">Uploaded</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Assistant sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="sticky top-24 border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-xl" />
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(14, 165, 233, 0.4)",
                      "0 0 20px rgba(14, 165, 233, 0.6)",
                      "0 0 10px rgba(14, 165, 233, 0.4)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 rounded-lg bg-primary/20"
                >
                  <Bot className="h-5 w-5 text-primary" />
                </motion.div>
                AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <p className="text-sm text-muted-foreground">
                Based on your input, here are some suggestions:
              </p>

              {application.aiInsights.map((insight, index) => {
                const Icon = insightIcons[insight.type] || Lightbulb;
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-3 rounded-lg bg-background/50"
                  >
                    <div className="flex gap-3">
                      <Icon
                        className={cn(
                          "h-5 w-5 mt-0.5 shrink-0",
                          insightStyles[insight.type]
                        )}
                      />
                      <div>
                        <p className="text-sm">{insight.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {Math.round(insight.confidence * 100)}% confidence
                        </p>
                        {insight.action && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 mt-1"
                          >
                            {insight.action}
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-muted-foreground"
                >
                  Why am I seeing this?
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end gap-3 mt-8 pt-6 border-t"
      >
        <Button variant="outline">Cancel</Button>
        <Button variant="outline">
          <Save className="h-4 w-4 mr-2" />
          Save Draft
        </Button>
        <Button variant="outline">Back</Button>
        <Button>
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  );
}
