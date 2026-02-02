"use client";

import { useEffect, useState } from "react";

export default function Header() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        // Check for saved theme preference or default to 'dark'
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const initialTheme = savedTheme || "dark";
        setTheme(initialTheme);

        // Use 'dark' class instead of 'light' class
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        // Use 'dark' class instead of 'light' class
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <header className="flex justify-between items-center py-8 mb-16 animate-fadeInDown">
            <div className="text-3xl font-semibold tracking-tight">
                Sol<span className="text-[var(--accent)] font-light italic">Seed 🌱</span>
            </div>

            <button
                onClick={toggleTheme}
                className="
          w-[60px] h-8 
          bg-[var(--bg-secondary)] 
          border border-[var(--border)] 
          rounded-full 
          cursor-pointer 
          relative 
          transition-all 
          duration-300
          hover:border-[var(--accent)]
        "
                aria-label="Toggle theme"
            >
                <div
                    className={`
            absolute w-6 h-6 
            rounded-full 
            bg-[var(--accent)] 
            top-[3px] 
            transition-transform 
            duration-300 
            ease-out
            ${theme === "light" ? "translate-x-[28px] left-[3px]" : "left-[3px]"}
          `}
                />
            </button>
        </header>
    );
}