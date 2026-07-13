"use client";

import { useLanguage } from "@/components/LanguageProvider";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-black/45 p-1 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-md">
      {(["tr", "en"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={`rounded-full px-3 py-1.5 text-xs font-black transition duration-300 ${
            language === item
              ? "bg-amber-500 text-black"
              : "text-amber-300 hover:bg-amber-500/10"
          }`}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
