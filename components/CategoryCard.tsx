import Link from "next/link";

interface Props {
  title: string;
  href: string;
  caption: string;
}

export default function CategoryCard({
  title,
  href,
  caption,
}: Props) {
  return (
    <Link
      href={href}
      className="group flex min-h-20 items-center justify-between rounded-3xl border border-amber-500/15 bg-zinc-950/85 px-5 py-4 text-left shadow-[0_20px_70px_rgba(0,0,0,0.30)] backdrop-blur transition duration-300 hover:scale-[1.015] hover:border-amber-400/70 hover:bg-zinc-900"
    >
      <span className="min-w-0 pr-4">
        <span className="block break-words text-lg font-black text-white">
          {title}
        </span>
        <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
          {caption}
        </span>
      </span>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 transition duration-300 group-hover:translate-x-1 group-hover:bg-amber-500 group-hover:text-black">
        →
      </span>
    </Link>
  );
}
