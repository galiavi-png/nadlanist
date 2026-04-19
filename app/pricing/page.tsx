"use client";

import Link from "next/link";
import Header from "@/app/components/Header";

const plans = [
  {
    id: "basic",
    name: "בסיסי",
    price: 99,
    description: "מתאים למתווכים בתחילת דרכם",
    color: "#6B7280",
    features: [
      "עד 5 מודעות פעילות",
      "פרופיל מתווך בסיסי",
      "הופעה בתוצאות חיפוש",
      "צ'אט עם לקוחות",
      "דוחות בסיסיים",
      "תמיכה במייל",
    ],
    notIncluded: [
      "תג 'מאומת' זהב",
      "הקדמה בתוצאות חיפוש",
      "ניתוח ביצועים מתקדם",
      "תמיכה טלפונית",
    ],
  },
  {
    id: "professional",
    name: "מקצועי",
    price: 199,
    description: "הבחירה הפופולרית למתווכים פעילים",
    color: "#C9A84C",
    recommended: true,
    features: [
      "עד 20 מודעות פעילות",
      "פרופיל מתווך מורחב עם סרטון",
      "תג 'מאומת' זהב",
      "הקדמה בתוצאות חיפוש",
      "צ'אט ושיחות וידאו עם לקוחות",
      "ניתוח ביצועים מתקדם",
      "דוחות חודשיים מפורטים",
      "תמיכה טלפונית בימי חול",
    ],
    notIncluded: [
      "מודעות פרימיום בדף הבית",
      "מנהל חשבון אישי",
    ],
  },
  {
    id: "premium",
    name: "פרימיום",
    price: 349,
    description: "למתווכים שרוצים להיות בראש",
    color: "#E8C96A",
    features: [
      "מודעות ללא הגבלה",
      "פרופיל מתווך פרימיום מלא",
      "תג 'מתווך מוביל' בלעדי",
      "מיקום ראשון בתוצאות חיפוש",
      "מודעות מוצגות בדף הבית",
      "צ'אט, שיחות וידאו ומפגשים וירטואליים",
      "ניתוח ביצועים מתקדם + AI",
      "דוחות שבועיים אוטומטיים",
      "מנהל חשבון אישי",
      "תמיכה 24/7 בעדיפות גבוהה",
      "גישה לכלי שיווק בלעדיים",
    ],
    notIncluded: [],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white" dir="rtl">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#161616] border border-[#2A2A2A] rounded-full px-4 py-1.5 text-xs text-[#C9A84C] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            תמחור שקוף ופשוט
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            בחרו את המסלול{" "}
            <span className="gold-shimmer">המתאים לכם</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            השקיעו בקריירה שלכם. כל המסלולים כוללים 14 יום ניסיון חינם ללא
            התחייבות.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 hover:shadow-2xl ${
                plan.recommended
                  ? "border-[#C9A84C] bg-[#161616] shadow-[0_0_40px_rgba(201,168,76,0.15)]"
                  : "border-[#2A2A2A] bg-[#111111] hover:border-[#3A3A3A]"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 right-1/2 translate-x-1/2 bg-[#C9A84C] text-black text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  הכי פופולרי
                </div>
              )}

              <div className="mb-8">
                <h2
                  className="text-xl font-bold mb-1"
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </h2>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-[#C9A84C] text-lg mb-1">₪</span>
                  <span className="text-gray-500 text-sm mb-1.5">/חודש</span>
                </div>
                <p className="text-gray-600 text-xs mt-1">
                  + מע&quot;מ. חיוב חודשי. ביטול בכל עת.
                </p>
              </div>

              <div className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: plan.color }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 opacity-40">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href={`/checkout?plan=${plan.id}&price=${plan.price}`}
                className={`w-full text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.recommended
                    ? "bg-[#C9A84C] text-black hover:bg-[#E8C96A] shadow-lg shadow-amber-900/30"
                    : "bg-[#1E1E1E] text-white border border-[#3A3A3A] hover:border-[#C9A84C] hover:text-[#C9A84C]"
                }`}
              >
                התחילו 14 יום חינם
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            שאלות נפוצות
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "האם יש התחייבות לטווח ארוך?",
                a: "לא. כל המסלולים הם חיוב חודשי ולא קיימת כל התחייבות מינימלית. תוכלו לבטל בכל עת.",
              },
              {
                q: "מה קורה בתום 14 ימי הניסיון?",
                a: "לאחר 14 ימי הניסיון יחל החיוב החודשי אוטומטית. תקבלו תזכורת 3 ימים לפני סיום הניסיון.",
              },
              {
                q: "האם ניתן לשנות מסלול בכל עת?",
                a: "כן. תוכלו לשדרג או להוריד מסלול בכל עת מאזור ניהול החשבון שלכם.",
              },
              {
                q: "האם יש הנחה לתשלום שנתי?",
                a: "כן! בתשלום שנתי תקבלו 2 חודשים חינם (חיסכון של כ-17%). צרו קשר לפרטים.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-6"
              >
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] py-8 px-6 mt-20 text-center">
        <p className="text-gray-600 text-sm">
          יש שאלות?{" "}
          <a href="mailto:support@nadlanist.co.il" className="text-[#C9A84C] hover:underline">
            צרו קשר
          </a>{" "}
          | ©&nbsp;2026 נדלניסט
        </p>
      </footer>
    </div>
  );
}
