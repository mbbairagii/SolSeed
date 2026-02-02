"use client";

import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import type { Wallet } from "@/types/wallet";

interface WalletCardProps {
    wallet: Wallet;
    index: number;
}

export default function WalletCard({ wallet, index }: WalletCardProps) {
    const [solBalance, setSolBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBalance = async () => {
        setLoading(true);
        setError(null);

        try {
            const connection = new Connection("https://rpc.ankr.com/solana", "confirmed");
            const publicKey = new PublicKey(wallet.publicKey);

            const balanceInLamports = await connection.getBalance(publicKey);
            setSolBalance(balanceInLamports / LAMPORTS_PER_SOL);
        } catch {
            setSolBalance(0);
            setError(null);
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchBalance();
        }, index * 400); // small stagger to avoid RPC spam

        return () => clearTimeout(timeout);
    }, [wallet.publicKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const togglePrivateKey = () => {
        setShowPrivateKey(!showPrivateKey);
    };

    const copyToClipboard = async (text: string) => {
        await navigator.clipboard.writeText(text);
    };

    return (
        <div
            className="
        bg-[var(--bg-secondary)]
        border border-[var(--border)]
        rounded-lg
        p-8
        transition-all
        duration-300
        hover:border-[var(--accent)]
        hover:translate-x-1
        animate-slideUp
      "
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="font-mono text-sm text-[var(--text-secondary)] uppercase tracking-widest">
                    Wallet {index + 1}
                </div>
                <button
                    onClick={fetchBalance}
                    disabled={loading}
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
            hover:border-[var(--accent)]
            hover:text-[var(--accent)]
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
                >
                    {loading ? "Loading..." : "🔄 Refresh"}
                </button>
            </div>

            {/* Public Key */}
            <div className="mb-4">
                <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-2 block">
                    Public Key
                </label>
                <div
                    className="
            font-mono
            text-sm
            p-4
            bg-[var(--bg-primary)]
            border border-[var(--border)]
            rounded
            break-all
            flex
            justify-between
            items-start
            gap-2
          "
                >
                    <span className="flex-1">{wallet.publicKey}</span>
                    <button
                        onClick={() => copyToClipboard(wallet.publicKey)}
                        className="
              text-[var(--text-secondary)]
              hover:text-[var(--accent)]
              transition-colors
              flex-shrink-0
            "
                        title="Copy public key"
                    >
                        📋
                    </button>
                </div>
            </div>

            {/* Private Key */}
            <div className="mb-4">
                <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-2 block">
                    Private Key
                </label>
                <div
                    className="
            font-mono
            text-sm
            p-4
            bg-[var(--bg-primary)]
            border border-[var(--border)]
            rounded
            break-all
            flex
            justify-between
            items-start
            gap-2
          "
                >
                    <span className={`flex-1 ${showPrivateKey ? "" : "blur-md select-none"}`}>
                        {showPrivateKey
                            ? wallet.privateKey
                            : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
                    </span>
                    <div className="flex gap-2 flex-shrink-0">
                        <button
                            onClick={togglePrivateKey}
                            className="
                text-[var(--text-secondary)]
                hover:text-[var(--accent)]
                transition-colors
              "
                            title={showPrivateKey ? "Hide private key" : "Show private key"}
                        >
                            {showPrivateKey ? "👁️" : "👁️‍🗨️"}
                        </button>
                        {showPrivateKey && (
                            <button
                                onClick={() => copyToClipboard(wallet.privateKey)}
                                className="
                  text-[var(--text-secondary)]
                  hover:text-[var(--accent)]
                  transition-colors
                "
                                title="Copy private key"
                            >
                                📋
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* SOL Balance */}
            <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">◎</span>
                    <span className="text-[var(--text-secondary)] text-sm">SOL Balance</span>
                </div>
                <span className="font-mono text-2xl font-medium text-[var(--accent)]">
                    {loading ? (
                        <span className="text-[var(--text-secondary)] text-base">...</span>
                    ) : solBalance !== null ? (
                        solBalance.toFixed(4)
                    ) : (
                        <span className="text-[var(--text-secondary)] text-base">—</span>
                    )}
                </span>
            </div>
        </div>
    );
}
