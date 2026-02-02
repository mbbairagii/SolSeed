"use client";

import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import type { Wallet } from "@/types/wallet";
import { connection } from "@/lib/solana";


interface WalletCardProps {
    wallet: Wallet;
    index: number;
}

export default function WalletCard({ wallet, index }: WalletCardProps) {
    const [balance, setBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    

    const fetchBalance = async () => {
        setLoading(true);
        try {
            
            const publicKey = new PublicKey(wallet.publicKey);

            const balanceInLamports = await connection.getBalance(publicKey);
            setBalance(balanceInLamports / LAMPORTS_PER_SOL);
        } catch {
            // silently fail (RPC hiccup / rate limit)
            setBalance(null);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchBalance();
    }, [wallet.publicKey]); // eslint-disable-line react-hooks/exhaustive-deps

    const togglePrivateKey = () => {
        setShowPrivateKey(!showPrivateKey);
    };

    const copyToClipboard = async (text: string, type: string) => {
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
                    {loading ? "Loading..." : "Refresh Balance"}
                </button>
            </div>

            {/* Public Key */}
            <div className="mb-4">
                <label className="text-xs text-[var(--text-secondary)] uppercase tracking-wider mb-2 block">
                    Public Key
                </label>
                <div className="
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
        ">
                    <span className="flex-1">{wallet.publicKey}</span>
                    <button
                        onClick={() => copyToClipboard(wallet.publicKey, "Public Key")}
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
                <div className="
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
        ">
                    <span className={`flex-1 ${showPrivateKey ? "" : "blur-md select-none"}`}>
                        {showPrivateKey ? wallet.privateKey : "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}
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
                                onClick={() => copyToClipboard(wallet.privateKey, "Private Key")}
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

            {/* Balance */}
            <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <span className="text-[var(--text-secondary)] text-sm">Balance</span>
                <span className="font-mono text-2xl font-medium text-[var(--accent)]">
                    {loading ? (
                        <span className="text-[var(--text-secondary)] text-base">Loading...</span>
                    ) : balance !== null ? (
                        `${balance.toFixed(4)} SOL`
                    ) : (
                        <span className="text-[var(--text-secondary)] text-base">0.0000 SOL</span>
                    )}
                </span>
            </div>
        </div>
    );
}