import { Mail, Phone, Clock, MessageSquare, FileText, HelpCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContactSupportPage() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Contact Support</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get help with EIDS Data Applications. Our support team is available
            to assist with technical issues, access requests, and general inquiries.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-emerald-500/10">
                  <Phone className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-2xl font-bold text-primary mb-2">1-800-555-EIDS</p>
              <p className="text-sm text-muted-foreground">
                (1-800-555-3437)
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                TTY: 1-800-555-3438
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-500/10">
                  <Mail className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-primary font-medium mb-2">support@eids.health.mil</p>
              <p className="text-sm text-muted-foreground">
                Response within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-amber-500/10">
                  <Clock className="h-6 w-6 text-amber-400" />
                </div>
              </div>
              <h3 className="font-semibold mb-2">Support Hours</h3>
              <p className="text-muted-foreground text-sm">
                <strong>Monday - Friday</strong><br />
                6:00 AM - 10:00 PM ET
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                <strong>Saturday - Sunday</strong><br />
                8:00 AM - 6:00 PM ET
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Common Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Common Support Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <h4 className="font-medium mb-2">Account Access</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Issues with login, password reset, or account lockouts.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Get Help
                </Button>
              </div>

              <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <h4 className="font-medium mb-2">Permission Requests</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Request access to additional applications or data.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Submit Request
                </Button>
              </div>

              <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <h4 className="font-medium mb-2">Technical Issues</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Report bugs, errors, or performance problems.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Report Issue
                </Button>
              </div>

              <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <h4 className="font-medium mb-2">Training & Documentation</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Access user guides, tutorials, and training materials.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Resources
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit a Ticket */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Submit a Support Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              For non-urgent issues, submit a support ticket and our team will
              respond within 24 hours. Please include:
            </p>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Your name and contact information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Application or feature affected</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Description of the issue and steps to reproduce</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Screenshots if applicable</span>
              </li>
            </ul>
            <Button className="w-full sm:w-auto">
              <MessageSquare className="h-4 w-4 mr-2" />
              Open Support Ticket
            </Button>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Phone className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-red-400 mb-2">
                  Security Incidents & Emergencies
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  For suspected security breaches, unauthorized access, or system
                  emergencies requiring immediate attention:
                </p>
                <p className="font-bold text-lg">
                  24/7 Security Hotline: 1-800-555-SEC1
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Email: security@eids.health.mil
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  EIDS User Guide (PDF)
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  Video Tutorials
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  FAQ & Knowledge Base
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  System Status Page
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground space-y-2 pt-4">
          <p>
            Defense Health Agency Help Desk<br />
            7700 Arlington Boulevard, Falls Church, VA 22042
          </p>
        </div>
      </div>
    </div>
  );
}
