import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Center-aligned navigation links */}
        <nav aria-label="Footer navigation" className="text-center mb-3">
          <ul className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-foreground transition-colors">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-foreground transition-colors">
                Contact Support
              </Link>
            </li>
          </ul>
        </nav>
        {/* Center-aligned copyright and branding */}
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            EIDS Data Applications
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 Defense Health Agency. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
