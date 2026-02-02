"use client";

interface HeroProps {
    onGenerate: () => void;
}

export default function Hero({ onGenerate }: HeroProps) {
    return (
        <section className="text-center mb-24 animate-fadeIn">
            <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
                Read-only Solana Wallet
            </h1>

            <p className="text-xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                Generate secure seed phrases, create multiple wallets, and monitor your
                Solana balance (all locally in your browser)
            </p>

            <button
                onClick={onGenerate}
                className="
          group
          relative
          bg-[var(--accent)] 
          text-[var(--bg-primary)] 
          font-mono
          px-10 py-4 
          text-sm
          font-medium 
          rounded 
          uppercase 
          tracking-wider
          cursor-pointer 
          overflow-hidden
          transition-all 
          duration-300
          hover:translate-y-[-2px]
          hover:shadow-[0_10px_40px_rgba(0,255,136,0.3)]
        "
            >
                <span
                    className="
            absolute 
            top-1/2 left-1/2 
            w-0 h-0 
            rounded-full 
            bg-white/30 
            -translate-x-1/2 -translate-y-1/2
            transition-all 
            duration-700
            group-hover:w-[300px] 
            group-hover:h-[300px]
          "
                />
                <span className="relative z-10">Generate New Seed</span>
            </button>
        </section>
    );
}