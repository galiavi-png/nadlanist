"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Header from "@/app/components/Header";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C]/30 border-t-[#C9A84C] animate-spin" />
      </div>
    );
  }

  const firstNameChar = user.name.charAt(0);
  const firstName = user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        {/* Welcome */}
        <div className="mb-8">
          <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-1">דשבורד אישי</p>
          <h1 className="text-3xl font-bold text-white">שלום, {firstName}</h1>
        </div>

        {/* Subscription notice */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 mb-6 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold mb-1">הפרופיל שלך אינו מופיע בחיפוש</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              כדי שלקוחות יוכלו למצוא אותך בדף המתווכים, עליך לבחור מנוי.
              הרשמתך הושלמה בהצלחה — צעד אחד נוסף ותהיה גלוי לאלפי לקוחות פוטנציאליים.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C9A84C] hover:bg-[#E8C96A] text-black text-sm font-semibold transition-colors"
            >
              שדרג מנוי
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Profile summary */}
        <div className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 mb-6">
          <h2 className="text-white font-semibold mb-4">פרטי הפרופיל</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-500 flex items-center justify-center flex-shrink-0">
              <span className="text-black font-bold text-xl">{firstNameChar}</span>
            </div>
            <div>
              <div className="text-white font-semibold">{user.name}</div>
              <div className="text-gray-500 text-sm">{user.email}</div>
              {user.phone && <div className="text-gray-500 text-sm">{user.phone}</div>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {user.specialty && (
              <div className="rounded-lg bg-[#0D0D0D] border border-[#2A2A2A] px-4 py-3">
                <div className="text-gray-500 text-xs mb-0.5">התמחות</div>
                <div className="text-white text-sm">{user.specialty}</div>
              </div>
            )}
            {user.areas && user.areas.length > 0 && (
              <div className="rounded-lg bg-[#0D0D0D] border border-[#2A2A2A] px-4 py-3">
                <div className="text-gray-500 text-xs mb-0.5">אזורי פעילות</div>
                <div className="text-white text-sm">{user.areas.join("، ")}</div>
              </div>
            )}
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/pricing"
            className="rounded-2xl border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-5 hover:border-[#C9A84C]/40 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div className="text-white font-semibold text-sm mb-1">בחר מנוי</div>
            <div className="text-gray-500 text-xs">הופיע בתוצאות החיפוש וקבל לידים</div>
          </Link>

          <Link
            href="/agents"
            className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-5 hover:border-[#C9A84C]/20 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2A2A2A] flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-white font-semibold text-sm mb-1">צפה במתווכים</div>
            <div className="text-gray-500 text-xs">ראה את הפלטפורמה מנקודת מבט של לקוח</div>
          </Link>
        </div>
      </main>
    </div>
  );
}
