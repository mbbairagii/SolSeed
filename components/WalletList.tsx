"use client";

import { useEffect } from "react";
import WalletCard from "./WalletCard";
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
        if (!mnemonic) return;
        if (wallets.length > 0) return;

        const firstWallet = deriveWallet(mnemonic, 0);
        onAddWallet(firstWallet);
    }, [mnemonic, wallets.length]); // <-- important


    const handleAddWallet = () => {
        const newWallet = deriveWallet(mnemonic, wallets.length);
        onAddWallet(newWallet);
    };

    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-normal tracking-tight">
                    Your Wallets
                </h2>
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

            <div className="grid gap-6">
                {wallets.map((wallet, index) => (
                    <WalletCard key={wallet.publicKey} wallet={wallet} index={index} />
                ))}
            </div>
        </div>
    );
}