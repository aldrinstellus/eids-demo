"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Shield,
  ShieldAlert,
  Search,
  Filter,
  Download,
  AlertTriangle,
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  IdCard,
  Fingerprint,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  patientRecords,
  maskPatientRecord,
  type PatientRecord,
} from "@/data/patient-records";
import { canViewUnmaskedPII, getPersonaById } from "@/data/demo-personas";

const DEMO_STORAGE_KEY = "eids-demo-persona";

// Branch colors for military branches
const branchColors: Record<string, string> = {
  Army: "bg-green-500/20 text-green-400 border-green-500/30",
  Navy: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Air Force": "bg-sky-500/20 text-sky-400 border-sky-500/30",
  Marines: "bg-red-500/20 text-red-400 border-red-500/30",
  "Coast Guard": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Space Force": "bg-violet-500/20 text-violet-400 border-violet-500/30",
};

// Status colors
const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Veteran: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Retired: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

export function PatientDataTable() {
  const [canViewUnmasked, setCanViewUnmasked] = useState(false);
  const [showMasked, setShowMasked] = useState(true);
  const [personaName, setPersonaName] = useState("User");
  const [personaRole, setPersonaRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const personaId = localStorage.getItem(DEMO_STORAGE_KEY);
    const hasPermission = canViewUnmaskedPII(personaId);
    setCanViewUnmasked(hasPermission);
    setShowMasked(!hasPermission);

    if (personaId) {
      const persona = getPersonaById(personaId);
      if (persona) {
        setPersonaName(persona.name);
        setPersonaRole(persona.role);
      }
    }
  }, []);

  // Toggle mask visibility (only if user has permission)
  const toggleMask = () => {
    if (canViewUnmasked) {
      setShowMasked(!showMasked);
    }
  };

  // Get records - masked or unmasked based on state
  const displayRecords = showMasked
    ? patientRecords.map(maskPatientRecord)
    : patientRecords;

  // Filter records based on search
  const filteredRecords = displayRecords.filter((record) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      record.firstName.toLowerCase().includes(query) ||
      record.lastName.toLowerCase().includes(query) ||
      record.id.toLowerCase().includes(query) ||
      record.facility.toLowerCase().includes(query) ||
      record.primaryCondition.toLowerCase().includes(query)
    );
  });

  return (
    <Card className="overflow-hidden">
      {/* RBAC Status Banner */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between ${
          canViewUnmasked
            ? "bg-emerald-500/10 border-emerald-500/30"
            : "bg-amber-500/10 border-amber-500/30"
        }`}
      >
        <div className="flex items-center gap-3">
          {canViewUnmasked ? (
            <Shield className="h-5 w-5 text-emerald-400" />
          ) : (
            <ShieldAlert className="h-5 w-5 text-amber-400" />
          )}
          <div>
            <p
              className={`text-sm font-medium ${
                canViewUnmasked ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {canViewUnmasked
                ? "PHI/PII Access Granted"
                : "PHI/PII Access Restricted"}
            </p>
            <p className="text-xs text-muted-foreground">
              Logged in as {personaName} ({personaRole})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Data view toggle - only enabled for clinicians */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={showMasked ? "outline" : "default"}
                  size="sm"
                  onClick={toggleMask}
                  disabled={!canViewUnmasked}
                  className={`gap-2 ${
                    !canViewUnmasked ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  {showMasked ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      <span className="hidden sm:inline">Masked</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">Unmasked</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {canViewUnmasked
                  ? showMasked
                    ? "Click to view unmasked data"
                    : "Click to mask data"
                  : "You do not have permission to view unmasked PHI/PII"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Badge
            variant="outline"
            className={
              canViewUnmasked
                ? "border-emerald-500/30 text-emerald-400"
                : "border-amber-500/30 text-amber-400"
            }
          >
            {showMasked ? "MASKED VIEW" : "UNMASKED VIEW"}
          </Badge>
        </div>
      </div>

      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Patient Records
            <Badge variant="secondary" className="ml-2">
              {patientRecords.length} of 847
            </Badge>
          </CardTitle>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 pr-4 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-[200px]"
              />
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Warning banner when viewing unmasked data */}
        <AnimatePresence>
          {!showMasked && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-rose-500/10 border-b border-rose-500/30 px-4 py-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400" />
                <span className="text-sm text-rose-400">
                  You are viewing unmasked PHI/PII data. All access is logged
                  and monitored.
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>
                  <span className="flex items-center gap-1">
                    <Fingerprint className="h-3 w-3" />
                    SSN
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    DOB
                  </span>
                </TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>
                  <span className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Phone
                  </span>
                </TableHead>
                <TableHead>
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record, index) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-muted/50 cursor-pointer group"
                >
                  <TableCell className="font-mono text-sm text-primary">
                    {record.id}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {record.lastName}, {record.firstName}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {record.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code
                      className={`text-sm ${
                        showMasked ? "text-muted-foreground" : "text-rose-400"
                      }`}
                    >
                      {record.ssn}
                    </code>
                  </TableCell>
                  <TableCell>
                    <span
                      className={showMasked ? "text-muted-foreground" : ""}
                    >
                      {record.dateOfBirth}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={branchColors[record.branch]}
                    >
                      {record.branch}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColors[record.status]}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {record.facility}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {record.primaryCondition}
                  </TableCell>
                  <TableCell>
                    <code
                      className={`text-sm ${
                        showMasked ? "text-muted-foreground" : ""
                      }`}
                    >
                      {record.phoneNumber}
                    </code>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`text-sm ${
                        showMasked ? "text-muted-foreground" : "text-primary"
                      }`}
                    >
                      {record.email}
                    </span>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer with pagination info */}
        <div className="border-t px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredRecords.length} of 847 patient records
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
