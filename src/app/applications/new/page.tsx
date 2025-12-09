"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Send,
  Bot,
  Lightbulb,
  CheckCircle,
  FileText,
  Upload,
  User,
  Building,
  DollarSign,
  Calendar,
  X,
  Loader2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Step definitions
const steps = [
  { id: 1, name: "Basic Info", description: "Program details and type" },
  { id: 2, name: "Funding", description: "Budget and timeline" },
  { id: 3, name: "Documents", description: "Supporting documents" },
  { id: 4, name: "Review", description: "Review all information" },
  { id: 5, name: "Submit", description: "Submit application" },
];

// Form state type
interface FormData {
  name: string;
  type: string;
  department: string;
  description: string;
  requestedAmount: string;
  startDate: string;
  endDate: string;
  justification: string;
  documents: { name: string; size: number; type: string }[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

// Form validation errors type
interface FormErrors {
  name?: string;
  type?: string;
  department?: string;
  description?: string;
  requestedAmount?: string;
  startDate?: string;
  endDate?: string;
  justification?: string;
  contactName?: string;
  contactEmail?: string;
  isCertified?: string;
}

export default function NewApplicationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCertified, setIsCertified] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "application-development",
    department: "",
    description: "",
    requestedAmount: "",
    startDate: "",
    endDate: "",
    justification: "",
    documents: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  // Calculate progress percentage
  const progress = Math.round((currentStep / steps.length) * 100);

