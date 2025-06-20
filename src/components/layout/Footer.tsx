export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background/50 py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Relational Bridges. Inspired by "Los hábitos de Jesús" by Jay Dennis.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Built with 🧡 and intention.
        </p>
      </div>
    </footer>
  );
}
