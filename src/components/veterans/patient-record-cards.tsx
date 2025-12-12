"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  ShieldAlert,
  Search,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PatientRecordCard } from "./patient-record-card";
import { patientRecords } from "@/data/patient-records";
import { canViewUnmaskedPII, getPersonaById } from "@/data/demo-personas";

const DEMO_STORAGE_KEY = "eids-demo-persona";

export function PatientRecordCards() {
  const [canViewUnmasked, setCanViewUnmasked] = useState(false);
  const [personaName, setPersonaName] = useState("User");
  const [personaRole, setPersonaRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const personaId = localStorage.getItem(DEMO_STORAGE_KEY);
    const hasPermission = canViewUnmaskedPII(personaId);
    setCanViewUnmasked(hasPermission);

    if (personaId) {
      const persona = getPersonaById(personaId);
      if (persona) {
        setPersonaName(persona.name);
        setPersonaRole(persona.role);
      }
    }
  }, []);

  // Filter records based on search
  const filteredRecords = patientRecords.filter((record) => {
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
    <div className="space-y-6">
      {/* RBAC Status Banner */}
      <div
        className={`rounded-lg px-4 py-3 flex items-center justify-between ${
          canViewUnmasked
            ? "bg-emerald-500/10 border border-emerald-500/30"
            : "bg-amber-500/10 border border-amber-500/30"
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

        <Badge
          variant="outline"
          className={
            canViewUnmasked
              ? "border-emerald-500/30 text-emerald-400"
              : "border-amber-500/30 text-amber-400"
          }
        >
          {canViewUnmasked ? "CLINICIAN VIEW" : "SYSTEM USER VIEW"}
        </Badge>
      </div>

      {/* Header with search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-white">Patient Records</h2>
          <Badge variant="secondary" className="ml-2">
            {filteredRecords.length} of 847
          </Badge>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 pr-4 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-full sm:w-[250px]"
          />
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRecords.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <PatientRecordCard
              record={record}
              canViewUnmasked={canViewUnmasked}
              personaRole={personaRole}
            />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground pt-4">
        Showing {filteredRecords.length} of 847 patient records
      </div>
    </div>
  );
}
