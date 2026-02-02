# SolSeed 

A clean client-side Solana wallet generator with seed phrase generation, multiple wallet creation, and real-time balance checking.

## Features

- 🔐 Generate secure 12-word seed phrases
- 💼 Create multiple Solana wallets from one seed
- 💰 Check real-time SOL balance
- 🌓 Dark/Light theme toggle
- 🎨 Elite typography and animations
- 🔒 100% client-side - no servers, no storage

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Blockchain:** Solana Web3.js
- **Fonts:** Spectral (serif) + JetBrains Mono (monospace)

## Project Structure

```
solseed-wallet/
├── app/
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── Header.tsx           # Header with theme toggle
│   ├── Hero.tsx             # Hero section
│   ├── SeedPhrase.tsx       # Seed phrase display
│   ├── WalletCard.tsx       # Individual wallet card
│   └── WalletsList.tsx      # Wallets container
├── lib/
│   └── wallet.ts            # Wallet generation utilities
├── types/
│   └── wallet.ts            # TypeScript types
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Security Warning

⚠️ This is a demo application. Never use seed phrases generated here for real funds without proper security measures. Always:
- Store seed phrases offline
- Never share seed phrases with anyone
- Use hardware wallets for significant amounts
- Verify the source code before use

Designed and Developed by Kira