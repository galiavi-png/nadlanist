import Link from "next/link";
import Header from "@/app/components/Header";

const stats = [
  { value: "1,200+", label: "מתווכים רשומים" },
  { value: "98%", label: "שביעות רצון לקוחות" },
  { value: "15,000+", label: "עסקאות הושלמו" },
  { value: "50+", label: "ערים ברחבי ישראל" },
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "שקיפות מלאה",
    desc: "ביקורות אמיתיות, דירוגים אמינים, ומחירים ברורים. אנחנו לא מפרסמים מתווכים ללא אימות.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "קהילת מומחים",
    desc: "כל מתווך עובר תהליך אימות קפדני. רק מתווכים בעלי רישיון תקף ורקורד מוכח מופיעים בפלטפורמה.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "חיבור מהיר",
    desc: "מהרגע שמצאתם מתווך שמתאים לכם — צ'אט, שיחה, או פגישה. ללא טפסים מסורבלים.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "נתונים עובדים בשבילכם",
    desc: "כלי ניתוח, דוחות ביצועים, ומעקב אחר לידים — כל מה שמתווך צריך כדי להצליח.",
  },
];

const team = [
  { name: "אביב לוי", role: "מנכ\"ל ומייסד", bg: "from-amber-800 to-amber-600" },
  { name: "נועה כהן", role: "סמנכ\"ל מוצר", bg: "from-stone-700 to-stone-500" },
  { name: "רועי שמש", role: "סמנכ\"ל טכנולוגיה", bg: "from-yellow-900 to-yellow-700" },
  { name: "דנה מזרחי", role: "מנהלת שיווק", bg: "from-amber-900 to-amber-700" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white" dir="rtl">
      <Header />

      <main>
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#161616] border border-[#2A2A2A] rounded-full px-4 py-1.5 text-xs text-[#C9A84C] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] inline-block" />
            הסיפור שלנו
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            אנחנו משנים את האופן<br />
            שבו ישראל <span className="gold-shimmer">מוצאת מתווכים</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            נדלניסט נוסדה מתוך אמונה פשוטה: מציאת מתווך נדל&quot;ן אמין לא צריכה להיות מסע.
            היא צריכה להיות חוויה ברורה, מהירה, ומבוססת נתונים.
          </p>
        </section>

        {/* Stats */}
        <section className="border-y border-[#2A2A2A] bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-bold gold-shimmer mb-2">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                למה <span className="text-[#C9A84C]">נדלניסט</span>?
              </h2>
              <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                <p>
                  שוק הנדל&quot;ן הישראלי הוא מהמורכבים בעולם. מחירים גבוהים, רגולציה משתנה,
                  ומגוון עצום של מתווכים — חלקם מעולים, חלקם פחות. הבחירה במתווך
                  הנכון יכולה לחסוך עשרות אלפי שקלים ולקצר את תהליך הרכישה בחודשים.
                </p>
                <p>
                  נדלניסט פותחה כדי לאפשר ללקוחות לקבל החלטה מושכלת ומבוססת נתונים.
                  אנו מציגים ביקורות אמיתיות, מספרי עסקאות מאומתים, ומידע שקוף על
                  כל מתווך — כדי שתדעו בדיוק עם מי אתם עובדים.
                </p>
                <p>
                  עבור המתווכים, אנחנו מספקים כלי שיווק חכמים, ניתוח נתונים עמוק,
                  וחשיפה ללקוחות מתאימים — כדי שגם הם יוכלו למקד את המאמץ במה שחשוב: ייצוג לקוחות.
                </p>
              </div>
            </div>
            <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8">
              <div className="space-y-6">
                {[
                  { year: "2022", event: "נדלניסט נוסדה בתל אביב עם 50 מתווכים ראשונים" },
                  { year: "2023", event: "הרחבה לכלל הארץ — 500 מתווכים, 20 ערים" },
                  { year: "2024", event: "השקת כלי AI לניתוח ביצועים ומיצוי לידים" },
                  { year: "2025", event: "1,000 מתווכים, 10,000 עסקאות שהושלמו" },
                  { year: "2026", event: "1,200+ מתווכים, 15,000+ עסקאות — ועדיין גדלים" },
                ].map((item) => (
                  <div key={item.year} className="flex gap-4">
                    <div className="text-[#C9A84C] font-bold text-sm w-12 shrink-0 pt-0.5">{item.year}</div>
                    <div className="text-gray-400 text-sm leading-relaxed">{item.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#0A0A0A] border-y border-[#2A2A2A] py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              הערכים שמנחים אותנו
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#C9A84C]/40 transition-colors card-hover"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#C9A84C] mb-4">
                    {v.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            הצוות שמאחורי נדלניסט
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.bg} mx-auto mb-3 flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-2xl">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div className="text-white font-semibold text-sm">{member.name}</div>
                <div className="text-gray-500 text-xs mt-0.5">{member.role}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0A0A0A] border-t border-[#2A2A2A] py-20 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">
              מוכנים להצטרף <span className="gold-shimmer">לנדלניסט</span>?
            </h2>
            <p className="text-gray-400 mb-8">
              בין אם אתם לקוח המחפש מתווך, או מתווך המחפש לקוחות — יש לנו את הפתרון בשבילכם.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/agents"
                className="px-8 py-3.5 rounded-xl bg-[#C9A84C] text-black font-semibold hover:bg-[#E8C96A] transition-colors text-sm"
              >
                מצאו מתווך
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3.5 rounded-xl border border-[#2A2A2A] text-white hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors text-sm"
              >
                הצטרפו כמתווך
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#2A2A2A] bg-[#0A0A0A] py-8 px-6 text-center">
        <p className="text-gray-600 text-sm">© 2026 נדלניסט. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
}
