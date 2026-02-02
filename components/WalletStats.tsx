"use client";

import { useEffect, useState } from "react";
import type { Wallet } from "@/types/wallet";

interface WalletStatsProps {
    wallets: Wallet[];
}

export default function WalletStats({ wallets }: WalletStatsProps) {
    const [totalWallets, setTotalWallets] = useState(0);

    useEffect(() => {
        setTotalWallets(wallets.length);
    }, [wallets]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fadeIn">
            {/* Total Wallets */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6">
                <div className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-2">
                    Total Wallets
                </div>
                <div className="font-mono text-3xl font-medium text-[var(--accent)]">
                    {totalWallets}
                </div>
            </div>

            {/* Security Status */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6">
                <div className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-2">
                    Security
                </div>
                <div className="font-mono text-lg font-medium text-green-500 flex items-center gap-2">
                    <span className="text-2xl">🔒</span>
                    Client-Side Only
                </div>
            </div>

            {/* Network */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6">
                <div className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-2">
                    Network
                </div>
                <div className="font-mono text-lg font-medium text-[var(--text-primary)] flex items-center gap-2">
                    <span className="text-2xl">◎</span>
                    Solana Mainnet
                </div>
            </div>
        </div>
    );
}