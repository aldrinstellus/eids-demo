"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  FileText,
  Calendar,
  Activity,
  User,
  Phone,
  Mail,
  MapPin,
  Shield,
  ArrowUpDown,
  ChevronRight,
  Heart,
  Pill,
  Stethoscope,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types
interface PatientRecord {
  id: string;
  name: string;
  dob: string;
  ssn: string;
  serviceNumber: string;
  branch: "Army" | "Navy" | "Air Force" | "Marines" | "Coast Guard";
  status: "active" | "discharged" | "retired";
  lastVisit: string;
  primaryCondition: string;
  phone: string;
  email: string;
  address: string;
  priority: "routine" | "priority" | "urgent";
  appointmentsCount: number;
}

// Mock patient data
const mockPatients: PatientRecord[] = [
  {
    id: "PAT-001",
    name: "Sgt. Michael Johnson",
    dob: "1985-03-15",
    ssn: "XXX-XX-1234",
    serviceNumber: "USA-1234567",
    branch: "Army",
    status: "discharged",
    lastVisit: "2024-01-10",
    primaryCondition: "PTSD / TBI",
    phone: "(555) 123-4567",
    email: "m.johnson@email.com",
    address: "123 Oak Street, Milwaukee, WI 53201",
    priority: "priority",
    appointmentsCount: 12,
  },
  {
    id: "PAT-002",
    name: "PO2 Sarah Williams",
    dob: "1990-07-22",
    ssn: "XXX-XX-5678",
    serviceNumber: "USN-7654321",
    branch: "Navy",
    status: "active",
    lastVisit: "2024-01-12",
    primaryCondition: "MSK / Chronic Pain",
    phone: "(555) 234-5678",
    email: "s.williams@navy.mil",
    address: "456 Pine Ave, Madison, WI 53703",
    priority: "routine",
    appointmentsCount: 5,
  },
  {
    id: "PAT-003",
    name: "SSgt. David Martinez",
    dob: "1982-11-08",
    ssn: "XXX-XX-9012",
    serviceNumber: "USAF-2468135",
    branch: "Air Force",
    status: "retired",
    lastVisit: "2024-01-08",
    primaryCondition: "Cardiovascular",
    phone: "(555) 345-6789",
    email: "d.martinez@email.com",
    address: "789 Maple Dr, Green Bay, WI 54301",
    priority: "urgent",
    appointmentsCount: 24,
  },
  {
    id: "PAT-004",
    name: "Cpl. Jennifer Brown",
    dob: "1995-04-30",
    ssn: "XXX-XX-3456",
    serviceNumber: "USMC-1357924",
    branch: "Marines",
    status: "discharged",
    lastVisit: "2024-01-11",
    primaryCondition: "Mental Health",
    phone: "(555) 456-7890",
    email: "j.brown@email.com",
    address: "321 Birch Ln, Eau Claire, WI 54701",
    priority: "priority",
    appointmentsCount: 8,
  },
  {
    id: "PAT-005",
    name: "BM1 Robert Lee",
    dob: "1978-09-14",
    ssn: "XXX-XX-7890",
    serviceNumber: "USCG-8642097",
    branch: "Coast Guard",
    status: "retired",
    lastVisit: "2024-01-05",
    primaryCondition: "Diabetes / Metabolic",
    phone: "(555) 567-8901",
    email: "r.lee@email.com",
    address: "654 Cedar St, La Crosse, WI 54601",
    priority: "routine",
    appointmentsCount: 15,
  },
];

type SortField = "name" | "lastVisit" | "priority" | "branch";
type SortDirection = "asc" | "desc";

