"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GripVertical, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SplitViewProps {
  className?: string;
  defaultLeftWidth?: number; // percentage (0-100)
  minLeftWidth?: number; // percentage
  maxLeftWidth?: number; // percentage
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  leftTitle?: string;
  rightTitle?: string;
  collapsible?: boolean;
}

export function SplitView({
  className,
  defaultLeftWidth = 60,
  minLeftWidth = 30,
  maxLeftWidth = 80,
  leftPanel,
  rightPanel,
  leftTitle,
  rightTitle,
  collapsible = true,
}: SplitViewProps) {
  const [leftWidth, setLeftWidth] = React.useState(defaultLeftWidth);
  const [isResizing, setIsResizing] = React.useState(false);
  const [isLeftCollapsed, setIsLeftCollapsed] = React.useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;

      if (newWidth >= minLeftWidth && newWidth <= maxLeftWidth) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, minLeftWidth, maxLeftWidth]);

  const toggleLeftCollapse = () => {
    if (isLeftCollapsed) {
      setIsLeftCollapsed(false);
      setIsRightCollapsed(false);
    } else {
      setIsLeftCollapsed(true);
      setIsRightCollapsed(false);
    }
  };

  const toggleRightCollapse = () => {
    if (isRightCollapsed) {
      setIsRightCollapsed(false);
      setIsLeftCollapsed(false);
    } else {
      setIsRightCollapsed(true);
      setIsLeftCollapsed(false);
    }
  };

  const getLeftWidth = () => {
    if (isLeftCollapsed) return 0;
    if (isRightCollapsed) return 100;
    return leftWidth;
  };

  const getRightWidth = () => {
    if (isRightCollapsed) return 0;
    if (isLeftCollapsed) return 100;
    return 100 - leftWidth;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-full w-full overflow-hidden rounded-lg border bg-background",
        isResizing && "cursor-col-resize",
        className
      )}
    >
      {/* Left Panel */}
      <motion.div
        initial={false}
        animate={{
          width: `${getLeftWidth()}%`,
          opacity: isLeftCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "flex flex-col overflow-hidden",
          isLeftCollapsed && "pointer-events-none"
        )}
      >
        {leftTitle && (
          <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
            <span className="text-sm font-medium">{leftTitle}</span>
            {collapsible && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={toggleRightCollapse}
                title={isRightCollapsed ? "Show AI Panel" : "Expand Form"}
              >
                {isRightCollapsed ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">
          {leftPanel}
        </div>
      </motion.div>

      {/* Resizer */}
      {!isLeftCollapsed && !isRightCollapsed && (
        <div
          onMouseDown={handleMouseDown}
          className={cn(
            "group relative flex w-2 cursor-col-resize items-center justify-center border-x bg-muted/50 transition-colors hover:bg-primary/20",
            isResizing && "bg-primary/30"
          )}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize panels"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              setLeftWidth(Math.max(minLeftWidth, leftWidth - 5));
            } else if (e.key === "ArrowRight") {
              setLeftWidth(Math.min(maxLeftWidth, leftWidth + 5));
            }
          }}
        >
          <GripVertical
            className={cn(
              "h-6 w-4 text-muted-foreground/50 transition-colors group-hover:text-primary",
              isResizing && "text-primary"
            )}
          />
        </div>
      )}

      {/* Right Panel */}
      <motion.div
        initial={false}
        animate={{
          width: `${getRightWidth()}%`,
          opacity: isRightCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "flex flex-col overflow-hidden",
          isRightCollapsed && "pointer-events-none"
        )}
      >
        {rightTitle && (
          <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-2">
            {collapsible && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={toggleLeftCollapse}
                title={isLeftCollapsed ? "Show Form" : "Expand AI Panel"}
              >
                {isLeftCollapsed ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            )}
            <span className="text-sm font-medium">{rightTitle}</span>
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4">
          {rightPanel}
        </div>
      </motion.div>
    </div>
  );
}

// Preset layout for Application Detail view
interface ApplicationSplitViewProps {
  formContent: React.ReactNode;
  aiContent: React.ReactNode;
  className?: string;
}

export function ApplicationSplitView({
  formContent,
  aiContent,
  className,
}: ApplicationSplitViewProps) {
  return (
    <SplitView
      className={cn("min-h-[600px]", className)}
      defaultLeftWidth={65}
      minLeftWidth={40}
      maxLeftWidth={75}
      leftTitle="Application Details"
      rightTitle="AI Recommendations"
      leftPanel={formContent}
      rightPanel={aiContent}
    />
  );
}