  // Update form field with useCallback for performance
  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  // Validate form before submission
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = "Program name is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.requestedAmount.trim()) {
      newErrors.requestedAmount = "Requested amount is required";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }
    // Date validation: end date must be after start date
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        newErrors.endDate = "End date must be after start date";
      }
    }
    if (!formData.justification.trim()) {
      newErrors.justification = "Budget justification is required";
    }
    if (!formData.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Contact email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Invalid email format";
    }
    if (!isCertified) {
      newErrors.isCertified = "You must certify the application before submitting";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, isCertified]);

  // Navigation handlers
  const goToStep = (step: number) => {
    if (step >= 1 && step <= steps.length) {
      setCurrentStep(step);
    }
  };

  const goNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Simulate file upload
  const handleFileUpload = () => {
    const newDoc = {
      name: `Document_${formData.documents.length + 1}.pdf`,
      size: Math.round(Math.random() * 5000000) + 500000,
      type: "application/pdf",
    };
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, newDoc],
    }));
  };

  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  // Handle form submission with validation
  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setShowSuccess(true);
    // Redirect after showing success
    setTimeout(() => {
      router.push("/applications");
    }, 3000);
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Program Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="name">
                    Program Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter program name"
                    className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="type">
                    Program Type <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => updateField("type", e.target.value)}
                    className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="application-development">Application Development</option>
                    <option value="modernization">Legacy Modernization</option>
                    <option value="analytics">Analytics & Reporting</option>
                    <option value="ai-ml">AI/ML Implementation</option>
                    <option value="infrastructure">Cloud Infrastructure</option>
                    <option value="sharepoint">SharePoint Portal</option>
                    <option value="ux-design">UI/UX Enhancement</option>
                    <option value="devsecops">DevSecOps Integration</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="department">
                    Department <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => updateField("department", e.target.value)}
                    className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select department</option>
                    <option value="EIDS PMO">EIDS PMO</option>
                    <option value="Medical Informatics">Medical Informatics</option>
                    <option value="Clinical Operations">Clinical Operations</option>
                    <option value="IT Security">IT Security</option>
                    <option value="Data Services">Data Services</option>
                    <option value="Health IT">Health IT</option>
                    <option value="MHS Operations">MHS Operations</option>
                    <option value="VA Interoperability">VA Interoperability</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Describe the program objectives and expected outcomes"
                    maxLength={500}
                    className="mt-1.5 w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {formData.description.length}/500 characters
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Funding Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="amount">
                    Requested Amount <span className="text-destructive">*</span>
                  </label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <input
                      id="amount"
                      type="text"
                      value={formData.requestedAmount}
                      onChange={(e) => updateField("requestedAmount", e.target.value)}
                      placeholder="0.00"
                      className="w-full h-10 pl-7 pr-3 rounded-md border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="startDate">
                      Start Date <span className="text-destructive">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateField("startDate", e.target.value)}
                        className="w-full h-10 pl-10 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium" htmlFor="endDate">
                      End Date <span className="text-destructive">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateField("endDate", e.target.value)}
                        className="w-full h-10 pl-10 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium" htmlFor="justification">
                    Budget Justification <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="justification"
                    rows={4}
                    value={formData.justification}
                    onChange={(e) => updateField("justification", e.target.value)}
                    placeholder="Explain how the funds will be used and why this amount is necessary"
                    className="mt-1.5 w-full px-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Supporting Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={handleFileUpload}
                >
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-medium">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, DOCX up to 10MB each
                  </p>
                </div>

                {formData.documents.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {formData.documents.map((doc, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
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
                        <button
                          onClick={() => removeDocument(index)}
                          className="p-1 hover:bg-muted rounded"
                          aria-label={`Remove ${doc.name}`}
                        >
                          <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </motion.li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <h4 className="text-sm font-medium mb-2">Required Documents:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Technical approach document (PDF)</li>
                    <li>• Budget breakdown with labor categories</li>
                    <li>• Section 508 compliance statement</li>
                    <li>• Security & HIPAA compliance documentation</li>
                    <li>• DevSecOps integration plan (if applicable)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Point of Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium" htmlFor="contactName">
                    Contact Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField("contactName", e.target.value)}
                    placeholder="Full name"
                    className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium" htmlFor="contactEmail">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => updateField("contactEmail", e.target.value)}
                      placeholder="name@health.mil"
                      className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium" htmlFor="contactPhone">
                      Phone
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => updateField("contactPhone", e.target.value)}
                      placeholder="(xxx) xxx-xxxx"
                      className="mt-1.5 w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Review Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Program Info Summary */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Program Information
                  </h4>
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="text-sm font-medium">
                        {formData.name || "Not provided"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Type:</span>
                      <span className="text-sm font-medium capitalize">
                        {formData.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Department:
                      </span>
                      <span className="text-sm font-medium">
                        {formData.department || "Not provided"}
                      </span>
                    </div>
                    <div className="pt-2 border-t">
                      <span className="text-sm text-muted-foreground">
                        Description:
                      </span>
                      <p className="text-sm mt-1">
                        {formData.description || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(1)}
                    className="text-xs text-primary hover:underline mt-2"
                  >
                    Edit Program Information
                  </button>
                </div>

                {/* Funding Summary */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Funding Details
                  </h4>
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Requested Amount:
                      </span>
                      <span className="text-sm font-medium font-mono">
                        ${formData.requestedAmount || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Start Date:
                      </span>
                      <span className="text-sm font-medium">
                        {formData.startDate || "Not provided"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">End Date:</span>
                      <span className="text-sm font-medium">
                        {formData.endDate || "Not provided"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(2)}
                    className="text-xs text-primary hover:underline mt-2"
                  >
                    Edit Funding Details
                  </button>
                </div>

                {/* Documents Summary */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Documents ({formData.documents.length} uploaded)
                  </h4>
                  <div className="p-4 rounded-lg bg-muted/50">
                    {formData.documents.length > 0 ? (
                      <ul className="space-y-1">
                        {formData.documents.map((doc, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm"
                          >
                            <FileText className="h-4 w-4 text-primary" />
                            {doc.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No documents uploaded
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => goToStep(3)}
                    className="text-xs text-primary hover:underline mt-2"
                  >
                    Edit Documents
                  </button>
                </div>

                {/* Contact Summary */}
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Point of Contact
                  </h4>
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="text-sm font-medium">
                        {formData.contactName || "Not provided"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm font-medium">
                        {formData.contactEmail || "Not provided"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="text-sm font-medium">
                        {formData.contactPhone || "Not provided"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => goToStep(3)}
                    className="text-xs text-primary hover:underline mt-2"
                  >
                    Edit Contact Information
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Submit Application</CardTitle>
              </CardHeader>
              <CardContent>
                {showSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                      className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center"
                    >
                      <CheckCircle className="h-10 w-10 text-success" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">
                      Application Submitted!
                    </h3>
                    <p className="text-muted-foreground">
                      Your application has been submitted successfully.
                      <br />
                      You will receive a confirmation email shortly.
                    </p>
                    <p className="text-sm text-muted-foreground mt-4">
                      Redirecting to applications...
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                      <h4 className="text-sm font-medium text-warning mb-2">
                        Before Submitting
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • Verify Section 508 compliance documentation is attached
                        </li>
                        <li>• Confirm HIPAA security requirements are addressed</li>
                        <li>• Review AWS GovCloud infrastructure requirements</li>
                        <li>
                          • Ensure DevSecOps integration plan is complete
                        </li>
                      </ul>
                    </div>

                    <div className={cn(
                      "p-4 rounded-lg bg-muted/50",
                      errors.isCertified && "border border-destructive"
                    )}>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="mt-1"
                          id="certify"
                          checked={isCertified}
                          onChange={(e) => {
                            setIsCertified(e.target.checked);
                            if (e.target.checked) {
                              setErrors((prev) => ({ ...prev, isCertified: undefined }));
                            }
                          }}
                        />
                        <span className="text-sm">
                          I certify that all information provided in this
                          application is accurate and compliant with DHA/MHS
                          requirements. I confirm that all Section 508 accessibility,
                          HIPAA security, and DevSecOps integration requirements
                          have been addressed in the supporting documentation.
                        </span>
                      </label>
                      {errors.isCertified && (
                        <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {errors.isCertified}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center">
                      <Button
                        size="lg"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="min-w-[200px]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Submit Application
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
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
          <h1 className="text-2xl font-bold">New Application</h1>
          <p className="text-muted-foreground mt-1">
            Create a new program application
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="h-4 w-4 mr-2" />
            Save Draft
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
                Step {currentStep} of {steps.length}
              </p>
            </div>
            <span className="text-2xl font-bold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <nav aria-label="Application progress">
            <ol className="flex items-center justify-between">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(step.id)}
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors",
                      currentStep > step.id &&
                        "bg-success border-success text-success-foreground",
                      currentStep === step.id &&
                        "border-primary text-primary",
                      currentStep < step.id &&
                        "border-muted text-muted-foreground hover:border-muted-foreground"
                    )}
                    aria-label={`Go to ${step.name}`}
                    aria-current={currentStep === step.id ? "step" : undefined}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </button>
                  <span
                    className={cn(
                      "ml-2 text-sm hidden sm:inline",
                      currentStep === step.id && "font-medium",
                      currentStep < step.id && "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "hidden sm:block w-8 h-0.5 mx-2",
                        currentStep > step.id ? "bg-success" : "bg-muted"
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
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>
        </div>

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
                {currentStep === 1 &&
                  "I can help you fill out program details. Select from EIDS-supported application types and MHS departments."}
                {currentStep === 2 &&
                  "Provide accurate budget estimates with labor categories. I can suggest ranges based on similar DHA programs."}
                {currentStep === 3 &&
                  "Upload all required documents including Section 508 compliance and security documentation."}
                {currentStep === 4 &&
                  "Review all information carefully. Ensure HIPAA and DevSecOps requirements are addressed."}
                {currentStep === 5 &&
                  "You're almost done! Verify certification before submitting to the EIDS review queue."}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-background/50"
              >
                <div className="flex gap-3">
                  <Lightbulb className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm">
                      {currentStep === 1 &&
                        "Pro tip: Include AWS GovCloud requirements and SAFe/Agile methodology in your description."}
                      {currentStep === 2 &&
                        "EIDS task orders typically range $100K-$2M. Ensure labor categories align with PWS requirements."}
                      {currentStep === 3 &&
                        "Section 508 and HIPAA compliance documentation are mandatory for all MHS applications."}
                      {currentStep === 4 &&
                        "Click 'Edit' links to modify sections. Ensure interoperability requirements are documented."}
                      {currentStep === 5 &&
                        "Applications enter the DHA review queue. Expect confirmation within 2 business days."}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      AI suggestion • 95% confidence
                    </p>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      {!showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between gap-3 mt-8 pt-6 border-t"
        >
          <Button variant="outline" asChild>
            <Link href="/applications">Cancel</Link>
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={goBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            {currentStep < steps.length ? (
              <Button onClick={goNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : null}
          </div>
        </motion.div>
      )}
    </div>
  );
}