export default function PatientRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("lastVisit");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  // Filter patients
  const filteredPatients = useMemo(() => {
    return mockPatients.filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.serviceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBranch = branchFilter === "all" || patient.branch === branchFilter;
      const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || patient.priority === priorityFilter;
      return matchesSearch && matchesBranch && matchesStatus && matchesPriority;
    });
  }, [searchQuery, branchFilter, statusFilter, priorityFilter]);

  // Sort patients
  const sortedPatients = useMemo(() => {
    return [...filteredPatients].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "lastVisit":
          comparison = new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
          break;
        case "priority":
          const priorityOrder = { urgent: 0, priority: 1, routine: 2 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "branch":
          comparison = a.branch.localeCompare(b.branch);
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredPatients, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const branchColors: Record<PatientRecord["branch"], string> = {
    Army: "bg-green-500/20 text-green-600 border-green-500/30",
    Navy: "bg-blue-500/20 text-blue-600 border-blue-500/30",
    "Air Force": "bg-sky-500/20 text-sky-600 border-sky-500/30",
    Marines: "bg-red-500/20 text-red-600 border-red-500/30",
    "Coast Guard": "bg-orange-500/20 text-orange-600 border-orange-500/30",
  };

  const priorityColors = {
    urgent: "bg-destructive/20 text-destructive border-destructive/30",
    priority: "bg-warning/20 text-warning border-warning/30",
    routine: "bg-success/20 text-success border-success/30",
  };

  const statusColors = {
    active: "bg-success/20 text-success border-success/30",
    discharged: "bg-primary/20 text-primary border-primary/30",
    retired: "bg-muted text-muted-foreground border-muted-foreground/30",
  };

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            Patient Records
          </h1>
          <p className="text-muted-foreground">
            Access and manage veteran patient health records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ClipboardList className="h-4 w-4 mr-2" />
            Export Records
          </Button>
        </div>
      </motion.div>

      {/* HIPAA Notice */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-6"
      >
        <Card className="p-3 bg-warning/10 border-warning/30">
          <div className="flex items-center gap-2 text-sm text-warning">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-medium">HIPAA Protected Information</span>
            <span className="text-muted-foreground">— All access is logged and monitored per VA regulations</span>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockPatients.length}</p>
              <p className="text-xs text-muted-foreground">Total Patients</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/20">
              <AlertTriangle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{mockPatients.filter(p => p.priority === "urgent").length}</p>
              <p className="text-xs text-muted-foreground">Urgent Cases</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/20">
              <Calendar className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-muted-foreground">Today&apos;s Appts</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/20">
              <Heart className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-muted-foreground">Pending Reviews</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row gap-4 mb-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by name, ID, or service number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search patient records"
            className="w-full h-10 pl-10 pr-4 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter by branch"
          >
            <option value="all">All Branches</option>
            <option value="Army">Army</option>
            <option value="Navy">Navy</option>
            <option value="Air Force">Air Force</option>
            <option value="Marines">Marines</option>
            <option value="Coast Guard">Coast Guard</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="active">Active Duty</option>
            <option value="discharged">Discharged</option>
            <option value="retired">Retired</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="priority">Priority</option>
            <option value="routine">Routine</option>
          </select>
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
                      aria-label={`Sort by patient name`}
                    >
                      Patient
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 text-sm font-medium"
                    aria-sort={sortField === "branch" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      onClick={() => handleSort("branch")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      aria-label={`Sort by branch`}
                    >
                      Branch
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                  <th scope="col" className="text-left px-4 py-3 text-sm font-medium">
                    Status
                  </th>
                  <th scope="col" className="text-left px-4 py-3 text-sm font-medium">
                    Primary Condition
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 text-sm font-medium"
                    aria-sort={sortField === "priority" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      onClick={() => handleSort("priority")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      aria-label={`Sort by priority`}
                    >
                      Priority
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                  <th
                    scope="col"
                    className="text-left px-4 py-3 text-sm font-medium"
                    aria-sort={sortField === "lastVisit" ? (sortDirection === "asc" ? "ascending" : "descending") : "none"}
                  >
                    <button
                      onClick={() => handleSort("lastVisit")}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                      aria-label={`Sort by last visit`}
                    >
                      Last Visit
                      <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </th>
                  <th scope="col" className="text-right px-4 py-3 text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {sortedPatients.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col items-center gap-3"
                        >
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                            <User className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">No patients found</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Try adjusting your search or filter criteria
                            </p>
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  ) : (
                    sortedPatients.map((patient, index) => (
                      <motion.tr
                        key={patient.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">{patient.id}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={cn("text-xs", branchColors[patient.branch])}>
                            {patient.branch}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={cn("text-xs capitalize", statusColors[patient.status])}>
                            {patient.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {patient.primaryCondition}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={cn("text-xs capitalize", priorityColors[patient.priority])}>
                            {patient.priority}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 justify-end">
                            <Button variant="ghost" size="sm">
                              View
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </div>
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
              Showing {sortedPatients.length} of {mockPatients.length} patients
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled aria-label="Previous page">
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled aria-label="Next page">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Patient Detail Modal */}
      <AnimatePresence>
        {selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={() => setSelectedPatient(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-background rounded-lg shadow-xl w-full max-w-2xl p-6 m-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    {selectedPatient.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{selectedPatient.id} • {selectedPatient.serviceNumber}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={cn("text-xs", branchColors[selectedPatient.branch])}>
                    {selectedPatient.branch}
                  </Badge>
                  <Badge className={cn("text-xs capitalize", priorityColors[selectedPatient.priority])}>
                    {selectedPatient.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">DOB</span>
                        <span>{new Date(selectedPatient.dob).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SSN</span>
                        <span>{selectedPatient.ssn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge className={cn("text-xs capitalize", statusColors[selectedPatient.status])}>
                          {selectedPatient.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span>{selectedPatient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span>{selectedPatient.email}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
                        <span>{selectedPatient.address}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Medical Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Primary Condition</span>
                        <span>{selectedPatient.primaryCondition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Visit</span>
                        <span>{new Date(selectedPatient.lastVisit).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Appointments</span>
                        <span>{selectedPatient.appointmentsCount}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Appointment
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Pill className="h-4 w-4 mr-2" />
                        View Medications
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Medical History
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                  Close
                </Button>
                <Button>
                  Open Full Record
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
