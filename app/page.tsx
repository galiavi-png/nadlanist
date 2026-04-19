"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import { useAuth } from "@/app/context/AuthContext";

const agents = [
  {
    name: "יעל כהן",
    area: "תל אביב והמרכז",
    rating: 4.9,
    reviews: 127,
    deals: 84,
    specialty: "דירות יוקרה",
    initials: "יכ",
    color: "from-amber-600 to-yellow-500",
  },
  {
    name: "דוד לוי",
    area: "הרצליה פיתוח",
    rating: 4.8,
    reviews: 98,
    deals: 61,
    specialty: "נכסי פרימיום",
    initials: "דל",
    color: "from-yellow-700 to-amber-500",
  },
  {
    name: "מיכל אברהם",
    area: "ירושלים",
    rating: 5.0,
    reviews: 74,
    deals: 52,
    specialty: "נכסים היסטוריים",
    initials: "מא",
    color: "from-amber-800 to-yellow-600",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= Math.floor(rating)
              ? "text-yellow-400"
              : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function WelcomeHandler({ onShow }: { onShow: () => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("welcome") === "true") {
      onShow();
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams, onShow]);

  return null;
}

export default function Home() {
  const [searchCity, setSearchCity] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (showWelcome) {
      const t = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showWelcome]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D]">
      <Suspense fallback={null}>
        <WelcomeHandler onShow={() => setShowWelcome(true)} />
      </Suspense>
      <Header />

      {/* Welcome banner */}
      {showWelcome && user && (
        <div className="bg-gradient-to-r from-[#1A1500] to-[#161200] border-b border-[#C9A84C]/30">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-yellow-500 flex items-center justify-center flex-shrink-0">
                <span className="text-black font-bold text-sm">{user.name.charAt(0)}</span>
              </div>
              <div>
                <span className="text-[#C9A84C] font-semibold">ברוכים הבאים, {user.name.split(" ")[0]}! </span>
                <span className="text-gray-300 text-sm">
                  {user.role === "agent"
                    ? "הפרופיל שלך כמתווך נוצר בהצלחה. התחילו להגדיר את הנכסים שלכם."
                    : "החשבון שלך נוצר בהצלחה. כעת תוכלו למצוא מתווכים מובילים."}
                </span>
              </div>
            </div>
            <button onClick={() => setShowWelcome(false)} className="text-gray-500 hover:text-gray-300 flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-28 md:py-40">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C]/3 rounded-full blur-2xl" />
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-16 right-16 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
            <div className="absolute bottom-16 left-16 w-px h-32 bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
            <div className="absolute top-16 right-16 w-32 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
          </div>

          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/5 text-[#C9A84C] text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
              הפלטפורמה המובילה למתווכי נדל&quot;ן בישראל
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
              מצאו את{" "}
              <span className="gold-shimmer">המתווך המושלם</span>
              <br />
              עבורכם
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              גישה למיטב מתווכי הנדל&quot;ן בישראל. השוואה, דירוגים, וחיבור ישיר —
              הכל במקום אחד.
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="flex items-center rounded-xl border border-[#2A2A2A] bg-[#161616] overflow-hidden focus-within:border-[#C9A84C]/60 transition-colors duration-300 shadow-2xl">
                <div className="flex-shrink-0 pr-4 pl-3">
                  <svg
                    className="w-5 h-5 text-[#C9A84C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  placeholder="חפשו לפי עיר, שכונה או אזור..."
                  className="search-input flex-1 bg-transparent py-4 text-white text-base outline-none"
                />
                <button className="m-2 px-6 py-2.5 bg-[#C9A84C] hover:bg-[#E8C96A] text-black font-semibold rounded-lg transition-colors duration-200 text-sm whitespace-nowrap">
                  חיפוש
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
                {["תל אביב", "ירושלים", "הרצליה", "רמת גן"].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSearchCity(city)}
                    className="hover:text-[#C9A84C] transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center gap-10 mt-16">
              {[
                { value: "1,200+", label: "מתווכים מוסמכים" },
                { value: "98%", label: "שביעות רצון" },
                { value: "15K+", label: "עסקאות הושלמו" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-[#C9A84C]">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
        </div>

        {/* Agents Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#C9A84C] text-sm font-medium uppercase tracking-widest mb-3">
                מתווכים מובילים
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                המקצוענים שישנו את חוויית הנדל&quot;ן שלכם
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                סלקנו עבורכם את מיטב המתווכים — בעלי ניסיון, ביקורות מצוינות ורקורד מוכח.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className="card-hover rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 flex flex-col"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <span className="text-black font-bold text-xl">{agent.initials}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#C9A84C] flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        <span className="text-gray-400 text-sm truncate">{agent.area}</span>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20 whitespace-nowrap">
                      {agent.specialty}
                    </span>
                  </div>

                  <div className="h-px bg-[#2A2A2A] mb-5" />

                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <StarRating rating={agent.rating} />
                      <span className="text-white font-bold text-sm">{agent.rating}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{agent.reviews} ביקורות</span>
                  </div>

                  <div className="flex gap-4 mb-6">
                    <div className="flex-1 rounded-lg bg-[#0D0D0D] border border-[#2A2A2A] p-3 text-center">
                      <div className="text-[#C9A84C] font-bold text-lg">{agent.deals}</div>
                      <div className="text-gray-500 text-xs mt-0.5">עסקאות</div>
                    </div>
                    <div className="flex-1 rounded-lg bg-[#0D0D0D] border border-[#2A2A2A] p-3 text-center">
                      <div className="text-[#C9A84C] font-bold text-lg">{agent.rating * 10}%</div>
                      <div className="text-gray-500 text-xs mt-0.5">המלצות</div>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-3">
                    <button className="flex-1 py-2.5 rounded-lg border border-[#C9A84C] text-[#C9A84C] text-sm font-medium hover:bg-[#C9A84C]/10 transition-colors">
                      פרופיל מלא
                    </button>
                    <button className="flex-1 py-2.5 rounded-lg bg-[#C9A84C] text-black text-sm font-semibold hover:bg-[#E8C96A] transition-colors">
                      צרו קשר
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[#C9A84C] text-sm font-medium hover:gap-3 transition-all"
              >
                לכל המתווכים
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto rounded-2xl border border-[#C9A84C]/20 bg-gradient-to-br from-[#1A1500] to-[#161616] p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent" />
            </div>
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest mb-3 font-medium">למתווכים</p>
            <h2 className="text-3xl font-bold mb-4">הצטרפו לפלטפורמה ובנו את העסק שלכם</h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              קבלו חשיפה לאלפי לקוחות פוטנציאליים, נהלו את הלידים שלכם ובנו מוניטין דיגיטלי חזק.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#C9A84C] text-black font-semibold hover:bg-[#E8C96A] transition-colors text-sm"
            >
              התחילו בחינם
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center">
                  <span className="text-black font-bold text-xs">נ</span>
                </div>
                <span className="text-lg font-bold gold-shimmer">נדלניסט</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                הפלטפורמה המובילה לחיבור בין לקוחות נדל&quot;ן למתווכים מקצועיים בישראל.
              </p>
            </div>

            {[
              {
                title: "פלטפורמה",
                links: [
                  { label: "מתווכים", href: "/agents" },
                  { label: "תמחור", href: "/pricing" },
                  { label: "אודות", href: "/about" },
                  { label: "הצטרפו כמתווך", href: "/pricing" },
                ],
              },
              {
                title: "חברה",
                links: [
                  { label: "אודות נדלניסט", href: "/about" },
                  { label: "תמחור מסלולים", href: "/pricing" },
                  { label: "הרשמה", href: "/register" },
                  { label: "כניסה", href: "/login" },
                ],
              },
              {
                title: "משפטי ותמיכה",
                links: [
                  { label: "תנאי שימוש", href: "/terms" },
                  { label: "מדיניות פרטיות", href: "/privacy" },
                  { label: "מדיניות ביטול", href: "/cancellation" },
                  { label: "צרו קשר", href: "mailto:support@nadlanist.co.il" },
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-gray-500 text-sm hover:text-[#C9A84C] transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#2A2A2A] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">© 2026 נדלניסט. כל הזכויות שמורות.</p>
            <div className="flex items-center gap-1 text-gray-600 text-xs">
              <span>עוצב ופותח בישראל 🇮🇱</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
