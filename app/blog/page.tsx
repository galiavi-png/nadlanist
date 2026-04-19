import Link from "next/link";
import Header from "@/app/components/Header";

const posts = [
  {
    slug: "how-to-choose-agent",
    title: "איך בוחרים מתווך נדל\"ן? 5 דברים שחייבים לבדוק",
    excerpt: "בחירת מתווך היא אחת ההחלטות החשובות בעסקת נדל\"ן. הנה המדריך המלא שיעזור לכם לקבל את ההחלטה הנכונה.",
    date: "15 באפריל 2026",
    category: "מדריכים",
    readTime: "5 דקות קריאה",
  },
  {
    slug: "market-trends-2026",
    title: "שוק הנדל\"ן ב-2026: מגמות ותחזיות",
    excerpt: "ניתוח מעמיק של מצב שוק הנדל\"ן הישראלי, לאן הולכות המחירים ואיפה כדאי להשקיע השנה.",
    date: "10 באפריל 2026",
    category: "שוק הנדל\"ן",
    readTime: "8 דקות קריאה",
  },
  {
    slug: "first-apartment-guide",
    title: "מדריך לרוכשי דירה ראשונה: מה שאף אחד לא מספר לכם",
    excerpt: "מהמשכנתה ועד החוזה — כל מה שצריך לדעת לפני שחותמים על עסקת הנדל\"ן הראשונה שלכם.",
    date: "3 באפריל 2026",
    category: "מדריכים",
    readTime: "10 דקות קריאה",
  },
  {
    slug: "negotiation-tips",
    title: "5 טיפים למשא ומתן מוצלח על מחיר דירה",
    excerpt: "עצות מעשיות מניסיון של מתווכים מובילים שיעזרו לכם לחסוך עשרות אלפי שקלים בעסקה הבאה.",
    date: "28 במרץ 2026",
    category: "טיפים",
    readTime: "4 דקות קריאה",
  },
  {
    slug: "investment-properties",
    title: "נכסים להשקעה: אילו אזורים מציגים את התשואה הגבוהה ביותר?",
    excerpt: "סקירת האזורים המובילים בישראל מבחינת תשואה על השקעה בנדל\"ן למגורים ולמסחר.",
    date: "20 במרץ 2026",
    category: "השקעות",
    readTime: "7 דקות קריאה",
  },
  {
    slug: "renting-vs-buying",
    title: "שכירות או קנייה? המחשבון שיענה לכם על השאלה",
    excerpt: "ניתוח כלכלי מפורט שיעזור לכם להחליט האם כדאי לקנות דירה או להמשיך לשכור בשלב הנוכחי בחיים.",
    date: "12 במרץ 2026",
    category: "ניתוח פיננסי",
    readTime: "6 דקות קריאה",
  },
];

const categories = ["הכל", "מדריכים", "שוק הנדל\"ן", "טיפים", "השקעות", "ניתוח פיננסי"];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white" dir="rtl">
      <Header />

      {/* Hero */}
      <section className="border-b border-[#2A2A2A] py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 text-[#C9A84C] text-xs font-medium mb-6">
            בלוג נדלניסט
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            תוכן מקצועי על{" "}
            <span className="text-[#C9A84C]">נדל&quot;ן ישראלי</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            מדריכים, ניתוחים ועדכוני שוק מהמומחים המובילים בתחום הנדל&quot;ן
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                cat === "הכל"
                  ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                  : "border-[#2A2A2A] text-gray-400 hover:border-[#C9A84C]/40 hover:text-[#C9A84C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group rounded-xl border border-[#2A2A2A] bg-[#111111] hover:border-[#C9A84C]/30 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Placeholder image */}
              <div className="h-44 bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0015.5 3H13" />
                  </svg>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/20">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-600">{post.readTime}</span>
                </div>

                <h2 className="text-white font-semibold text-base mb-2 group-hover:text-[#C9A84C] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2A2A]">
                  <span className="text-xs text-gray-600">{post.date}</span>
                  <span className="text-xs text-[#C9A84C] group-hover:underline cursor-pointer">
                    קראו עוד ←
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Coming soon note */}
        <div className="mt-12 text-center py-10 rounded-xl border border-dashed border-[#2A2A2A]">
          <p className="text-gray-600 text-sm">עוד מאמרים בדרך — הישארו מעודכנים</p>
        </div>
      </div>
    </div>
  );
}
