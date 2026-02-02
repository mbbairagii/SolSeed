import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolSeed - Read-only Solana Wallet",
  description: "Generate secure seed phrases, create multiple wallets, and monitor your Solana balance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="grain"></div>
        {children}
      </body>
    </html>
  );
}