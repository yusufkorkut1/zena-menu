export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 text-center text-xs uppercase tracking-[0.25em] text-zinc-600">

      © {year} ZENA Coffee

    </footer>
  );
}
