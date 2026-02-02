"use client";

import { useState } from "react";

interface SeedInputProps {
    onImport: (mnemonic: string) => void;
}

export default function SeedInput({ onImport }: SeedInputProps) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleImport = () => {
        const trimmed = input.trim();
        const words = trimmed.split(/\s+/);

        if (words.length !== 12) {
            setError("Please enter exactly 12 words");
            return;
        }

        setError("");
        onImport(trimmed);
        setInput("");
    };

    return (
        <section className="max-w-3xl mx-auto mb-24 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <div className="text-center mb-8">
                <div className="inline-block w-16 h-[1px] bg-[var(--border)] mb-8"></div>
                <h2 className="text-3xl font-light tracking-tight mb-4">
                    Or Import Existing Seed
                </h2>
                <p className="text-[var(--text-secondary)] text-sm">
                    Enter your 12-word seed phrase to recover your wallets
                </p>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-8">
                <textarea
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        setError("");
                    }}
                    placeholder="Enter your 12-word seed phrase here..."
                    className="
            w-full
            bg-[var(--bg-primary)]
            border border-[var(--border)]
            rounded
            p-4
            font-mono
            text-sm
            text-[var(--text-primary)]
            placeholder:text-[var(--text-secondary)]
            focus:border-[var(--accent)]
            focus:outline-none
            transition-colors
            resize-none
            h-32
          "
                />

                {error && (
                    <p className="text-red-500 text-sm mt-2 font-mono">{error}</p>
                )}

                <button
                    onClick={handleImport}
                    disabled={!input.trim()}
                    className="
            mt-4
            w-full
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
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:border-[var(--border)]
            disabled:hover:text-[var(--text-primary)]
          "
                >
                    Import Wallet
                </button>
            </div>
        </section>
    );
}