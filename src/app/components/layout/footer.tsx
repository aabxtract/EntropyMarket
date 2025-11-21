export default function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex h-16 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Entropy Market. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
