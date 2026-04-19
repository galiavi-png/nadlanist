"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAgentById } from "@/app/lib/agents";
import type { Property } from "@/app/lib/agents";
import ReviewsTab from "./ReviewsTab";

type Tab = "about" | "properties" | "reviews";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sz = size === "lg" ? "w-6 h-6" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} className={`${sz} ${star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-700"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}


function PropertyCard({ property }: { property: Property }) {
  const statusLabel: Record<string, { text: string; cls: string }> = {
    active: { text: "פעיל", cls: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    sold: { text: "נמכר", cls: "text-gray-400 bg-gray-400/10 border-gray-400/20" },
    pending: { text: "בהמתנה", cls: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  };
  const s = statusLabel[property.status];
  const isRent = property.price < 50000;
  const priceStr = isRent
    ? `₪${property.price.toLocaleString()}/חודש`
    : `₪${(property.price / 1000000).toFixed(1)}M`;

  return (
    <div className="rounded-xl border border-[#2A2A2A] bg-[#161616] overflow-hidden group hover:border-[#C9A84C]/30 transition-all duration-300">
      {/* Image placeholder */}
      <div className={`h-40 bg-gradient-to-br ${property.gradient} relative flex items-end p-4`}>
        <span className={`text-xs px-2 py-0.5 rounded-full border ${s.cls} backdrop-blur-sm`}>
          {s.text}
        </span>
        {property.status === "active" && (
          <div className="absolute top-3 left-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h4 className="text-white font-medium text-sm leading-snug mb-1">{property.title}</h4>
        <div className="flex items-center gap-1.5 mb-3">
          <svg className="w-3 h-3 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span className="text-gray-500 text-xs">{property.city} · {property.type}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#C9A84C] font-bold text-sm">{priceStr}</span>
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            {property.rooms > 0 && <span>{property.rooms} חד'</span>}
            <span>{property.sqm} מ&quot;ר</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm({ agentName }: { agentName: string }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-14 h-14 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-semibold mb-1">ההודעה נשלחה!</p>
        <p className="text-gray-400 text-sm">{agentName} יחזור אליכם בהקדם</p>
        <button onClick={() => setSent(false)} className="mt-4 text-xs text-gray-500 hover:text-[#C9A84C] transition-colors">
          שלחו הודעה נוספת
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-gray-400 text-xs mb-1.5">שם מלא</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="ישראל ישראלי"
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#C9A84C]/50 transition-colors"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-xs mb-1.5">טלפון</label>
        <input
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="050-000-0000"
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#C9A84C]/50 transition-colors"
          dir="ltr"
        />
      </div>
      <div>
        <label className="block text-gray-400 text-xs mb-1.5">הודעה</label>
        <textarea
          required
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder={`שלום ${agentName}, אשמח לקבל מידע נוסף...`}
          rows={4}
          className="w-full bg-[#0D0D0D] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-[#C9A84C]/50 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-lg bg-[#C9A84C] hover:bg-[#E8C96A] disabled:opacity-70 text-black font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            שולח...
          </>
        ) : (
          <>
            שלחו הודעה
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </>
        )}
      </button>
      <p className="text-center text-gray-600 text-xs">פרטיכם מאובטחים ולא יועברו לצד שלישי</p>
    </form>
  );
}

export default function AgentProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const agent = getAgentById(Number(id));

  const [activeTab, setActiveTab] = useState<Tab>("about");

  if (!agent) {
    notFound();
  }

  const dealLabel: Record<string, string> = { sale: "מכירה", buy: "קנייה", rent: "השכרה", commercial: "השכרת נכס מסחרי" };

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "about", label: "אודות" },
    { key: "properties", label: "נכסים", count: agent.properties.length },
    { key: "reviews", label: "ביקורות" },
  ];

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
              <Link key={item.label} href={item.href} className="text-gray-400 hover:text-[#C9A84C] transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden md:block text-sm text-gray-400 hover:text-white transition-colors">כניסה</a>
            <a href="#" className="text-sm px-4 py-2 rounded border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-black transition-all duration-200 font-medium">
              הצטרפו כמתווכ/ת
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-[#2A2A2A] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#C9A84C] transition-colors">בית</Link>
          <span>/</span>
          <Link href="/agents" className="hover:text-[#C9A84C] transition-colors">מתווכים</Link>
          <span>/</span>
          <span className="text-gray-300">{agent.name}</span>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-[#2A2A2A]">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9A84C]/4 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-16">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className={`w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-2xl shadow-amber-900/20`}>
                  <span className="text-black font-bold text-5xl md:text-6xl">{agent.initials}</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{agent.name}</h1>
                  {agent.verified && (
                    <div className="flex items-center gap-1 text-[#C9A84C] text-sm bg-[#C9A84C]/10 border border-[#C9A84C]/25 rounded-full px-3 py-0.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      מאומת
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="text-gray-300 text-sm">{agent.area}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {agent.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Property types */}
                <div className="mb-2">
                  <span className="text-gray-500 text-xs ml-2">סוגי נכסים:</span>
                  <div className="inline-flex flex-wrap gap-1.5">
                    {agent.propertyTypes.map((pt) => (
                      <span key={pt} className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deal types */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  <span className="text-gray-500 text-xs ml-2">סוגי עסקאות:</span>
                  {agent.dealTypes.map((dt) => (
                    <span key={dt} className="text-xs px-2.5 py-0.5 rounded-full bg-[#2A2A2A] text-gray-400">
                      {dealLabel[dt]}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <StarRating rating={agent.rating} size="md" />
                  <span className="text-white font-bold text-xl">{agent.rating}</span>
                  <span className="text-gray-500 text-sm">({agent.reviews} ביקורות)</span>
                </div>
              </div>

              {/* Quick contact — desktop */}
              <div className="hidden lg:flex flex-col gap-3 flex-shrink-0">
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2A2A2A] bg-[#161616] text-gray-300 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {agent.phone}
                </a>
                <a
                  href={`mailto:${agent.email}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2A2A2A] bg-[#161616] text-gray-300 hover:border-[#C9A84C]/40 hover:text-[#C9A84C] transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {agent.email}
                </a>
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {[
                { value: agent.deals, label: "עסקאות מוצלחות", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
                { value: `${agent.experience}`, label: "שנות ניסיון", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                { value: `${agent.successRate}%`, label: "אחוז הצלחה", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
                { value: agent.reviews, label: "ביקורות מאומתות", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#C9A84C]">{stat.value}</div>
                    <div className="text-gray-500 text-xs">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
          {/* Left column — tabs */}
          <div className="flex-1 min-w-0">
            {/* Tab bar */}
            <div className="flex border-b border-[#2A2A2A] mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all duration-200 ${
                    activeTab === tab.key
                      ? "border-[#C9A84C] text-[#C9A84C]"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      activeTab === tab.key ? "bg-[#C9A84C]/15 text-[#C9A84C]" : "bg-[#2A2A2A] text-gray-500"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* About tab */}
            {activeTab === "about" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-white font-semibold text-lg mb-4">אודות {agent.name}</h2>
                  <div className="text-gray-400 text-sm leading-relaxed space-y-4">
                    {agent.longBio.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "עיר פעילות", value: agent.city },
                    { label: "אזור", value: agent.area },
                    { label: "התמחות", value: agent.specialty },
                    { label: "טלפון", value: agent.phone, dir: "ltr" as const },
                    { label: "אימייל", value: agent.email, dir: "ltr" as const },
                    { label: "שנות ניסיון", value: `${agent.experience} שנים` },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-[#2A2A2A] bg-[#161616] p-4">
                      <div className="text-gray-500 text-xs mb-1">{item.label}</div>
                      <div className="text-white text-sm font-medium" dir={item.dir}>{item.value}</div>
                    </div>
                  ))}
                </div>

                {/* Property types */}
                <div>
                  <h3 className="text-white font-semibold text-sm mb-3">סוגי נכסים</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.propertyTypes.map((pt) => (
                      <div key={pt} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-blue-500/20 bg-blue-500/5">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-blue-300 text-sm">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deal types */}
                <div>
                  <h3 className="text-white font-semibold text-sm mb-3">סוגי עסקאות</h3>
                  <div className="flex flex-wrap gap-2">
                    {agent.dealTypes.map((dt) => (
                      <div key={dt} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#C9A84C]/20 bg-[#C9A84C]/5">
                        <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                        <span className="text-[#C9A84C] text-sm">{dealLabel[dt]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Properties tab */}
            {activeTab === "properties" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white font-semibold text-lg">
                    נכסים ({agent.properties.length})
                  </h2>
                  <div className="flex gap-2 text-xs">
                    {["active", "sold", "pending"].map((s) => {
                      const cnt = agent.properties.filter((p) => p.status === s).length;
                      if (!cnt) return null;
                      const labels: Record<string, string> = { active: "פעיל", sold: "נמכר", pending: "בהמתנה" };
                      return (
                        <span key={s} className="text-gray-500">
                          {cnt} {labels[s]}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agent.properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === "reviews" && (
              <ReviewsTab agentId={agent.id} agentName={agent.name} />
            )}
          </div>

          {/* Right column — contact form (sticky) */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl border border-[#2A2A2A] bg-[#161616] overflow-hidden">
              {/* Form header */}
              <div className="bg-gradient-to-r from-[#1A1500] to-[#161616] border-b border-[#2A2A2A] p-5">
                <div className="flex items-center gap-3 mb-1">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                    <span className="text-black font-bold text-base">{agent.initials}</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{agent.name}</div>
                    <div className="flex items-center gap-1">
                      <StarRating rating={agent.rating} />
                      <span className="text-gray-400 text-xs">{agent.rating}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  בדרך כלל מגיב תוך שעה אחת
                </p>
              </div>

              <div className="p-5">
                <ContactForm agentName={agent.name} />
              </div>

              {/* Direct contact */}
              <div className="border-t border-[#2A2A2A] p-4 flex flex-col gap-2">
                <p className="text-center text-gray-500 text-xs mb-1">או פנו ישירות</p>
                <a
                  href={`tel:${agent.phone}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#2A2A2A] hover:border-[#C9A84C]/30 text-gray-300 hover:text-[#C9A84C] transition-all text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {agent.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] py-8 px-6">
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
