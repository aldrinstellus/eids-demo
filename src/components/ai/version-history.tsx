"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Eye,
  Check,
  Bot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface DraftVersion {
  id: string;
  version: number;
  content: string;
  createdAt: Date;
  createdBy: {
    type: "user" | "ai";
    name: string;
  };
  tone?: string;
  detailLevel?: string;
  wordCount: number;
  isActive?: boolean;
}

interface VersionHistoryProps {
  versions: DraftVersion[];
  currentVersionId?: string;
  onRestore: (versionId: string) => void;
  onPreview: (versionId: string) => void;
  maxVisibleVersions?: number;
  className?: string;
}

export function VersionHistory({
  versions,
  currentVersionId,
  onRestore,
  onPreview,
  maxVisibleVersions = 5,
  className,
}: VersionHistoryProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [previewingId, setPreviewingId] = React.useState<string | null>(null);

  const sortedVersions = [...versions].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const visibleVersions = isExpanded
    ? sortedVersions
    : sortedVersions.slice(0, maxVisibleVersions);

  const hasMoreVersions = sortedVersions.length > maxVisibleVersions;

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  const handlePreview = (versionId: string) => {
    setPreviewingId(previewingId === versionId ? null : versionId);
    onPreview(versionId);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            <span>Version History</span>
          </div>
          <Badge variant="secondary" className="text-xs">
            {versions.length} version{versions.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <AnimatePresence>
          {visibleVersions.map((version, index) => {
            const isCurrentVersion = version.id === currentVersionId;
            const isPreviewing = version.id === previewingId;

            return (
              <motion.div
                key={version.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "relative p-3 rounded-lg border transition-colors",
                  isCurrentVersion
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50",
                  isPreviewing && "ring-2 ring-primary"
                )}
              >
                {/* Version header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "p-1 rounded-full",
                        version.createdBy.type === "ai"
                          ? "bg-primary/20"
                          : "bg-secondary"
                      )}
                    >
                      {version.createdBy.type === "ai" ? (
                        <Bot className="h-3 w-3 text-primary" />
                      ) : (
                        <User className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        Version {version.version}
                        {isCurrentVersion && (
                          <Badge variant="success" className="ml-2 text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Current
                          </Badge>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTimeAgo(version.createdAt)}
                        <span className="mx-1">·</span>
                        {version.createdBy.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Version metadata */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {version.tone && (
                    <Badge variant="outline" className="text-xs">
                      {version.tone}
                    </Badge>
                  )}
                  {version.detailLevel && (
                    <Badge variant="outline" className="text-xs">
                      {version.detailLevel}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {version.wordCount} words
                  </Badge>
                </div>

                {/* Preview content (if expanded) */}
                <AnimatePresence>
                  {isPreviewing && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 mt-2 rounded bg-muted/50 text-xs text-muted-foreground line-clamp-4">
                        {version.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex items-center gap-1 mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => handlePreview(version.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    {isPreviewing ? "Hide" : "Preview"}
                  </Button>
                  {!isCurrentVersion && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => onRestore(version.id)}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restore
                    </Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Show more/less button */}
        {hasMoreVersions && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-3 w-3 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3 mr-1" />
                Show {sortedVersions.length - maxVisibleVersions} More
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// Compact variant for sidebar use
interface VersionHistoryCompactProps {
  versions: DraftVersion[];
  currentVersionId?: string;
  onRestore: (versionId: string) => void;
  className?: string;
}

export function VersionHistoryCompact({
  versions,
  currentVersionId,
  onRestore,
  className,
}: VersionHistoryCompactProps) {
  const latestVersions = [...versions]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <History className="h-3 w-3" />
        <span>Recent versions ({versions.length})</span>
      </div>
      {latestVersions.map((version) => (
        <div
          key={version.id}
          className={cn(
            "flex items-center justify-between p-2 rounded text-xs",
            version.id === currentVersionId
              ? "bg-primary/10"
              : "bg-muted/50 hover:bg-muted"
          )}
        >
          <div className="flex items-center gap-2">
            {version.createdBy.type === "ai" ? (
              <Bot className="h-3 w-3 text-primary" />
            ) : (
              <User className="h-3 w-3 text-muted-foreground" />
            )}
            <span>v{version.version}</span>
            {version.id === currentVersionId && (
              <Check className="h-3 w-3 text-success" />
            )}
          </div>
          {version.id !== currentVersionId && (
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-1 text-xs"
              onClick={() => onRestore(version.id)}
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
