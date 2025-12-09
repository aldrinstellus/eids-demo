import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-muted-foreground">
            EIDS Data Applications
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-4 text-muted-foreground">
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
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center sm:text-left">
          © 2025 Defense Health Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
