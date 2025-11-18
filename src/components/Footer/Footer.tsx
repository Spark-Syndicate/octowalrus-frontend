import { Link } from "../ui/link";
import { Separator } from "../ui/separator";

export const Footer = () => {
  return (
    <footer className="mt-auto border-t bg-muted/50 py-6">
      <div className="container mx-auto max-w-7xl px-4">
        <Separator className="mb-4" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} octowalrus-frontend. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" variant="muted" className="text-sm">
              Privacy Policy
            </Link>
            <Link href="#" variant="muted" className="text-sm">
              Terms of Service
            </Link>
            <Link href="#" variant="muted" className="text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
