"use client";

export default function Footer() {
    return (
        <footer className="w-full py-8 mt-16 border-t border-[var(--border)]">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm text-[var(--text-secondary)] font-mono">
                        Designed and developed by {" "}
                        <span className="text-[var(--accent)] font-medium">Kira</span>
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-2">
                        © {new Date().getFullYear()} SolSeed. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}