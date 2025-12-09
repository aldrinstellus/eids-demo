"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Plus,
  ChevronRight,
  ArrowUpDown,
  FileX2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/applications/status-badge";
import { formatCurrency, getTimeAgo } from "@/lib/utils";

import applicationsData from "@/data/applications.json";

type SortField = "name" | "status" | "updatedAt" | "requestedAmount";
type SortDirection = "asc" | "desc";

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const { applications } = applicationsData;

  // Filter applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort applications
  const sortedApps = [...filteredApps].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      case "updatedAt":
        comparison = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        break;
      case "requestedAmount":
        comparison = a.requestedAmount - b.requestedAmount;
        break;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "draft", label: "Draft" },
    { value: "active", label: "Active" },
    { value: "review", label: "In Review" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Manage and track all your applications
          </p>
        </div>
        <Button asChild>
          <Link href="/applications/new">
            <Plus className="h-4 w-4 mr-2" />
            New Application
          </Link>
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search applications by name, ID, or department"
            className="w-full h-10 pl-10 pr-4 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter by status"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th
                    scope="col"
                    className="text-left px-4 py-3 text-sm font-medium"
                    aria-sort={sortField === "name" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      aria-label={`Sort by application name, currently ${sortField === "name" ? (sortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                    >
                      Application
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                  <th scope="col" className="text-left px-4 py-3 text-sm font-medium">
                    Department
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 text-sm font-medium"
                    aria-sort={sortField === "status" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      aria-label={`Sort by status, currently ${sortField === "status" ? (sortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                    >
                      Status
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 text-sm font-medium"
                    aria-sort={sortField === "requestedAmount" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      onClick={() => handleSort("requestedAmount")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      aria-label={`Sort by amount, currently ${sortField === "requestedAmount" ? (sortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                    >
                      Amount
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                  <th scope="col" className="text-left px-4 py-3 text-sm font-medium">
                    Progress
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 text-sm font-medium"
                    aria-sort={sortField === "updatedAt" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      onClick={() => handleSort("updatedAt")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      aria-label={`Sort by updated date, currently ${sortField === "updatedAt" ? (sortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                    >
                      Updated
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                  <th scope="col" className="text-right px-4 py-3 text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {sortedApps.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center gap-3"
                        >
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                            <FileX2 className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">No applications found</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {searchQuery || statusFilter !== "all"
                                ? "Try adjusting your search or filter criteria"
                                : "Get started by creating a new application"}
                            </p>
                          </div>
                          {searchQuery || statusFilter !== "all" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSearchQuery("");
                                setStatusFilter("all");
                              }}
                            >
                              Clear filters
                            </Button>
                          ) : (
                            <Button asChild size="sm">
                              <Link href="/applications/new">
                                <Plus className="h-4 w-4 mr-2" />
                                New Application
                              </Link>
                            </Button>
                          )}
                        </motion.div>
                      </td>
                    </tr>
                  ) : (
                    sortedApps.map((app, index) => (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-4 py-3">
                          <div>
                            <Link
                              href={`/applications/${app.id}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {app.name}
                            </Link>
                            <p className="text-xs text-muted-foreground">{app.id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {app.department}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={app.status as "draft" | "active" | "review" | "completed" | "rejected"} />
                        </td>
                        <td className="px-4 py-3 text-sm font-mono">
                          {formatCurrency(app.requestedAmount)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${app.progress}%` }}
                                transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {app.progress}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {getTimeAgo(app.updatedAt)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/applications/${app.id}`}>
                              View
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
              Showing {sortedApps.length} of {applications.length} applications
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled aria-label="Previous page (disabled - on first page)">
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled aria-label="Next page (disabled - on last page)">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
