export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.10),transparent_28%),linear-gradient(180deg,#050505_0%,#090909_48%,#000_100%)]">
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-amber-500/5 blur-3xl" />
    </div>
  );
}
