type Props = {
  eyebrow: string;
  subtitle: string;
  slogan: string;
};

export default function Hero({ eyebrow, subtitle, slogan }: Props) {
  return (
    <section className="mb-8 pt-2 text-center">

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-400 sm:tracking-[0.45em]">
        {eyebrow}
      </p>

      <h1 className="text-7xl font-black tracking-[0.16em] text-amber-500 drop-shadow-[0_0_28px_rgba(245,158,11,0.26)] sm:text-8xl">
        ZENA
      </h1>

      <p className="mt-4 text-base font-semibold text-white">
        {slogan}
      </p>

      <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

      <p className="mx-auto mt-6 max-w-xs text-sm leading-6 text-zinc-400">
        {subtitle}
      </p>

    </section>
  );
}
