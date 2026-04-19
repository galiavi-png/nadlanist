import Link from "next/link";
import Header from "@/app/components/Header";

export default function CancellationPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white" dir="rtl">
      <Header />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-gray-500 text-sm mb-2">עודכן לאחרונה: אפריל 2026</p>
          <h1 className="text-4xl font-bold mb-4">
            מדיניות <span className="gold-shimmer">ביטול</span>
          </h1>
          <p className="text-gray-400 leading-relaxed">
            מדיניות ביטול זו מפרטת את זכויות הביטול שלכם בהתאם לחוק הגנת הצרכן,
            התשמ&quot;א-1981 ותקנות הגנת הצרכן (ביטול עסקה), התשע&quot;א-2010.
          </p>
        </div>

        {/* Key rights highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: "🗓️", title: "14 יום קירור", desc: "זכות ביטול מוחלטת תוך 14 יום מיום ההצטרפות" },
            { icon: "💳", title: "החזר כספי מלא", desc: "החזר מלא ללא קנסות בתוך תקופת הקירור" },
            { icon: "📧", title: "ביטול פשוט", desc: "ביטול בדוא\"ל, בטלפון, או ישירות בהגדרות" },
          ].map((item) => (
            <div key={item.title} className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-5 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-10">
          {[
            {
              title: "1. זכות ביטול — תקופת קירור (14 יום)",
              content: `בהתאם לסעיף 14ג לחוק הגנת הצרכן, התשמ"א-1981, הנכם רשאים לבטל כל עסקה שנערכה מרחוק (לרבות הרשמה מקוונת לאחד ממסלולי המנוי של נדלניסט) תוך 14 ימים ממועד ביצוע העסקה, ללא כל צורך בנימוק וללא קנס ביטול.

ביטול בתוך תקופת הקירור יזכה אתכם בהחזר כספי מלא של כל סכום ששולם, בניכוי דמי ביטול בסך 5% ממחיר העסקה, או 100 ₪ — הנמוך מבין השניים, בהתאם לסעיף 14ה(ב) לחוק.

חשוב לציין: אם ביטלתם לאחר שהחל מתן השירות בפועל (כלומר: לאחר 14 יום הניסיון החינמי), ייתכן שתחויבו בעבור הימים בהם קיבלתם שירות בפועל.`,
            },
            {
              title: "2. ביטול לאחר תקופת הקירור",
              content: `לאחר תום 14 ימי הקירור, ניתן לבטל את המנוי בכל עת. הביטול ייכנס לתוקף בסיום תקופת החיוב הנוכחית (סוף החודש השוטף). לא ייגבה חיוב עבור חודשים עתידיים לאחר אישור הביטול.

החזר כספי יחסי: במקרה של ביטול עמידה בתנאים מיוחדים (למשל: שירות שהוא לקוי מהותית או שינוי מהותי בתנאים שלא הסכמתם לו), נדלניסט תשקול החזר יחסי על פי שיקול דעתה ובהתאם לדין.`,
            },
            {
              title: "3. כיצד לבטל",
              content: `ניתן לבטל את המנוי באחת מהדרכים הבאות:

(א) דרך הפלטפורמה: היכנסו להגדרות החשבון ← מנוי ← בטל מנוי.

(ב) בדוא"ל: שלחו הודעת ביטול בכתב לכתובת: cancel@nadlanist.co.il עם הפרטים הבאים:
    • שם מלא
    • כתובת דוא"ל הרשומה בחשבון
    • מספר חשבון (אם ידוע)
    • בקשת ביטול מפורשת

(ג) בטלפון: 03-000-0000, ראשון-חמישי 09:00–18:00.

מועד הביטול הוא מועד קבלת הבקשה על ידי נדלניסט. תקבלו אישור ביטול בדוא"ל תוך יום עסקים.`,
            },
            {
              title: "4. החזר כספי",
              content: `החזרים כספיים יבוצעו תוך 14 ימי עסקים מאישור הביטול, לאמצעי התשלום בו שולם המנוי המקורי.

זמני עיבוד:
• כרטיס אשראי: 3–14 ימי עסקים (בהתאם לחברת האשראי)
• העברה בנקאית: עד 5 ימי עסקים

אם לא קיבלתם החזר בזמן הצפוי, אנא פנו אלינו ל- billing@nadlanist.co.il.`,
            },
            {
              title: "5. ביטולים שאינם זכאים להחזר",
              content: `לא יינתן החזר כספי במקרים הבאים:
• ביטול חשבון עקב הפרת תנאי השימוש מצד המשתמש
• תוכן דיגיטלי שהורד או נצפה במלואו, לאחר שניתנה הסכמה מפורשת לוותר על זכות הביטול

הבהרה: מנויי נדלניסט הם שירותי גישה רציפים — לא תוכן חד-פעמי — ולכן זכות הביטול חלה לאורך כל חיי המנוי.`,
            },
            {
              title: "6. שינויים בתוכנית המנוי",
              content: `שינוי מסלול (שדרוג/הורדה): השינוי ייכנס לתוקף בתחילת חודש החיוב הבא. לא ייגבה חיוב כפול.

שינוי מחיר: בכל שינוי מחיר ביוזמת נדלניסט, תשלח הודעה מראש של 30 ימים. זכאים לסרב לשינוי ולבטל ללא קנס עד 14 ימים מקבלת ההודעה.`,
            },
            {
              title: "7. פניות והגנת צרכן",
              content: `לכל שאלה או תלונה בנוגע למדיניות הביטול:

דוא"ל: cancel@nadlanist.co.il
טלפון: 03-000-0000

זכויותיכם על פי חוק הגנת הצרכן לא מוגבלות על ידי מדיניות זו. בכל מחלוקת שלא נפתרה, ניתן לפנות ל:
• הממונה על הגנת הצרכן במשרד הכלכלה והתעשייה: economy.gov.il
• בית משפט לתביעות קטנות`,
            },
          ].map((section) => (
            <section key={section.title} className="border-b border-[#2A2A2A] pb-8 last:border-0">
              <h2 className="text-lg font-bold text-[#C9A84C] mb-4">{section.title}</h2>
              <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 bg-[#111111] border border-[#2A2A2A] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            ראו גם:{" "}
            <Link href="/terms" className="text-[#C9A84C] hover:underline">תנאי שימוש</Link>
            {" · "}
            <Link href="/privacy" className="text-[#C9A84C] hover:underline">מדיניות פרטיות</Link>
          </p>
          <Link href="/pricing" className="text-sm text-[#C9A84C] hover:underline font-medium">
            הצטרפו עכשיו ←
          </Link>
        </div>
      </main>
    </div>
  );
}
