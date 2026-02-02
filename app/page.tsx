"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SeedInput from "@/components/SeedInput";
import SeedPhrase from "@/components/SeedPhrase";
import WalletsList from "@/components/WalletList";
import { generateMnemonic, validateMnemonic } from "@/lib/wallet";
import type { Wallet } from "@/types/wallet";

export default function Home() {
  const [mnemonic, setMnemonic] = useState<string | null>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [mode, setMode] = useState<"generate" | "import" | null>(null);

  const handleGenerateWallet = () => {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    setWallets([]);
    setMode("generate");
  };

  const handleImportWallet = (importedMnemonic: string) => {
    if (validateMnemonic(importedMnemonic)) {
      setMnemonic(importedMnemonic);
      setWallets([]);
      setMode("import");
    }
  };

  const handleAddWallet = (wallet: Wallet) => {
    setWallets((prev) => {
      if (prev.some(w => w.publicKey === wallet.publicKey)) {
        return prev; // silently ignore duplicates
      }
      return [...prev, wallet];
    });
  };


  const handleReset = () => {
    setMnemonic(null);
    setWallets([]);
    setMode(null);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

      {/* 🔥 Glowy background image */}
      <div
        className="
        absolute inset-0
        bg-[url('/xxx.png')]
        bg-center bg-no-repeat bg-cover
        opacity-25
        
        scale-110
        pointer-events-none
      "
      />

      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Main content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        {!mnemonic ? (
          <>
            <Hero onGenerate={handleGenerateWallet} />
            <SeedInput onImport={handleImportWallet} />
          </>
        ) : (
          <>
            <div className="mb-8 animate-fadeIn">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <p className="text-sm leading-relaxed">
                  <strong className="text-yellow-500 font-semibold">⚠️ Security Warning:</strong>{" "}
                  This seed phrase gives complete access to your wallets. Write it down and store it
                  securely offline. Never share it with anyone. If you lose it, you lose access to
                  your funds forever.
                </p>
              </div>
            </div>

            <SeedPhrase mnemonic={mnemonic} onReset={handleReset} />

            <WalletsList
              mnemonic={mnemonic}
              wallets={wallets}
              onAddWallet={handleAddWallet}
            />
          </>
        )}
      </div>

    </div>
  );

}