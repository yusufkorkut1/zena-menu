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
      className="
      block
      rounded-2xl
      border
      border-amber-500/30
      bg-zinc-900/80
      backdrop-blur-lg
      p-5
      text-center
      text-lg
      font-semibold
      transition-all
      duration-300
      hover:bg-amber-500
      hover:text-black
      hover:scale-[1.03]
      "
    >
      {title}
    </Link>
  );
}