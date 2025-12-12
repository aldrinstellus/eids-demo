import { Accessibility, Eye, Keyboard, Monitor, Volume2, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Accessibility className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Accessibility Statement</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The Defense Health Agency is committed to ensuring digital accessibility
            for all users, including those with disabilities.
          </p>
        </div>

        {/* Commitment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Our Commitment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              EIDS Data Applications is designed and developed to be accessible to
              all users, regardless of ability. We follow these standards:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <h4 className="font-medium mb-2 text-emerald-400">WCAG 2.1 Level AA</h4>
                <p className="text-sm text-muted-foreground">
                  Web Content Accessibility Guidelines ensuring perceivable,
                  operable, understandable, and robust content.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                <h4 className="font-medium mb-2 text-blue-400">Section 508</h4>
                <p className="text-sm text-muted-foreground">
                  Federal accessibility requirements for information and
                  communication technology.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Accessibility Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <Keyboard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Keyboard Navigation</h4>
                  <p className="text-sm text-muted-foreground">
                    All functionality is accessible via keyboard. Use Tab to navigate,
                    Enter/Space to activate, and Escape to close dialogs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <Volume2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Screen Reader Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Fully compatible with screen readers including JAWS, NVDA,
                    and VoiceOver. All images have alt text and interactive
                    elements have descriptive labels.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Visual Accessibility</h4>
                  <p className="text-sm text-muted-foreground">
                    High contrast mode available, minimum 4.5:1 color contrast ratio,
                    resizable text up to 200% without loss of functionality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <Monitor className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Responsive Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Application adapts to all screen sizes and orientations.
                    Works on desktop, tablet, and mobile devices.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-primary" />
              Keyboard Shortcuts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Skip to main content</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Tab</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Navigate between elements</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Tab / Shift+Tab</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Activate buttons/links</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Enter / Space</kbd>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Close dialogs/menus</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Escape</kbd>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Navigate within menus</span>
                <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">Arrow keys</kbd>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Known Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Known Accessibility Limitations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We are continuously working to improve accessibility. Current known
              limitations include:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Some complex data visualizations may require alternative text descriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>PDF exports may not be fully accessible; HTML alternatives available</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              We aim to remediate all identified issues within 90 days of discovery.
            </p>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Feedback & Assistance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We welcome your feedback on the accessibility of EIDS Data Applications.
              If you encounter any barriers or need assistance:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Report Issues</h4>
                <p className="text-sm text-muted-foreground">
                  Email: accessibility@health.mil<br />
                  Include the URL and description of the issue.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-medium mb-2">Request Assistance</h4>
                <p className="text-sm text-muted-foreground">
                  Phone: 1-800-555-0199 (TTY available)<br />
                  Available 24/7 for accessibility support.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground space-y-2 pt-4">
          <p>
            This accessibility statement was last reviewed on December 2025.
          </p>
          <p>
            Defense Health Agency Section 508 Compliance Office
          </p>
        </div>
      </div>
    </div>
  );
}
