"use client";

import { useState } from "react";

interface SeedPhraseProps {
    mnemonic: string;
    onReset: () => void;
}

export default function SeedPhrase({ mnemonic, onReset }: SeedPhraseProps) {
    const [copied, setCopied] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const words = mnemonic.split(" ");

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(mnemonic);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-10 mb-12 animate-slideUp">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-normal tracking-tight">
                    Your Seed Phrase
                </h3>
                <button
                    onClick={onReset}
                    className="
            bg-transparent 
            border border-[var(--border)] 
            text-[var(--text-primary)]
            px-4 py-2 
            font-mono 
            text-xs
            rounded 
            cursor-pointer 
            transition-all 
            duration-300
            hover:border-red-500
            hover:text-red-500
          "
                >
                    Reset Wallet
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {words.map((word, index) => (
                    <div
                        key={index}
                        className="
              seed-word
              bg-[var(--bg-primary)] 
              border border-[var(--border)] 
              p-4 
              rounded 
              font-mono 
              text-sm
              flex items-center gap-3
              transition-all 
              duration-300
              hover:border-[var(--accent)]
              hover:-translate-y-0.5
              animate-fadeInWord
            "
                    >
                        <span className="text-[var(--text-secondary)] text-xs">
                            {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <span className={isVisible ? "" : "blur-sm select-none"}>
                            {isVisible ? word : "••••••"}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex gap-3 flex-wrap">
                <button
                    onClick={toggleVisibility}
                    className="
            bg-transparent 
            border border-[var(--border)] 
            text-[var(--text-primary)]
            px-6 py-3 
            font-mono 
            text-sm
            rounded 
            cursor-pointer 
            transition-all 
            duration-300
            hover:border-[var(--accent)]
            hover:text-[var(--accent)]
          "
                >
                    {isVisible ? "👁️ Hide" : "👁️ Show"} Seed Phrase
                </button>

                <button
                    onClick={copyToClipboard}
                    className="
            bg-transparent 
            border border-[var(--border)] 
            text-[var(--text-primary)]
            px-6 py-3 
            font-mono 
            text-sm
            rounded 
            cursor-pointer 
            transition-all 
            duration-300
            hover:border-[var(--accent)]
            hover:text-[var(--accent)]
          "
                >
                    {copied ? "✓ Copied!" : "📋 Copy to Clipboard"}
                </button>
            </div>
        </div>
    );
}