"use client";

import { AlertTriangle, Lock, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PatientRecord } from "@/data/patient-records";

interface PatientRecordCardProps {
  record: PatientRecord;
  canViewUnmasked: boolean;
  personaRole: string;
}

// Field row component for consistent styling
function FieldRow({
  label,
  value,
  isRestricted,
}: {
  label: string;
  value: string;
  isRestricted: boolean;
}) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-700/50 last:border-0">
      <span className="text-slate-400 text-sm">{label}</span>
      {isRestricted ? (
        <span className="text-amber-500 text-sm flex items-center gap-1">
          <Lock className="h-3 w-3" />
          Restricted
        </span>
      ) : (
        <span className="text-white text-sm">{value}</span>
      )}
    </div>
  );
}

export function PatientRecordCard({
  record,
  canViewUnmasked,
  personaRole,
}: PatientRecordCardProps) {
  // Determine if data should show as restricted
  const showRestricted = !canViewUnmasked;

  // Partial masking for clinician view (show first name, mask last name partially)
  const maskedLastName = canViewUnmasked
    ? record.lastName.charAt(0) + "****"
    : record.lastName;

  return (
    <Card className="overflow-hidden bg-slate-900 border-slate-700">
      {/* Dark blue CUI header */}
      <div className="bg-[#1e3a5f] px-4 py-3 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <span className="text-white text-sm font-medium">
          CUI / PHI / PII — Authorized Use Only
        </span>
      </div>

      {/* Card content */}
      <div className="p-4">
        {/* Header with title and role badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-400" />
            <h3 className="text-white font-semibold">Patient Record</h3>
          </div>
          <Badge
            variant="outline"
            className={
              canViewUnmasked
                ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                : "border-slate-500/50 text-slate-400 bg-slate-500/10"
            }
          >
            {personaRole}
          </Badge>
        </div>

        {/* Patient information fields */}
        <div className="space-y-0">
          <FieldRow
            label="First Name"
            value={record.firstName}
            isRestricted={showRestricted}
          />
          <FieldRow
            label="Last Name"
            value={maskedLastName}
            isRestricted={showRestricted}
          />
          <FieldRow
            label="Date of Birth"
            value={record.dateOfBirth}
            isRestricted={showRestricted}
          />
          <FieldRow
            label="Gender"
            value={record.gender}
            isRestricted={showRestricted}
          />
          <FieldRow
            label="Phone Number"
            value={record.phoneNumber}
            isRestricted={showRestricted}
          />
          <FieldRow
            label="Email Address"
            value={record.email}
            isRestricted={showRestricted}
          />
          <FieldRow
            label="Address"
            value={record.address}
            isRestricted={showRestricted}
          />
          <FieldRow
            label="City"
            value={record.city}
            isRestricted={showRestricted}
          />
        </div>

        {/* Visit Details section */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          <h4 className="text-slate-300 text-sm font-medium mb-3">
            Visit Details
          </h4>
          <div className="space-y-0">
            <FieldRow
              label="Recent Visit Date"
              value={record.lastVisit}
              isRestricted={showRestricted}
            />
            <FieldRow
              label="Diagnosis Summary"
              value={record.primaryCondition}
              isRestricted={showRestricted}
            />
          </div>
        </div>

        {/* Action button */}
        <div className="mt-4 pt-4 border-t border-slate-700">
          {canViewUnmasked ? (
            <Button
              variant="outline"
              className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
            >
              Access More Records
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
            >
              Request Additional Access
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
