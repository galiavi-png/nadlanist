"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";

const planDetails: Record<string, { name: string; price: number; description: string }> = {
  basic: { name: "בסיסי", price: 99, description: "עד 5 מודעות פעילות, פרופיל בסיסי" },
  professional: { name: "מקצועי", price: 199, description: "עד 20 מודעות, תג מאומת, ניתוח מתקדם" },
  premium: { name: "פרימיום", price: 349, description: "ללא הגבלה, מנהל חשבון אישי, תמיכה 24/7" },
};

function CheckoutForm() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan") || "professional";
  const plan = planDetails[planId] || planDetails.professional;

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const vat = Math.round(plan.price * 0.18);
  const total = plan.price + vat;

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-[#161616] border border-[#C9A84C] flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">ההרשמה הושלמה!</h2>
          <p className="text-gray-400 mb-2">ברוכים הבאים למסלול <span className="text-[#C9A84C]">{plan.name}</span>.</p>
          <p className="text-gray-500 text-sm mb-8">אישור נשלח לכתובת האימייל שלכם.</p>
          <Link
            href="/agents"
            className="inline-block bg-[#C9A84C] text-black font-semibold px-8 py-3 rounded-xl hover:bg-[#E8C96A] transition-colors"
          >
            עברו לפרופיל שלכם
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
      {/* Form */}
      <div className="lg:col-span-3 space-y-6">
        <h2 className="text-xl font-bold text-white">פרטי תשלום</h2>

        <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 space-y-5">
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-4 pb-2 border-b border-[#2A2A2A]">
              פרטי יצירת קשר
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">שם מלא</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ישראל ישראלי"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors text-sm"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">כתובת אימייל</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  dir="ltr"
                  className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors text-sm"
                />
              </div>
            </div>
          </div>

          {/* Card */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-4 pb-2 border-b border-[#2A2A2A]">
              פרטי כרטיס אשראי
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">מספר כרטיס</label>
                <div className="relative">
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="0000 0000 0000 0000"
                    dir="ltr"
                    maxLength={19}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors text-sm pr-12"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <div className="w-6 h-4 bg-[#EB001B] rounded-sm opacity-80" />
                    <div className="w-6 h-4 bg-[#F79E1B] rounded-sm opacity-80 -mr-3" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">תוקף</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    dir="ltr"
                    maxLength={5}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1.5">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="000"
                    dir="ltr"
                    maxLength={4}
                    className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security badges */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              תשלום מאובטח SSL
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              תקן PCI DSS
            </div>
          </div>
        </div>

        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-[#C9A84C] text-black font-bold py-4 rounded-xl hover:bg-[#E8C96A] transition-all duration-200 text-base shadow-lg shadow-amber-900/20 active:scale-[0.99]"
        >
          שלמו {total.toLocaleString()} ₪
        </button>

        <p className="text-center text-gray-600 text-xs">
          בלחיצה על &quot;שלמו&quot; אתם מסכימים ל
          <Link href="/terms" className="text-[#C9A84C] hover:underline mx-1">תנאי השימוש</Link>
          ול
          <Link href="/privacy" className="text-[#C9A84C] hover:underline mx-1">מדיניות הפרטיות</Link>
        </p>
      </div>

      {/* Order summary */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold text-white mb-6">סיכום הזמנה</h2>
        <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 sticky top-6">
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#2A2A2A]">
            <div>
              <div className="text-[#C9A84C] font-bold text-lg">מסלול {plan.name}</div>
              <div className="text-gray-500 text-sm mt-1 leading-relaxed max-w-[180px]">{plan.description}</div>
            </div>
            <div className="text-right">
              <div className="text-white font-bold">{plan.price} ₪</div>
              <div className="text-gray-600 text-xs">לחודש</div>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">מחיר לפני מע&quot;מ</span>
              <span className="text-white">{plan.price} ₪</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">מע&quot;מ (18%)</span>
              <span className="text-white">{vat} ₪</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-3 border-t border-[#2A2A2A]">
              <span className="text-white">סה&quot;כ לתשלום</span>
              <span className="text-[#C9A84C] text-base">{total} ₪</span>
            </div>
          </div>

          <div className="bg-[#1A1A1A] rounded-xl p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[#C9A84C] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-xs leading-relaxed">
                14 ימי ניסיון חינם. ביטול בכל עת ללא דמי ביטול לפי{" "}
                <Link href="/cancellation" className="text-[#C9A84C] hover:underline">
                  מדיניות הביטול
                </Link>
                .
              </p>
            </div>
          </div>

          <Link
            href="/pricing"
            className="block text-center text-gray-500 text-xs mt-4 hover:text-[#C9A84C] transition-colors"
          >
            חזרה לדף התמחור
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white" dir="rtl">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">
            השלמת <span className="gold-shimmer">ההרשמה</span>
          </h1>
          <p className="text-gray-400">צעד אחד ואתם בפנים</p>
        </div>
        <Suspense fallback={<div className="text-center text-gray-500">טוען...</div>}>
          <CheckoutForm />
        </Suspense>
      </main>
    </div>
  );
}
