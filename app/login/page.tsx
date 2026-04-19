"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

const supabase = createClient();

const AUTH_ERRORS: Record<string, string> = {
  invalid_credentials: "אימייל או סיסמה שגויים",
  email_not_confirmed: "יש לאמת את כתובת האימייל לפני הכניסה — בדקו את תיבת הדואר",
  too_many_requests: "יותר מדי ניסיונות — נסו שוב עוד מספר דקות",
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (signInError) {
      const code = (signInError as { code?: string }).code ?? "";
      setError(AUTH_ERRORS[code] ?? signInError.message);
      setLoading(false);
      return;
    }

    router.push("/?welcome=true");
    router.refresh();
  }

  async function handleForgot(e: React.MouseEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("הזינו כתובת אימייל כדי לאפס סיסמה");
      return;
    }
    setForgotLoading(true);
    await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setForgotLoading(false);
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 6000);
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      <header className="border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center">
              <span className="text-black font-bold text-sm">נ</span>
            </div>
            <span className="text-xl font-bold tracking-wide gold-shimmer">נדלניסט</span>
          </Link>
          <Link href="/register" className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors">
            אין לכם חשבון? <span className="text-[#C9A84C]">הירשמו</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A84C]/4 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">ברוכים השבים</h1>
              <p className="text-gray-400 text-sm">היכנסו לחשבון נדלניסט שלכם</p>
            </div>

            <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-8">
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Error banner */}
                {error && (
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Forgot password success */}
                {forgotSent && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    קישור לאיפוס נשלח ל-<span className="font-medium">{email}</span>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">כתובת אימייל</label>
                  <div className="relative">
                    <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@example.com"
                      dir="ltr"
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg pr-10 pl-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#C9A84C]/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-gray-400 text-xs">סיסמה</label>
                    <button
                      type="button"
                      onClick={handleForgot}
                      disabled={forgotLoading}
                      className="text-xs text-gray-500 hover:text-[#C9A84C] transition-colors disabled:opacity-50"
                    >
                      {forgotLoading ? "שולח..." : "שכחתי סיסמה"}
                    </button>
                  </div>
                  <div className="relative">
                    <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      placeholder="הסיסמה שלכם"
                      className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg pr-10 pl-10 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#C9A84C]/50 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg bg-[#C9A84C] hover:bg-[#E8C96A] disabled:opacity-60 text-black font-semibold transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      מתחבר...
                    </>
                  ) : "כניסה לחשבון"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[#2A2A2A]" />
                <span className="text-gray-600 text-xs">או</span>
                <div className="flex-1 h-px bg-[#2A2A2A]" />
              </div>

              <p className="text-center text-sm text-gray-500">
                עדיין אין לכם חשבון?{" "}
                <Link href="/register" className="text-[#C9A84C] hover:text-[#E8C96A] font-medium transition-colors">
                  הירשמו בחינם
                </Link>
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 mt-6">
              {[
                { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "מאובטח" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "פרטיות מלאה" },
                { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", label: "1,200+ חברים" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-gray-600 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icon} />
                  </svg>
                  {b.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
