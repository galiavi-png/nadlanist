"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ALL_AGENTS } from "@/app/lib/agents";
import type { DealType, PropertyType, Agent } from "@/app/lib/agents";

type SortKey = "rating" | "reviews" | "experience";

const CITIES = ["הכל", "תל אביב", "ירושלים", "הרצליה", "רמת גן", "חיפה", "נתניה", "באר שבע", "רעננה"];
const DEAL_TYPES: { value: DealType | "all"; label: string }[] = [
  { value: "all", label: "הכל" },
  { value: "sale", label: "מכירה" },
  { value: "buy", label: "קנייה" },
  { value: "rent", label: "השכרה" },
  { value: "commercial", label: "השכרת נכס מסחרי" },
];
const PROPERTY_TYPES: (PropertyType | "הכל")[] = [
  "הכל", "דירה", "בית פרטי", "פנטהאוס", "דירת גן", "נחלה", "קרקע", "מחסן", "מפעל", "משרד", "חנות",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`w-4 h-4 ${star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function AgentCard({ agent }: { agent: Agent }) {
  const dealLabels: Record<DealType, string> = { sale: "מכירה", buy: "קנייה", rent: "השכרה", commercial: "השכרת נכס מסחרי" };

  return (
    <div className="group rounded-2xl border border-[#2A2A2A] bg-[#161616] p-5 flex gap-5 hover:border-[#C9A84C]/30 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(201,168,76,0.08)]">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}>
          <span className="text-black font-bold text-2xl">{agent.initials}</span>
        </div>
        {agent.verified && (
          <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-[#C9A84C]">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            מאומת
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-1">
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight">{agent.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-gray-400 text-sm">{agent.area}</span>
            </div>
          </div>
          <span className="flex-shrink-0 text-xs px-2.5 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20">
            {agent.specialty}
          </span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mt-2 mb-3 line-clamp-2">{agent.bio}</p>

        <div className="flex gap-1.5 mb-3">
          {agent.dealTypes.map((dt) => (
            <span key={dt} className="text-[11px] px-2 py-0.5 rounded bg-[#2A2A2A] text-gray-400">
              {dealLabels[dt]}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5">
            <StarRating rating={agent.rating} />
            <span className="text-white font-bold text-sm">{agent.rating}</span>
            <span className="text-gray-500 text-xs">({agent.reviews})</span>
          </div>
          <div className="h-3 w-px bg-[#2A2A2A]" />
          <span className="text-gray-500 text-xs">{agent.deals} עסקאות</span>
          <div className="h-3 w-px bg-[#2A2A2A]" />
          <span className="text-gray-500 text-xs">{agent.experience} שנות ניסיון</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex flex-col justify-between items-end gap-3">
        <div className="text-left">
          <div className="text-[11px] text-gray-600">מחיר התחלתי</div>
          <div className="text-[#C9A84C] font-semibold text-sm">
            ₪{(agent.priceMin / 1000000).toFixed(1)}M+
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link
            href={`/agents/${agent.id}`}
            className="px-4 py-2 rounded-lg bg-[#C9A84C] hover:bg-[#E8C96A] text-black text-sm font-semibold transition-colors whitespace-nowrap text-center"
          >
            צרו קשר
          </Link>
          <Link
            href={`/agents/${agent.id}`}
            className="px-4 py-2 rounded-lg border border-[#2A2A2A] hover:border-[#C9A84C]/40 text-gray-400 hover:text-[#C9A84C] text-sm transition-colors whitespace-nowrap text-center"
          >
            פרופיל מלא
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("הכל");
  const [selectedDeal, setSelectedDeal] = useState<DealType | "all">("all");
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | "הכל">("הכל");
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return ALL_AGENTS
      .filter((a) => {
        if (searchQuery && !a.name.includes(searchQuery) && !a.area.includes(searchQuery) && !a.specialty.includes(searchQuery)) return false;
        if (selectedCity !== "הכל" && a.city !== selectedCity) return false;
        if (selectedDeal !== "all" && !a.dealTypes.includes(selectedDeal)) return false;
        if (selectedPropertyType !== "הכל" && !a.propertyTypes.includes(selectedPropertyType)) return false;
        if (a.rating < minRating) return false;
        if (a.priceMin < minPrice) return false;
        if (verifiedOnly && !a.verified) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "reviews") return b.reviews - a.reviews;
        return b.experience - a.experience;
      });
  }, [searchQuery, selectedCity, selectedDeal, selectedPropertyType, minRating, minPrice, sortBy, verifiedOnly]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCity("הכל");
    setSelectedDeal("all");
    setSelectedPropertyType("הכל");
    setMinRating(0);
    setMinPrice(0);
    setVerifiedOnly(false);
  };

  const hasActiveFilters = selectedCity !== "הכל" || selectedDeal !== "all" || selectedPropertyType !== "הכל" || minRating > 0 || minPrice > 0 || verifiedOnly;

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0D]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#2A2A2A] bg-[#0D0D0D]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center">
              <span className="text-black font-bold text-sm">נ</span>
            </div>
            <span className="text-xl font-bold tracking-wide gold-shimmer">נדלניסט</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {[
              { label: "מצא מתווך", href: "/agents" },
              { label: "על הפלטפורמה", href: "/about" },
              { label: "בלוג", href: "/blog" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors duration-200 ${
                  item.href === "/agents" ? "text-[#C9A84C]" : "text-gray-400 hover:text-[#C9A84C]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors">כניסה</Link>
            <Link href="/register" className="text-sm px-4 py-2 rounded border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-200 font-medium">
              הצטרפו כמתווכ/ת
            </Link>
          </div>
        </div>
      </header>

      {/* Page title bar */}
      <div className="border-b border-[#2A2A2A] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-[#C9A84C] text-xs uppercase tracking-widest font-medium mb-1">הפלטפורמה</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white">מתווכי נדל&quot;ן</h1>
            <p className="text-gray-500 text-sm mt-1">
              {filtered.length} מתווכים נמצאו{hasActiveFilters && " לפי הפילטרים שלכם"}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-gray-500 text-sm">מיון לפי:</span>
            <div className="flex rounded-lg border border-[#2A2A2A] overflow-hidden">
              {([
                { key: "rating", label: "דירוג" },
                { key: "reviews", label: "ביקורות" },
                { key: "experience", label: "ניסיון" },
              ] as { key: SortKey; label: string }[]).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-4 py-2 text-sm transition-colors ${
                    sortBy === key ? "bg-[#C9A84C] text-black font-semibold" : "bg-[#161616] text-gray-400 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 flex-shrink-0 gap-5">
          <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
            <h2 className="text-white font-semibold text-sm mb-3">חיפוש</h2>
            <div className="relative">
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="שם, אזור, התמחות..."
                className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg pr-9 pl-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-[#C9A84C]/50 transition-colors"
              />
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
            <h2 className="text-white font-semibold text-sm mb-3">עיר</h2>
            <div className="flex flex-col gap-1.5">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCity === city
                      ? "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30"
                      : "text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
            <h2 className="text-white font-semibold text-sm mb-3">סוג נכס</h2>
            <div className="flex flex-col gap-1.5">
              {PROPERTY_TYPES.map((pt) => (
                <button
                  key={pt}
                  onClick={() => setSelectedPropertyType(pt as PropertyType | "הכל")}
                  className={`text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedPropertyType === pt
                      ? "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30"
                      : "text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
            <h2 className="text-white font-semibold text-sm mb-3">סוג עסקה</h2>
            <div className="flex flex-col gap-1.5">
              {DEAL_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSelectedDeal(value)}
                  className={`text-right px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedDeal === value
                      ? "bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/30"
                      : "text-gray-400 hover:bg-[#2A2A2A] hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold text-sm">דירוג מינימלי</h2>
              <span className="text-[#C9A84C] text-sm font-medium">{minRating > 0 ? `${minRating}+` : "הכל"}</span>
            </div>
            <div className="flex gap-1.5">
              {[0, 4, 4.5, 4.8].map((val) => (
                <button
                  key={val}
                  onClick={() => setMinRating(val)}
                  className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${
                    minRating === val ? "bg-[#C9A84C] text-black" : "bg-[#2A2A2A] text-gray-400 hover:text-white"
                  }`}
                >
                  {val === 0 ? "הכל" : `${val}★`}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold text-sm">מחיר התחלתי</h2>
              <span className="text-[#C9A84C] text-sm font-medium">
                {minPrice === 0 ? "הכל" : `₪${(minPrice / 1000000).toFixed(1)}M+`}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={3000000}
              step={500000}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full accent-[#C9A84C] cursor-pointer"
            />
            <div className="flex justify-between text-gray-600 text-[11px] mt-1">
              <span>הכל</span>
              <span>₪3M+</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
            <button onClick={() => setVerifiedOnly(!verifiedOnly)} className="flex items-center gap-3 w-full">
              <div className={`w-10 h-5 rounded-full transition-colors relative ${verifiedOnly ? "bg-[#C9A84C]" : "bg-[#2A2A2A]"}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${verifiedOnly ? "right-0.5" : "left-0.5"}`} />
              </div>
              <span className="text-sm text-gray-300">מתווכים מאומתים בלבד</span>
            </button>
          </div>

          {hasActiveFilters && (
            <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-[#C9A84C] transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              נקה פילטרים
            </button>
          )}
        </aside>

        {/* Mobile sort bar */}
        <div className="md:hidden w-full">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#2A2A2A] text-gray-400 text-sm whitespace-nowrap hover:border-[#C9A84C]/40"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              פילטרים
              {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />}
            </button>
            {(["rating", "reviews", "experience"] as SortKey[]).map((key) => {
              const labels = { rating: "דירוג", reviews: "ביקורות", experience: "ניסיון" };
              return (
                <button
                  key={key}
                  onClick={() => setSortBy(key)}
                  className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap border transition-colors ${
                    sortBy === key ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]" : "border-[#2A2A2A] text-gray-400"
                  }`}
                >
                  {labels[key]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Agents list */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#161616] border border-[#2A2A2A] flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-2">לא נמצאו מתווכים</h3>
              <p className="text-gray-500 text-sm mb-4">נסו לשנות את הפילטרים</p>
              <button onClick={resetFilters} className="text-[#C9A84C] text-sm hover:underline">נקה פילטרים</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] py-8 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center">
              <span className="text-black font-bold text-[10px]">נ</span>
            </div>
            <span className="text-sm font-bold gold-shimmer">נדלניסט</span>
          </div>
          <p className="text-gray-600 text-xs">© 2026 נדלניסט. כל הזכויות שמורות.</p>
          <div className="flex gap-5 text-xs text-gray-600">
            {["תנאי שימוש", "פרטיות", "צרו קשר"].map((l) => (
              <a key={l} href="#" className="hover:text-[#C9A84C] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
