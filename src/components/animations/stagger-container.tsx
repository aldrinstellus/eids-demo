"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem, fastStaggerContainer, fastStaggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
}

export function StaggerContainer({ children, className, fast = false }: StaggerContainerProps) {
  return (
    <motion.div
      variants={fast ? fastStaggerContainer : staggerContainer}
      initial="hidden"
      animate="show"
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  fast?: boolean;
}

export function StaggerItem({ children, className, fast = false }: StaggerItemProps) {
  return (
    <motion.div variants={fast ? fastStaggerItem : staggerItem} className={cn(className)}>
      {children}
    </motion.div>
  );
}
