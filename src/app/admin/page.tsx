"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Shield,
  Activity,
  Search,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Server,
  Database,
  Cpu,
  Zap,
  X,
  Save,
  UserPlus,
  Eye,
  EyeOff,
  RotateCcw,
  Play,
  Pause,
  AlertCircle,
  ArrowUpDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types
interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Analyst" | "Reviewer" | "Viewer";
  status: "active" | "inactive";
  lastLogin: string;
  department?: string;
}

interface AuditLog {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  severity: "info" | "success" | "warning" | "error";
  details: string;
  ipAddress?: string;
}

// Initial data
const initialUsers: User[] = [
  { id: 1, name: "Dr. Sarah Chen", email: "sarah.chen@va.gov", role: "Admin", status: "active", lastLogin: "2024-01-15 09:23", department: "Medical Research" },
  { id: 2, name: "James Wilson", email: "james.wilson@va.gov", role: "Analyst", status: "active", lastLogin: "2024-01-15 08:45", department: "Data Services" },
  { id: 3, name: "Maria Garcia", email: "maria.garcia@va.gov", role: "Reviewer", status: "active", lastLogin: "2024-01-14 16:30", department: "Compliance" },
  { id: 4, name: "Robert Johnson", email: "robert.johnson@va.gov", role: "Viewer", status: "inactive", lastLogin: "2024-01-10 11:20", department: "IT Operations" },
  { id: 5, name: "Emily Davis", email: "emily.davis@va.gov", role: "Analyst", status: "active", lastLogin: "2024-01-15 07:15", department: "Analytics" },
];

const initialAuditLogs: AuditLog[] = [
  { id: 1, action: "User Login", user: "Dr. Sarah Chen", timestamp: "2024-01-15 09:23:45", severity: "info", details: "Successful login from 10.0.0.1", ipAddress: "10.0.0.1" },
  { id: 2, action: "Application Approved", user: "James Wilson", timestamp: "2024-01-15 09:15:30", severity: "success", details: "APP-2024-001 approved for processing" },
  { id: 3, action: "Permission Changed", user: "System", timestamp: "2024-01-15 08:45:12", severity: "warning", details: "Role upgraded for user maria.garcia@va.gov" },
  { id: 4, action: "Failed Login Attempt", user: "Unknown", timestamp: "2024-01-15 08:30:00", severity: "error", details: "3 failed attempts from 192.168.1.100", ipAddress: "192.168.1.100" },
  { id: 5, action: "Data Export", user: "Emily Davis", timestamp: "2024-01-15 08:00:00", severity: "info", details: "Exported Q4 analytics report" },
];

const apiEndpoints = [
  { endpoint: "/api/applications", calls: 45230, avgTime: "89ms", status: "healthy", lastError: null },
  { endpoint: "/api/ai/analyze", calls: 12450, avgTime: "1.2s", status: "healthy", lastError: null },
  { endpoint: "/api/documents", calls: 8920, avgTime: "156ms", status: "healthy", lastError: null },
  { endpoint: "/api/users", calls: 3240, avgTime: "45ms", status: "healthy", lastError: null },
  { endpoint: "/api/analytics", calls: 2180, avgTime: "320ms", status: "degraded", lastError: "High latency detected" },
];

