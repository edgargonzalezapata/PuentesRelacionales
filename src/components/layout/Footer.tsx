export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-background/50 py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Puentes Relacionales. Inspirado en "Los hábitos de Jesús" de Jay Dennis.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Desarrollado con 🧡 e intención.
        </p>
      </div>
    </footer>
  );
}
