"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const NAV_LINKS = [
  { label: "מצא מתווך", href: "/agents" },
  { label: "על הפלטפורמה", href: "/about" },
  { label: "בלוג", href: "/blog" },
];

export default function Header() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleLogout() {
    await logout();
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const roleLabel: Record<string, string> = { owner: "בעל נכס", agent: "מתווך" };

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center">
            <span className="text-black font-bold text-sm">נ</span>
          </div>
          <span className="text-xl font-bold tracking-wide gold-shimmer">נדלניסט</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`transition-colors duration-200 ${
                pathname === item.href
                  ? "text-[#C9A84C]"
                  : "text-gray-400 hover:text-[#C9A84C]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth area */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-24 h-8 rounded bg-[#2A2A2A] animate-pulse" />
          ) : user ? (
            /* User menu */
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-[#2A2A2A] bg-[#161616] hover:border-[#C9A84C]/40 transition-all"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-yellow-500 flex items-center justify-center">
                  <span className="text-black font-bold text-xs">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="hidden md:block text-right">
                  <div className="text-white text-sm font-medium leading-tight">
                    {user.name.split(" ")[0]}
                  </div>
                  <div className="text-[#C9A84C] text-[10px] leading-tight">
                    {roleLabel[user.role]}
                  </div>
                </div>
                <svg
                  className={`w-3.5 h-3.5 text-gray-500 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-[#2A2A2A] bg-[#161616] shadow-2xl shadow-black/40 overflow-hidden">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-[#2A2A2A]">
                    <div className="text-white font-medium text-sm">{user.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5 truncate">{user.email}</div>
                  </div>

                  <div className="p-1.5">
                    {[
                      { label: "הפרופיל שלי", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", href: "/profile" },
                      { label: "הנכסים שלי", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", href: "#" },
                      { label: "הגדרות", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z", href: "#" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#2A2A2A] transition-colors text-sm"
                      >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  <div className="p-1.5 border-t border-[#2A2A2A]">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      יציאה
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Guest buttons */
            <>
              <Link
                href="/login"
                className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors"
              >
                כניסה למתווכים
              </Link>
              <Link
                href="/register"
                className="text-sm px-4 py-2 rounded border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-200 font-medium"
              >
                הצטרפו כמתווכ/ת
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