// Sort types
type UserSortField = "name" | "email" | "role" | "department" | "status" | "lastLogin";
type ApiSortField = "endpoint" | "calls" | "avgTime" | "status";
type SortDirection = "asc" | "desc";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"users" | "audit" | "system" | "api">("users");
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");

  // Sorting state for User Management
  const [userSortField, setUserSortField] = useState<UserSortField>("lastLogin");
  const [userSortDirection, setUserSortDirection] = useState<SortDirection>("desc");

  // Sorting state for API Metrics
  const [apiSortField, setApiSortField] = useState<ApiSortField>("calls");
  const [apiSortDirection, setApiSortDirection] = useState<SortDirection>("desc");

  // Modal states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer" as User["role"],
    status: "active" as User["status"],
    department: "",
  });

  // System metrics with live updates
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: "99.97%",
    responseTime: "145ms",
    activeUsers: 847,
    apiCalls: "1.2M",
    cpuUsage: 34,
    memoryUsage: 62,
    diskUsage: 45,
    networkIO: "2.4 GB/s",
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Show notification
  const showNotification = useCallback((message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Add audit log
  const addAuditLog = useCallback((action: string, details: string, severity: AuditLog["severity"] = "info") => {
    const newLog: AuditLog = {
      id: Date.now(),
      action,
      user: "Dr. Sarah Chen", // Current user
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
      }).replace(",", ""),
      severity,
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  }, []);

  // User CRUD operations
  const handleAddUser = useCallback(() => {
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "Viewer", status: "active", department: "" });
    setIsUserModalOpen(true);
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department || "",
    });
    setIsUserModalOpen(true);
  }, []);

  const handleSaveUser = useCallback(() => {
    if (!formData.name || !formData.email) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(u =>
        u.id === editingUser.id
          ? { ...u, ...formData }
          : u
      ));
      addAuditLog("User Updated", `Updated user: ${formData.email}`, "info");
      showNotification(`User "${formData.name}" updated successfully`, "success");
    } else {
      // Add new user - prepend to show at top
      const newUser: User = {
        id: Date.now(),
        ...formData,
        lastLogin: "Never",
      };
      setUsers(prev => [newUser, ...prev]);
      // Reset sort to show new user at top
      setUserSortField("name");
      setUserSortDirection("asc");
      addAuditLog("User Created", `New user added: ${formData.email}`, "success");
      showNotification(`User "${formData.name}" added successfully`, "success");
    }
    setIsUserModalOpen(false);
  }, [formData, editingUser, addAuditLog, showNotification]);

  const handleDeleteUser = useCallback((user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  }, []);

  const confirmDeleteUser = useCallback(() => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      addAuditLog("User Deleted", `Deleted user: ${userToDelete.email}`, "warning");
      showNotification(`User "${userToDelete.name}" deleted`, "success");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  }, [userToDelete, addAuditLog, showNotification]);

  const handleToggleStatus = useCallback((user: User) => {
    const newStatus = user.status === "active" ? "inactive" : "active";
    setUsers(prev => prev.map(u =>
      u.id === user.id ? { ...u, status: newStatus } : u
    ));
    addAuditLog(
      "Status Changed",
      `User ${user.email} status changed to ${newStatus}`,
      newStatus === "active" ? "success" : "warning"
    );
    showNotification(`User status changed to ${newStatus}`, "success");
  }, [addAuditLog, showNotification]);

  // Refresh system metrics
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setSystemMetrics(prev => ({
        ...prev,
        cpuUsage: Math.floor(Math.random() * 30) + 25,
        memoryUsage: Math.floor(Math.random() * 20) + 55,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        responseTime: `${Math.floor(Math.random() * 50) + 120}ms`,
      }));
      setIsRefreshing(false);
      showNotification("Metrics refreshed", "success");
    }, 1000);
  }, [showNotification]);

  // Export functions
  const handleExportLogs = useCallback(() => {
    const csvContent = auditLogs.map(log =>
      `${log.timestamp},${log.action},${log.user},${log.severity},${log.details}`
    ).join("\n");
    const blob = new Blob([`Timestamp,Action,User,Severity,Details\n${csvContent}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    addAuditLog("Data Export", "Exported audit logs to CSV", "info");
    showNotification("Audit logs exported", "success");
  }, [auditLogs, addAuditLog, showNotification]);

  // Handle user sort
  const handleUserSort = useCallback((field: UserSortField) => {
    if (userSortField === field) {
      setUserSortDirection(userSortDirection === "asc" ? "desc" : "asc");
    } else {
      setUserSortField(field);
      setUserSortDirection("asc");
    }
  }, [userSortField, userSortDirection]);

  // Handle API sort
  const handleApiSort = useCallback((field: ApiSortField) => {
    if (apiSortField === field) {
      setApiSortDirection(apiSortDirection === "asc" ? "desc" : "asc");
    } else {
      setApiSortField(field);
      setApiSortDirection("desc"); // Default to desc for metrics
    }
  }, [apiSortField, apiSortDirection]);

  // Filter and sort users
  const filteredUsers = users
    .filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (userSortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "email":
          comparison = a.email.localeCompare(b.email);
          break;
        case "role":
          comparison = a.role.localeCompare(b.role);
          break;
        case "department":
          comparison = (a.department || "").localeCompare(b.department || "");
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "lastLogin":
          comparison = a.lastLogin.localeCompare(b.lastLogin);
          break;
      }
      return userSortDirection === "asc" ? comparison : -comparison;
    });

  // Filter audit logs
  const filteredLogs = auditLogs.filter(log =>
    severityFilter === "all" || log.severity === severityFilter
  );

  // Sort API endpoints
  const sortedApiEndpoints = [...apiEndpoints].sort((a, b) => {
    let comparison = 0;
    switch (apiSortField) {
      case "endpoint":
        comparison = a.endpoint.localeCompare(b.endpoint);
        break;
      case "calls":
        comparison = a.calls - b.calls;
        break;
      case "avgTime":
        comparison = parseInt(a.avgTime) - parseInt(b.avgTime);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
    }
    return apiSortDirection === "asc" ? comparison : -comparison;
  });

  // Sort indicator component
  const SortIndicator = ({ field, currentField, direction }: { field: string; currentField: string; direction: SortDirection }) => {
    if (field !== currentField) {
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" aria-hidden="true" />;
    }
    return direction === "asc"
      ? <ChevronUp className="h-3 w-3 ml-1" aria-hidden="true" />
      : <ChevronDown className="h-3 w-3 ml-1" aria-hidden="true" />;
  };

  const tabs = [
    { id: "users", label: "User Management", icon: Users },
    { id: "audit", label: "Audit Log", icon: Shield },
    { id: "system", label: "System Health", icon: Activity },
    { id: "api", label: "API Metrics", icon: Zap },
  ];

  const severityStyles = {
    info: "bg-primary/20 text-primary border-primary/30",
    success: "bg-success/20 text-success border-success/30",
    warning: "bg-warning/20 text-warning border-warning/30",
    error: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const severityIcons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
  };

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={cn(
              "fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2",
              notification.type === "success"
                ? "bg-success text-success-foreground"
                : "bg-destructive text-destructive-foreground"
            )}
          >
            {notification.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Administration</h1>
            <p className="text-muted-foreground">
              Manage users, monitor system health, and view audit logs
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportLogs}>
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
              Refresh
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 mb-6 border-b pb-4"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </Button>
          );
        })}
      </motion.div>

      {/* User Management Tab */}
      {activeTab === "users" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 w-64 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <select
                    className="h-9 px-3 min-w-[120px] rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    value={`${userSortField}-${userSortDirection}`}
                    onChange={(e) => {
                      const [field, direction] = e.target.value.split("-") as [UserSortField, SortDirection];
                      setUserSortField(field);
                      setUserSortDirection(direction);
                    }}
                    aria-label="Sort users"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="lastLogin-desc">Latest</option>
                    <option value="lastLogin-asc">Oldest</option>
                    <option value="role-asc">Role (A-Z)</option>
                    <option value="department-asc">Department (A-Z)</option>
                  </select>
                  <Button size="sm" onClick={handleAddUser}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b text-left">
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={userSortField === "name" ? (userSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleUserSort("name")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by name, currently ${userSortField === "name" ? (userSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Name
                          <SortIndicator field="name" currentField={userSortField} direction={userSortDirection} />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={userSortField === "email" ? (userSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleUserSort("email")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by email, currently ${userSortField === "email" ? (userSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Email
                          <SortIndicator field="email" currentField={userSortField} direction={userSortDirection} />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={userSortField === "role" ? (userSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleUserSort("role")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by role, currently ${userSortField === "role" ? (userSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Role
                          <SortIndicator field="role" currentField={userSortField} direction={userSortDirection} />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={userSortField === "department" ? (userSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleUserSort("department")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by department, currently ${userSortField === "department" ? (userSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Department
                          <SortIndicator field="department" currentField={userSortField} direction={userSortDirection} />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={userSortField === "status" ? (userSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleUserSort("status")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by status, currently ${userSortField === "status" ? (userSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Status
                          <SortIndicator field="status" currentField={userSortField} direction={userSortDirection} />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={userSortField === "lastLogin" ? (userSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleUserSort("lastLogin")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by last login, currently ${userSortField === "lastLogin" ? (userSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Last Login
                          <SortIndicator field="lastLogin" currentField={userSortField} direction={userSortDirection} />
                        </button>
                      </th>
                      <th scope="col" className="pb-3 font-medium text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredUsers.map((user, index) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b last:border-0"
                        >
                          <td className="py-3 font-medium">{user.name}</td>
                          <td className="py-3 text-sm text-muted-foreground">{user.email}</td>
                          <td className="py-3">
                            <Badge variant="outline">{user.role}</Badge>
                          </td>
                          <td className="py-3 text-sm text-muted-foreground">{user.department || "-"}</td>
                          <td className="py-3">
                            <button
                              onClick={() => handleToggleStatus(user)}
                              className="cursor-pointer"
                            >
                              <Badge
                                className={cn(
                                  "transition-colors",
                                  user.status === "active"
                                    ? "bg-success/20 text-success border-success/30 hover:bg-success/30"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                                )}
                              >
                                {user.status === "active" ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                                {user.status}
                              </Badge>
                            </button>
                          </td>
                          <td className="py-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                          <td className="py-3">
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteUser(user)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No users found matching your search.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Audit Log Tab */}
      {activeTab === "audit" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Audit Log
                  <Badge variant="outline" className="ml-2">{filteredLogs.length} entries</Badge>
                </CardTitle>
                <div className="flex gap-2">
                  <select
                    className="h-9 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                  >
                    <option value="all">All Severities</option>
                    <option value="info">Info</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                  <Button variant="outline" size="sm" onClick={handleExportLogs}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAuditLogs(initialAuditLogs);
                      showNotification("Audit log reset to initial state", "success");
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                <AnimatePresence>
                  {filteredLogs.map((log, index) => {
                    const SeverityIcon = severityIcons[log.severity];
                    return (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className={cn("p-2 rounded-lg", severityStyles[log.severity])}>
                          <SeverityIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{log.action}</p>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {log.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-xs text-muted-foreground">User: {log.user}</p>
                            {log.ipAddress && (
                              <p className="text-xs text-muted-foreground">IP: {log.ipAddress}</p>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline" className={severityStyles[log.severity]}>
                          {log.severity}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {filteredLogs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No logs found for the selected filter.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* System Health Tab */}
      {activeTab === "system" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/20">
                  <Server className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systemMetrics.uptime}</p>
                  <p className="text-xs text-muted-foreground">System Uptime</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systemMetrics.responseTime}</p>
                  <p className="text-xs text-muted-foreground">Avg Response Time</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/20">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systemMetrics.activeUsers}</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Zap className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{systemMetrics.apiCalls}</p>
                  <p className="text-xs text-muted-foreground">API Calls (24h)</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Resource Usage */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Resource Usage</CardTitle>
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                  Refresh Metrics
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> CPU
                    </span>
                    <span className={cn(
                      "text-sm font-medium",
                      systemMetrics.cpuUsage > 80 ? "text-destructive" : systemMetrics.cpuUsage > 60 ? "text-warning" : "text-success"
                    )}>{systemMetrics.cpuUsage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${systemMetrics.cpuUsage}%` }}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "h-full rounded-full",
                        systemMetrics.cpuUsage > 80 ? "bg-destructive" : systemMetrics.cpuUsage > 60 ? "bg-warning" : "bg-success"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Activity className="h-4 w-4" /> Memory
                    </span>
                    <span className={cn(
                      "text-sm font-medium",
                      systemMetrics.memoryUsage > 80 ? "text-destructive" : systemMetrics.memoryUsage > 60 ? "text-warning" : "text-success"
                    )}>{systemMetrics.memoryUsage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${systemMetrics.memoryUsage}%` }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className={cn(
                        "h-full rounded-full",
                        systemMetrics.memoryUsage > 80 ? "bg-destructive" : systemMetrics.memoryUsage > 60 ? "bg-warning" : "bg-primary"
                      )}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Database className="h-4 w-4" /> Disk
                    </span>
                    <span className="text-sm font-medium">{systemMetrics.diskUsage}%</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${systemMetrics.diskUsage}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="h-full bg-accent rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm flex items-center gap-2">
                      <Server className="h-4 w-4" /> Network I/O
                    </span>
                    <span className="text-sm font-medium">{systemMetrics.networkIO}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "68%" }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-full bg-warning rounded-full"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Status */}
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Application Server", status: "running", uptime: "14d 3h 22m" },
                  { name: "Database Cluster", status: "running", uptime: "30d 12h 45m" },
                  { name: "AI Processing Queue", status: "running", uptime: "7d 8h 15m" },
                  { name: "File Storage", status: "running", uptime: "45d 6h 30m" },
                  { name: "Cache Server", status: "running", uptime: "14d 3h 22m" },
                  { name: "Message Queue", status: "degraded", uptime: "2d 15h 40m" },
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        service.status === "running" ? "bg-success" : "bg-warning"
                      )} />
                      <div>
                        <p className="text-sm font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Pause className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* API Metrics Tab */}
      {activeTab === "api" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  API Endpoint Metrics
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-success border-success/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    All Systems Operational
                  </Badge>
                  <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b text-left">
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={apiSortField === "endpoint" ? (apiSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleApiSort("endpoint")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by endpoint, currently ${apiSortField === "endpoint" ? (apiSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Endpoint
                          <SortIndicator field="endpoint" currentField={apiSortField} direction={apiSortDirection} />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={apiSortField === "calls" ? (apiSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleApiSort("calls")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by calls, currently ${apiSortField === "calls" ? (apiSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Calls (24h)
                          <SortIndicator field="calls" currentField={apiSortField} direction={apiSortDirection} />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={apiSortField === "avgTime" ? (apiSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleApiSort("avgTime")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by average response time, currently ${apiSortField === "avgTime" ? (apiSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Avg Response
                          <SortIndicator field="avgTime" currentField={apiSortField} direction={apiSortDirection} />
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="pb-3 font-medium text-sm text-muted-foreground"
                        aria-sort={apiSortField === "status" ? (apiSortDirection === "asc" ? "ascending" : "descending") : "none"}
                      >
                        <button
                          onClick={() => handleApiSort("status")}
                          className="flex items-center gap-1 hover:text-primary transition-colors"
                          aria-label={`Sort by status, currently ${apiSortField === "status" ? (apiSortDirection === "asc" ? "ascending" : "descending") : "unsorted"}`}
                        >
                          Status
                          <SortIndicator field="status" currentField={apiSortField} direction={apiSortDirection} />
                        </button>
                      </th>
                      <th scope="col" className="pb-3 font-medium text-sm text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedApiEndpoints.map((api, index) => (
                      <motion.tr
                        key={api.endpoint}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="border-b last:border-0"
                      >
                        <td className="py-3 font-mono text-sm">{api.endpoint}</td>
                        <td className="py-3 text-sm">{api.calls.toLocaleString()}</td>
                        <td className="py-3 text-sm font-mono">{api.avgTime}</td>
                        <td className="py-3">
                          <Badge
                            className={cn(
                              api.status === "healthy"
                                ? "bg-success/20 text-success border-success/30"
                                : "bg-warning/20 text-warning border-warning/30"
                            )}
                          >
                            {api.status === "healthy" ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
                            {api.status}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Activity className="h-3 w-3 mr-1" />
                              View Logs
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Play className="h-3 w-3 mr-1" />
                              Test
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* API Rate Limits */}
          <Card>
            <CardHeader>
              <CardTitle>Rate Limits & Quotas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">API Requests (Daily)</span>
                    <span className="text-sm font-medium">892,450 / 1,000,000</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "89%" }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-warning rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">89% of daily quota used</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">AI Processing Units</span>
                    <span className="text-sm font-medium">4,521 / 10,000</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "45%" }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="h-full bg-success rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">45% of AI quota used</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* User Add/Edit Modal */}
      <AnimatePresence>
        {isUserModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setIsUserModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-lg shadow-xl w-full max-w-md p-6 m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  {editingUser ? "Edit User" : "Add New User"}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsUserModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 mt-1 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-10 mt-1 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="user@va.gov"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full h-10 mt-1 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select Department</option>
                    <option value="Medical Research">Medical Research</option>
                    <option value="Data Services">Data Services</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Compliance">Compliance</option>
                    <option value="IT Operations">IT Operations</option>
                    <option value="Clinical Operations">Clinical Operations</option>
                    <option value="Administration">Administration</option>
                    <option value="Finance">Finance</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value as User["role"] })}
                      className="w-full h-10 mt-1 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="Viewer">Viewer</option>
                      <option value="Analyst">Analyst</option>
                      <option value="Reviewer">Reviewer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as User["status"] })}
                      className="w-full h-10 mt-1 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveUser}>
                  <Save className="h-4 w-4 mr-2" />
                  {editingUser ? "Update User" : "Add User"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && userToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-lg shadow-xl w-full max-w-sm p-6 m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-destructive/20">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <h2 className="text-lg font-bold">Confirm Delete</h2>
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                Are you sure you want to delete this user?
              </p>
              <p className="text-sm font-medium mb-4">
                {userToDelete.name} ({userToDelete.email})
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                This action cannot be undone. The user will lose all access to the system.
              </p>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDeleteUser}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
