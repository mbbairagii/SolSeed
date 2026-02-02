import * as bip39 from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import type { Wallet } from "@/types/wallet";

export function generateMnemonic(): string {
    return bip39.generateMnemonic();
}

export function validateMnemonic(mnemonic: string): boolean {
    return bip39.validateMnemonic(mnemonic);
}

export function deriveWallet(mnemonic: string, accountIndex: number): Wallet {
    // Convert mnemonic to seed
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // Derive the path for Solana (m/44'/501'/accountIndex'/0')
    const path = `m/44'/501'/${accountIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    // Create keypair from derived seed
    const keypair = Keypair.fromSeed(derivedSeed);

    // Get private key in base58 format
    const privateKey = bs58.encode(keypair.secretKey);

    return {
        publicKey: keypair.publicKey.toBase58(),
        privateKey: privateKey,
        accountIndex,
    };
}