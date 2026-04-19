"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import type { UserRole } from "@/app/lib/supabase/types";

const AREAS = [
  "תל אביב והמרכז",
  "ירושלים",
  "הרצליה פיתוח",
  "גוש דן",
  "חיפה והכרמל",
  "נתניה והשרון",
  "באר שבע והנגב",
  "השרון הצפוני",
  "ראשון לציון",
  "פתח תקווה",
];

const SPECIALTIES = [
  "דירות יוקרה",
  "נכסי פרימיום",
  "נכסים היסטוריים",
  "דירות להשכרה",
  "נדל\"ן מסחרי",
  "בתים פרטיים",
  "נכסים בוטיק",
  "השקעות נדל\"ן",
  "וילות ופנטהאוזים",
];

type Step = 1 | 2 | 3;

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "חלשה", "בינונית", "חזקה", "מצוינת"];
  const colors = ["", "bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-emerald-500"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= score ? colors[score] : "bg-[#2A2A2A]"}`} />
        ))}
      </div>
      <p className="text-xs text-gray-500">
        עוצמת סיסמה: <span className={score >= 3 ? "text-emerald-400" : score === 2 ? "text-amber-400" : "text-red-400"}>{labels[score]}</span>
      </p>
    </div>
  );
}

const supabase = createClient();

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [checkEmail, setCheckEmail] = useState(false); // show "check your email" screen

  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [specialty, setSpecialty] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  function validateStep2() {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().split(" ").length < 2) errs.name = "הזינו שם פרטי ושם משפחה";
    if (!email.includes("@")) errs.email = "כתובת אימייל לא תקינה";
    if (!/^0[0-9]{8,9}$/.test(phone.replace(/-/g, ""))) errs.phone = "מספר טלפון לא תקין";
    if (password.length < 8) errs.password = "הסיסמה חייבת להכיל לפחות 8 תווים";
    return errs;
  }

  function validateStep3() {
    const errs: Record<string, string> = {};
    if (role === "agent") {
      if (selectedAreas.length === 0) errs.areas = "בחרו לפחות אזור פעילות אחד";
      if (!specialty) errs.specialty = "בחרו התמחות";
    }
    if (!agreeTerms) errs.terms = "יש לאשר את תנאי השימוש";
    return errs;
  }

  function handleNextFromStep1(r: UserRole) {
    setRole(r);
    setStep(2);
  }

  function handleNextFromStep2(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep2();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(3);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep3();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setServerError("");
    setLoading(true);

    // signUp — all profile fields go into options.data so the DB trigger can use them.
    // The trigger (handle_new_user) runs on INSERT to auth.users and creates the profile row,
    // so we never need to insert manually (avoids RLS issues when email isn't confirmed yet).
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          name: name.trim(),
          role: role!,
          phone: phone || "",
          areas: role === "agent" ? JSON.stringify(selectedAreas) : "",
          specialty: role === "agent" ? specialty : "",
        },
      },
    });

    if (signUpError) {
      const msg = signUpError.message.includes("already registered")
        ? "כתובת האימייל כבר רשומה במערכת"
        : signUpError.message;
      setServerError(msg);
      setLoading(false);
      return;
    }

    // If session exists → email confirmation is disabled, user is logged in immediately
    if (data.session) {
      router.push("/?welcome=true");
      router.refresh();
      return;
    }

    // Otherwise → email confirmation required
    setLoading(false);
    setCheckEmail(true);
  }

  function toggleArea(area: string) {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
    setErrors((e) => ({ ...e, areas: "" }));
  }

  const stepTitles: Record<Step, string> = {
    1: "בחרו את סוג החשבון",
    2: "פרטים אישיים",
    3: role === "agent" ? "פרטי מתווך" : "סיום הרשמה",
  };

  // ── "Check your email" screen ──
  if (checkEmail) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A84C]/4 rounded-full blur-3xl" />
        </div>
        <div className="relative w-full max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">בדקו את תיבת הדואר</h1>
          <p className="text-gray-400 mb-2">
            שלחנו קישור אימות לכתובת
          </p>
          <p className="text-[#C9A84C] font-medium mb-6">{email}</p>
          <p className="text-gray-500 text-sm mb-8">
            לחצו על הקישור באימייל כדי להשלים את ההרשמה ולהתחבר לחשבון.
            <br />
            לא קיבלתם? בדקו את תיקיית הספאם.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={async () => {
                await supabase.auth.resend({ type: "signup", email });
              }}
              className="text-sm text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
            >
              שלחו שוב
            </button>
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-300 transition-colors">
              חזרה לדף הכניסה
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col">
      {/* Header */}
      <header className="border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-yellow-500 to-amber-700 flex items-center justify-center">
              <span className="text-black font-bold text-sm">נ</span>
            </div>
            <span className="text-xl font-bold tracking-wide gold-shimmer">נדלניסט</span>
          </Link>
          <Link href="/login" className="text-sm text-gray-400 hover:text-[#C9A84C] transition-colors">
            כבר יש לכם חשבון? <span className="text-[#C9A84C]">כניסה</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {/* Background glow */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-[#C9A84C]/3 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                {([1, 2, 3] as Step[]).map((s, i) => (
                  <div key={s} className="flex items-center flex-1">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      step > s
                        ? "bg-[#C9A84C] text-black"
                        : step === s
                        ? "bg-[#C9A84C]/20 border-2 border-[#C9A84C] text-[#C9A84C]"
                        : "bg-[#2A2A2A] text-gray-600"
                    }`}>
                      {step > s ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : s}
                    </div>
                    {i < 2 && (
                      <div className={`flex-1 h-px mx-2 transition-all ${step > s ? "bg-[#C9A84C]" : "bg-[#2A2A2A]"}`} />
                    )}
                  </div>
                ))}
              </div>
              <h1 className="text-2xl font-bold text-white">{stepTitles[step]}</h1>
              <p className="text-gray-500 text-sm mt-1">שלב {step} מתוך 3</p>
            </div>

            {/* ── STEP 1: Role selection ── */}
            {step === 1 && (
              <div className="space-y-4">
                {[
                  {
                    role: "owner" as UserRole,
                    title: "בעל נכס",
                    desc: "אני מחפש/ת לקנות, למכור או להשכיר נכס",
                    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                    perks: ["גישה לאלפי מתווכים", "השוואת הצעות", "ביקורות מאומתות"],
                  },
                  {
                    role: "agent" as UserRole,
                    title: "מתווך נדל\"ן",
                    desc: "אני מתווך/ת ורוצה לפרסם את השירותים שלי",
                    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
                    perks: ["פרופיל מקצועי", "חשיפה ללקוחות", "ניהול לידים"],
                  },
                ].map((opt) => (
                  <button
                    key={opt.role}
                    onClick={() => handleNextFromStep1(opt.role)}
                    className="w-full rounded-2xl border border-[#2A2A2A] bg-[#161616] p-6 text-right hover:border-[#C9A84C]/50 hover:bg-[#1A1500] transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#C9A84C]/20 transition-colors">
                        <svg className="w-6 h-6 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={opt.icon} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold text-lg">{opt.title}</h3>
                          <svg className="w-5 h-5 text-gray-600 group-hover:text-[#C9A84C] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                          </svg>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{opt.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {opt.perks.map((p) => (
                            <span key={p} className="text-xs px-2.5 py-1 rounded-full bg-[#2A2A2A] text-gray-400">
                              ✓ {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                <p className="text-center text-sm text-gray-500 pt-2">
                  כבר רשומים?{" "}
                  <Link href="/login" className="text-[#C9A84C] hover:text-[#E8C96A] transition-colors">
                    כניסה לחשבון
                  </Link>
                </p>
              </div>
            )}

            {/* ── STEP 2: Personal details ── */}
            {step === 2 && (
              <form onSubmit={handleNextFromStep2} className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-8 space-y-5">
                {/* Role badge */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#C9A84C]/8 border border-[#C9A84C]/20 w-fit">
                  <div className="w-2 h-2 rounded-full bg-[#C9A84C]" />
                  <span className="text-[#C9A84C] text-xs font-medium">
                    {role === "agent" ? "מתווך נדל\"ן" : "בעל נכס"}
                  </span>
                  <button type="button" onClick={() => setStep(1)} className="text-gray-600 hover:text-gray-400 mr-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">שם מלא <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors((err) => ({ ...err, name: "" })); }}
                    placeholder="ישראל ישראלי"
                    className={`w-full bg-[#0D0D0D] border rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors ${errors.name ? "border-red-500/50" : "border-[#2A2A2A] focus:border-[#C9A84C]/50"}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">כתובת אימייל <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((err) => ({ ...err, email: "" })); }}
                    placeholder="you@example.com"
                    dir="ltr"
                    className={`w-full bg-[#0D0D0D] border rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors ${errors.email ? "border-red-500/50" : "border-[#2A2A2A] focus:border-[#C9A84C]/50"}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">מספר טלפון <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setErrors((err) => ({ ...err, phone: "" })); }}
                    placeholder="050-000-0000"
                    dir="ltr"
                    className={`w-full bg-[#0D0D0D] border rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors ${errors.phone ? "border-red-500/50" : "border-[#2A2A2A] focus:border-[#C9A84C]/50"}`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-400 text-xs mb-1.5">סיסמה <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors((err) => ({ ...err, password: "" })); }}
                      placeholder="לפחות 8 תווים"
                      className={`w-full bg-[#0D0D0D] border rounded-lg pl-10 pr-4 py-3 text-white text-sm placeholder-gray-600 outline-none transition-colors ${errors.password ? "border-red-500/50" : "border-[#2A2A2A] focus:border-[#C9A84C]/50"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                      </svg>
                    </button>
                  </div>
                  <PasswordStrength password={password} />
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                <button type="submit" className="w-full py-3.5 rounded-lg bg-[#C9A84C] hover:bg-[#E8C96A] text-black font-semibold transition-colors">
                  המשך
                </button>
              </form>
            )}

            {/* ── STEP 3: Agent details / confirmation ── */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="rounded-2xl border border-[#2A2A2A] bg-[#161616] p-8 space-y-6">
                {serverError && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {serverError}
                  </div>
                )}
                {role === "agent" && (
                  <>
                    {/* Areas */}
                    <div>
                      <label className="block text-gray-400 text-xs mb-2">
                        אזורי פעילות <span className="text-red-400">*</span>
                        <span className="text-gray-600 mr-1">(ניתן לבחור מספר)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {AREAS.map((area) => {
                          const selected = selectedAreas.includes(area);
                          return (
                            <button
                              key={area}
                              type="button"
                              onClick={() => toggleArea(area)}
                              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                                selected
                                  ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C]"
                                  : "border-[#2A2A2A] text-gray-400 hover:border-gray-500"
                              }`}
                            >
                              {selected && <span className="ml-1">✓</span>}
                              {area}
                            </button>
                          );
                        })}
                      </div>
                      {errors.areas && <p className="text-red-400 text-xs mt-2">{errors.areas}</p>}
                    </div>

                    {/* Specialty */}
                    <div>
                      <label className="block text-gray-400 text-xs mb-1.5">
                        התמחות ראשית <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {SPECIALTIES.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => { setSpecialty(s); setErrors((e) => ({ ...e, specialty: "" })); }}
                            className={`px-3 py-2.5 rounded-lg text-sm border text-right transition-all ${
                              specialty === s
                                ? "border-[#C9A84C] bg-[#C9A84C]/15 text-[#C9A84C]"
                                : "border-[#2A2A2A] text-gray-400 hover:border-gray-500"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      {errors.specialty && <p className="text-red-400 text-xs mt-1">{errors.specialty}</p>}
                    </div>

                    <div className="h-px bg-[#2A2A2A]" />
                  </>
                )}

                {/* Summary */}
                <div className="rounded-xl bg-[#0D0D0D] border border-[#2A2A2A] p-4 space-y-2">
                  <p className="text-gray-500 text-xs mb-3">סיכום פרטים</p>
                  {[
                    { label: "שם", value: name },
                    { label: "אימייל", value: email },
                    { label: "טלפון", value: phone },
                    { label: "סוג חשבון", value: role === "agent" ? "מתווך נדל\"ן" : "בעל נכס" },
                    ...(role === "agent" && specialty ? [{ label: "התמחות", value: specialty }] : []),
                    ...(role === "agent" && selectedAreas.length ? [{ label: "אזורים", value: selectedAreas.join("، ") }] : []),
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{row.label}</span>
                      <span className="text-white truncate max-w-[60%] text-left" dir="auto">{row.value}</span>
                    </div>
                  ))}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      onClick={() => { setAgreeTerms((t) => !t); setErrors((e) => ({ ...e, terms: "" })); }}
                      className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border transition-all cursor-pointer ${
                        agreeTerms ? "bg-[#C9A84C] border-[#C9A84C]" : "bg-[#0D0D0D] border-[#2A2A2A]"
                      }`}
                    >
                      {agreeTerms && (
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-400 text-sm leading-relaxed">
                      אני מסכים/ה ל
                      <a href="#" className="text-[#C9A84C] hover:underline mx-1">תנאי השימוש</a>
                      ול
                      <a href="#" className="text-[#C9A84C] hover:underline mx-1">מדיניות הפרטיות</a>
                      של נדלניסט
                    </span>
                  </label>
                  {errors.terms && <p className="text-red-400 text-xs mt-1">{errors.terms}</p>}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-3.5 rounded-lg border border-[#2A2A2A] text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm"
                  >
                    חזרה
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 rounded-lg bg-[#C9A84C] hover:bg-[#E8C96A] disabled:opacity-60 text-black font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        יוצר חשבון...
                      </>
                    ) : (
                      "יצירת חשבון"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
