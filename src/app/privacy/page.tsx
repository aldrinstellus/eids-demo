import { Shield, FileText, Lock, Eye, Database, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Defense Health Agency is committed to protecting your privacy and
            ensuring the security of your personal health information.
          </p>
          <p className="text-sm text-muted-foreground">
            Last Updated: December 2025
          </p>
        </div>

        {/* Information Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              The EIDS Data Applications system collects and processes the following
              types of information:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Personal Identifiable Information (PII):</strong> Name, date of birth,
                Social Security Number, contact information, and military service records.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Protected Health Information (PHI):</strong> Medical records,
                treatment history, diagnoses, prescriptions, and healthcare provider notes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>System Usage Data:</strong> Login timestamps, access logs,
                and application interactions for security and auditing purposes.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              How We Protect Your Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement comprehensive security measures to protect your information:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  All data is encrypted in transit (TLS 1.3) and at rest (AES-256).
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Access Controls</h4>
                <p className="text-sm text-muted-foreground">
                  Role-based access control (RBAC) ensures only authorized personnel
                  can view sensitive information.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Audit Logging</h4>
                <p className="text-sm text-muted-foreground">
                  All access to PHI/PII is logged and monitored for compliance.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Compliance</h4>
                <p className="text-sm text-muted-foreground">
                  HIPAA, FedRAMP High, and DoD IL5 compliant infrastructure.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your information is used exclusively for:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Providing healthcare services and benefits to veterans and service members</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Processing claims and managing healthcare benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Coordinating care between healthcare providers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Meeting legal and regulatory requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Improving healthcare quality and system performance</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Health records are retained in accordance with federal regulations:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Medical records: Retained for the lifetime of the patient plus 3 years</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Administrative records: 6-10 years per NARA requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Audit logs: Minimum 6 years for compliance</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Under HIPAA and the Privacy Act, you have the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Access your health records and request copies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Request corrections to inaccurate information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Receive an accounting of disclosures of your PHI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Request restrictions on certain uses of your information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>File a complaint if you believe your privacy rights have been violated</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="text-center text-sm text-muted-foreground space-y-2 pt-4">
          <p>
            For questions about this privacy policy or to exercise your rights,
            please contact our Privacy Office.
          </p>
          <p>
            Defense Health Agency Privacy Office<br />
            7700 Arlington Boulevard<br />
            Falls Church, VA 22042
          </p>
        </div>
      </div>
    </div>
  );
}
