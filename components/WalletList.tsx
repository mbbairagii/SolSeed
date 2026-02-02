"use client";

import { useEffect } from "react";
import WalletCard from "./WalletCard";
import WalletStats from "./WalletStats";
import { deriveWallet } from "@/lib/wallet";
import type { Wallet } from "@/types/wallet";

interface WalletsListProps {
    mnemonic: string;
    wallets: Wallet[];
    onAddWallet: (wallet: Wallet) => void;
}

export default function WalletsList({ mnemonic, wallets, onAddWallet }: WalletsListProps) {

    // Generate first wallet on mount
    useEffect(() => {
        if (wallets.length === 0) {
            const firstWallet = deriveWallet(mnemonic, 0);
            onAddWallet(firstWallet);
        }
    }, [mnemonic]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddWallet = () => {
        const newWallet = deriveWallet(mnemonic, wallets.length);
        onAddWallet(newWallet);
    };

    const exportWallets = () => {
        const walletsData = wallets.map(w => ({
            index: w.accountIndex,
            publicKey: w.publicKey,
            privateKey: w.privateKey
        }));

        const dataStr = JSON.stringify(walletsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'solseed-wallets.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="mb-12">
            {/* Stats Section */}
            <WalletStats wallets={wallets} />

            {/* Header with actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-3xl font-normal tracking-tight">
                    Your Wallets
                </h2>
                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={exportWallets}
                        disabled={wallets.length === 0}
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
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
                    >
                        📥 Export Wallets
                    </button>
                    <button
                        onClick={handleAddWallet}
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
                        + Add Wallet
                    </button>
                </div>
            </div>

            {/* Wallets Grid */}
            <div className="grid gap-6">
                {wallets.map((wallet, index) => (
                    <WalletCard key={wallet.publicKey} wallet={wallet} index={index} />
                ))}
            </div>
        </div>
    );
}