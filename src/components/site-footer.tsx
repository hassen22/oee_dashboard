export function SiteFooter() {
  return (
    <footer className="border-t px-4 py-3 text-sm text-muted-foreground sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <span>© {new Date().getFullYear()} ONIQ</span>
        <span>Production Excellence Dashboard</span>
      </div>
    </footer>
  );
}

export default SiteFooter;
