export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} Uzay Poyraz
        </p>
        <p className="text-sm text-text-muted">Built with Next.js</p>
      </div>
    </footer>
  );
}
