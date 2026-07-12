import Link from "next/link";

interface Props {
  title: string;
  href: string;
}

export default function CategoryCard({
  title,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="group flex min-h-16 items-center justify-between rounded-2xl border border-amber-500/20 bg-zinc-950/80 px-5 py-4 text-left text-lg font-semibold text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur transition-all duration-300 hover:border-amber-400 hover:bg-amber-500 hover:text-black"
    >
      <span className="min-w-0 break-words pr-3">{title}</span>
      <span className="shrink-0 text-amber-400 transition group-hover:translate-x-1 group-hover:text-black">
        →
      </span>
    </Link>
  );
}
