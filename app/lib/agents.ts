export type DealType = "sale" | "rent" | "commercial";

export interface Review {
  id: number;
  author: string;
  date: string;
  rating: number;
  text: string;
  dealType: DealType;
}

export interface Property {
  id: number;
  title: string;
  city: string;
  type: string;
  price: number;
  rooms: number;
  sqm: number;
  status: "active" | "sold" | "pending";
  gradient: string;
}

export interface Agent {
  id: number;
  name: string;
  city: string;
  area: string;
  specialty: string;
  tags: string[];
  dealTypes: DealType[];
  rating: number;
  reviews: number;
  experience: number;
  deals: number;
  successRate: number;
  initials: string;
  color: string;
  priceMin: number;
  bio: string;
  longBio: string;
  verified: boolean;
  phone: string;
  email: string;
  reviewsList: Review[];
  properties: Property[];
}

export const ALL_AGENTS: Agent[] = [
  {
    id: 1,
    name: "יעל כהן",
    city: "תל אביב",
    area: "תל אביב והמרכז",
    specialty: "דירות יוקרה",
    tags: ["דירות יוקרה", "פנטהאוז", "דירות גן"],
    dealTypes: ["sale", "rent"],
    rating: 4.9,
    reviews: 127,
    experience: 12,
    deals: 84,
    successRate: 97,
    initials: "יכ",
    color: "from-amber-600 to-yellow-500",
    priceMin: 2000000,
    bio: "מומחית לדירות יוקרה בתל אביב עם ניסיון של 12 שנה.",
    longBio: `יעל כהן היא אחת המתווכות המובילות בשוק הנדל"ן היוקרתי בתל אביב, עם ניסיון של למעלה מ-12 שנה בתחום. מאז הצטרפה לשוק הנדל"ן בשנת 2012, יעל בנתה מוניטין מרשים של אמינות, מקצועיות ותוצאות מוכחות.

יעל מתמחה בדירות יוקרה, פנטהאוזים ודירות גן בלב תל אביב. הגישה האישית שלה, הידע המעמיק בשוק והרשת הענפה של קשרים מאפשרים לה להציע ללקוחותיה נכסים ייחודיים שאינם תמיד זמינים בשוק הפתוח.

בין לקוחותיה: יזמים, אנשי עסקים בכירים ורוכשי נדל"ן מחו"ל המחפשים נכסים פרימיום בישראל. יעל דוברת עברית, אנגלית וצרפתית ברמה גבוהה.`,
    verified: true,
    phone: "052-111-2233",
    email: "yael@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "משה לוי",
        date: "מרץ 2026",
        rating: 5,
        text: "יעל עזרה לנו למצוא את הפנטהאוז המושלם בתל אביב. מקצועיות ללא פשרות, תקשורת מעולה לאורך כל התהליך. ממליץ בחום!",
        dealType: "sale",
      },
      {
        id: 2,
        author: "רחל שמיר",
        date: "פברואר 2026",
        rating: 5,
        text: "חוויה מדהימה. יעל הבינה בדיוק מה שחיפשנו ומצאה לנו נכס שלא היה מפורסם. שירות אישי ומסור ברמה הגבוהה ביותר.",
        dealType: "sale",
      },
      {
        id: 3,
        author: "דניאל כץ",
        date: "ינואר 2026",
        rating: 5,
        text: "עבדתי עם הרבה מתווכים בחיים שלי, יעל היא ברמה אחרת לגמרי. הכירה כל פרט בשוק ודאגה לכל הפרטים הקטנים.",
        dealType: "rent",
      },
      {
        id: 4,
        author: "אורית פרידמן",
        date: "דצמבר 2025",
        rating: 4,
        text: "מקצוענית מהמדרגה הראשונה. הליך הרכישה היה חלק וללא הפתעות. קיבלנו יחס אישי לאורך כל הדרך.",
        dealType: "sale",
      },
    ],
    properties: [
      {
        id: 1,
        title: "פנטהאוז מפואר בצפון תל אביב",
        city: "תל אביב",
        type: "פנטהאוז",
        price: 12500000,
        rooms: 5,
        sqm: 280,
        status: "active",
        gradient: "from-amber-900 to-yellow-800",
      },
      {
        id: 2,
        title: "דירת גן ברמת אביב",
        city: "תל אביב",
        type: "דירת גן",
        price: 6800000,
        rooms: 4,
        sqm: 180,
        status: "active",
        gradient: "from-yellow-900 to-amber-700",
      },
      {
        id: 3,
        title: "דירת יוקרה בנווה צדק",
        city: "תל אביב",
        type: "דירה",
        price: 5200000,
        rooms: 3,
        sqm: 140,
        status: "sold",
        gradient: "from-amber-800 to-yellow-700",
      },
      {
        id: 4,
        title: "דופלקס מעוצב ביפו העתיקה",
        city: "יפו",
        type: "דופלקס",
        price: 4400000,
        rooms: 4,
        sqm: 160,
        status: "pending",
        gradient: "from-yellow-800 to-amber-600",
      },
    ],
  },
  {
    id: 2,
    name: "דוד לוי",
    city: "הרצליה",
    area: "הרצליה פיתוח",
    specialty: "נכסי פרימיום",
    tags: ["נכסי פרימיום", "מסחרי", "השקעות"],
    dealTypes: ["sale", "commercial"],
    rating: 4.8,
    reviews: 98,
    experience: 9,
    deals: 61,
    successRate: 94,
    initials: "דל",
    color: "from-yellow-700 to-amber-500",
    priceMin: 3000000,
    bio: "מתמחה בנכסי פרימיום בהרצליה פיתוח.",
    longBio: `דוד לוי הוא מתווך בכיר המתמחה בנכסי פרימיום ומסחריים באזור הרצליה פיתוח — אחד האזורים המבוקשים ביותר בישראל. עם ניסיון של 9 שנים בשוק, דוד בנה רשת קשרים ענפה עם יזמים, חברות נדל"ן ומשקיעים מוסדיים.

התמחותו כוללת נכסי מגורים יוקרתיים, שטחי משרדים ומתחמי מסחר. דוד מציע ללקוחותיו ניתוח כלכלי מעמיק לכל עסקה, תוך התמקדות ב-ROI ופוטנציאל השבחה עתידי.

דוד בעל תואר ראשון בכלכלה ותעודת מתווך מוסמך מטעם משרד המשפטים.`,
    verified: true,
    phone: "054-222-3344",
    email: "david@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "ג'ון סמית",
        date: "מרץ 2026",
        rating: 5,
        text: "David helped me find the perfect office space in Herzliya Pituach. Professional, knowledgeable, and efficient.",
        dealType: "commercial",
      },
      {
        id: 2,
        author: "נועם הרשקוביץ",
        date: "ינואר 2026",
        rating: 5,
        text: "רכשתי דירת יוקרה בהרצליה בזכות דוד. הכיר כל נכס באזור ועזר לי לנהל מו\"מ מוצלח. שירות יוצא דופן.",
        dealType: "sale",
      },
      {
        id: 3,
        author: "הילה גרין",
        date: "נובמבר 2025",
        rating: 4,
        text: "מקצוען אמיתי. ידע לענות על כל שאלה ונתן לי תחושה שאני בידיים טובות.",
        dealType: "sale",
      },
    ],
    properties: [
      {
        id: 1,
        title: "וילה פרטית בהרצליה פיתוח",
        city: "הרצליה",
        type: "וילה",
        price: 18000000,
        rooms: 7,
        sqm: 450,
        status: "active",
        gradient: "from-yellow-900 to-amber-800",
      },
      {
        id: 2,
        title: "מרכז עסקים ראשי",
        city: "הרצליה",
        type: "מסחרי",
        price: 22000000,
        rooms: 0,
        sqm: 800,
        status: "active",
        gradient: "from-amber-900 to-yellow-700",
      },
      {
        id: 3,
        title: "דירת פנטהאוז עם בריכה פרטית",
        city: "הרצליה",
        type: "פנטהאוז",
        price: 9500000,
        rooms: 5,
        sqm: 320,
        status: "sold",
        gradient: "from-yellow-800 to-amber-600",
      },
    ],
  },
  {
    id: 3,
    name: "מיכל אברהם",
    city: "ירושלים",
    area: "ירושלים",
    specialty: "נכסים היסטוריים",
    tags: ["נכסים היסטוריים", "בתי אבן", "שימור"],
    dealTypes: ["sale"],
    rating: 5.0,
    reviews: 74,
    experience: 15,
    deals: 52,
    successRate: 99,
    initials: "מא",
    color: "from-amber-800 to-yellow-600",
    priceMin: 1500000,
    bio: "מובילה בשוק הנדל\"ן הירושלמי.",
    longBio: `מיכל אברהם היא מתווכת בכירה עם 15 שנות ניסיון בשוק הנדל"ן הירושלמי הייחודי. מיכל מתמחה בנכסים היסטוריים, בתי אבן מסורתיים ונכסים בשכונות המורשת של ירושלים.

הידע העמוק שלה בחוקי התכנון ובנייה הייחודיים לירושלים, יחד עם קשריה עם ועדות השימור ורשויות העתיקות, מאפשרים לה לנווט עסקאות מורכבות בצורה חלקה וללא הפתעות.

מיכל היא גם יועצת מוסמכת לשימור נכסים ומרצה בקורסים למתווכים בנושא נדל"ן היסטורי.`,
    verified: true,
    phone: "050-333-4455",
    email: "michal@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "יוסף כהן",
        date: "פברואר 2026",
        rating: 5,
        text: "מיכל עזרה לנו לרכוש בית אבן מקסים בעין כרם. הידע שלה על ירושלים הוא לאין ערוך. 10/10.",
        dealType: "sale",
      },
      {
        id: 2,
        author: "Sarah Johnson",
        date: "ינואר 2026",
        rating: 5,
        text: "Michal's knowledge of Jerusalem's historic properties is unmatched. She found us our dream home in the German Colony.",
        dealType: "sale",
      },
      {
        id: 3,
        author: "אמיר שלום",
        date: "דצמבר 2025",
        rating: 5,
        text: "לאחר חיפוש של שנה, מיכל מצאה לנו בית מושלם תוך שבועיים. הקשרים שלה בירושלים הם יוצאי דופן.",
        dealType: "sale",
      },
    ],
    properties: [
      {
        id: 1,
        title: "בית אבן מפואר בעין כרם",
        city: "ירושלים",
        type: "בית פרטי",
        price: 7800000,
        rooms: 5,
        sqm: 220,
        status: "active",
        gradient: "from-amber-800 to-yellow-700",
      },
      {
        id: 2,
        title: "דירת יוקרה במושבה הגרמנית",
        city: "ירושלים",
        type: "דירה",
        price: 4200000,
        rooms: 4,
        sqm: 160,
        status: "active",
        gradient: "from-yellow-900 to-amber-800",
      },
      {
        id: 3,
        title: "בית אבן בנחלאות",
        city: "ירושלים",
        type: "בית פרטי",
        price: 5500000,
        rooms: 4,
        sqm: 180,
        status: "sold",
        gradient: "from-amber-700 to-yellow-600",
      },
    ],
  },
  {
    id: 4,
    name: "רון שפירא",
    city: "רמת גן",
    area: "גוש דן",
    specialty: "דירות להשכרה",
    tags: ["השכרה", "דירות", "גוש דן"],
    dealTypes: ["rent"],
    rating: 4.6,
    reviews: 211,
    experience: 7,
    deals: 143,
    successRate: 92,
    initials: "רש",
    color: "from-yellow-600 to-amber-400",
    priceMin: 800000,
    bio: "מומחה בשוק השכירות בגוש דן.",
    longBio: `רון שפירא הוא מתווך מוביל בשוק השכירות בגוש דן, עם ניסיון של 7 שנים ו-143 עסקאות מוצלחות. רון מתמחה בחיבור בין שוכרים לנכסים איכותיים בתנאים הטובים ביותר.

הגישה המהירה והיעילה שלו, יחד עם מאגר הנכסים הגדול שמנהל, הופכים אותו לבחירה הראשונה עבור מי שמחפשים דירה בגוש דן ברמה גבוהה.`,
    verified: false,
    phone: "053-444-5566",
    email: "ron@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "אבי כהן",
        date: "מרץ 2026",
        rating: 5,
        text: "רון מצא לי דירה בדיוק לפי הדרישות תוך ימים ספורים. שירות מהיר ומקצועי.",
        dealType: "rent",
      },
      {
        id: 2,
        author: "מיה ברק",
        date: "פברואר 2026",
        rating: 4,
        text: "תהליך חלק ויעיל. רון עזר עם כל הניירת ומכיר היטב את השוק.",
        dealType: "rent",
      },
    ],
    properties: [
      {
        id: 1,
        title: "דירת 4 חדרים ברמת גן",
        city: "רמת גן",
        type: "דירה",
        price: 12000,
        rooms: 4,
        sqm: 110,
        status: "active",
        gradient: "from-yellow-800 to-amber-600",
      },
      {
        id: 2,
        title: "דירת גן בגבעתיים",
        city: "גבעתיים",
        type: "דירת גן",
        price: 9500,
        rooms: 3,
        sqm: 90,
        status: "active",
        gradient: "from-amber-700 to-yellow-500",
      },
    ],
  },
  {
    id: 5,
    name: "נועה ברק",
    city: "חיפה",
    area: "חיפה והכרמל",
    specialty: "נדל\"ן מסחרי",
    tags: ["מסחרי", "משרדים", "תעשייה"],
    dealTypes: ["commercial", "sale"],
    rating: 4.7,
    reviews: 56,
    experience: 10,
    deals: 39,
    successRate: 95,
    initials: "נב",
    color: "from-amber-500 to-yellow-400",
    priceMin: 2500000,
    bio: "מתמחה בנדל\"ן מסחרי בחיפה.",
    longBio: `נועה ברק היא מומחית לנדל"ן מסחרי בחיפה, עם ניסיון של 10 שנים בתחום. נועה מתמחה בעסקאות שכירות ומכירה של שטחי משרדים, חנויות ומתחמי תעשייה.`,
    verified: true,
    phone: "052-555-6677",
    email: "noa@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "תומר גל",
        date: "ינואר 2026",
        rating: 5,
        text: "נועה עזרה לנו למצוא שטח משרדים מושלם בחיפה. ידע מקצועי ויחס אישי.",
        dealType: "commercial",
      },
    ],
    properties: [
      {
        id: 1,
        title: "מרכז מסחרי בחיפה",
        city: "חיפה",
        type: "מסחרי",
        price: 15000000,
        rooms: 0,
        sqm: 600,
        status: "active",
        gradient: "from-amber-600 to-yellow-500",
      },
    ],
  },
  {
    id: 6,
    name: "אבי מזרחי",
    city: "נתניה",
    area: "נתניה והשרון",
    specialty: "בתים פרטיים",
    tags: ["בתים פרטיים", "וילות", "השרון"],
    dealTypes: ["sale", "rent"],
    rating: 4.5,
    reviews: 89,
    experience: 6,
    deals: 67,
    successRate: 91,
    initials: "אמ",
    color: "from-yellow-800 to-amber-600",
    priceMin: 1200000,
    bio: "מתמחה בבתים פרטיים ונכסים גדולים באזור השרון.",
    longBio: `אבי מזרחי הוא מתווך מוביל בנתניה והשרון, עם 6 שנות ניסיון והתמחות בבתים פרטיים ונכסים גדולים. אבי מכיר לעומק כל שכונה ורחוב בנתניה ובאזורים הסמוכים.`,
    verified: false,
    phone: "054-666-7788",
    email: "avi@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "שרית אלון",
        date: "פברואר 2026",
        rating: 5,
        text: "אבי עזר לנו למצוא בית חלומות בנתניה. מקצועי, ידידותי ואמין.",
        dealType: "sale",
      },
    ],
    properties: [
      {
        id: 1,
        title: "וילה עם בריכה בנתניה",
        city: "נתניה",
        type: "וילה",
        price: 5500000,
        rooms: 6,
        sqm: 300,
        status: "active",
        gradient: "from-yellow-900 to-amber-700",
      },
    ],
  },
  {
    id: 7,
    name: "שירה גולן",
    city: "תל אביב",
    area: "יפו ונווה צדק",
    specialty: "נכסים בוטיק",
    tags: ["בוטיק", "נווה צדק", "יפו"],
    dealTypes: ["sale", "rent"],
    rating: 4.9,
    reviews: 103,
    experience: 11,
    deals: 71,
    successRate: 96,
    initials: "שג",
    color: "from-amber-600 to-yellow-600",
    priceMin: 1800000,
    bio: "מתמחה בנכסים בוטיק ביפו ונווה צדק.",
    longBio: `שירה גולן היא מתווכת ייחודית המתמחה בנכסי בוטיק בשכונות המחפשות ביותר בתל אביב — נווה צדק, יפו ופלורנטין. עם עין אמנותית וידע אדריכלי, שירה מייצרת חיבורים בין לקוחות לנכסים בעלי אופי ייחודי.`,
    verified: true,
    phone: "050-777-8899",
    email: "shira@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "עומר לוי",
        date: "מרץ 2026",
        rating: 5,
        text: "שירה מצאה לנו דירה מדהימה בנווה צדק שלא הייתה מפורסמת. חד פעמית.",
        dealType: "sale",
      },
      {
        id: 2,
        author: "Maya Cohen",
        date: "ינואר 2026",
        rating: 5,
        text: "Shira has an incredible eye for unique properties. Found us the perfect Bauhaus apartment in Neve Tzedek.",
        dealType: "rent",
      },
    ],
    properties: [
      {
        id: 1,
        title: "דירת בוטיק בנווה צדק",
        city: "תל אביב",
        type: "דירה",
        price: 4800000,
        rooms: 3,
        sqm: 130,
        status: "active",
        gradient: "from-amber-700 to-yellow-600",
      },
      {
        id: 2,
        title: "לופט מעוצב ביפו",
        city: "יפו",
        type: "לופט",
        price: 3600000,
        rooms: 2,
        sqm: 100,
        status: "pending",
        gradient: "from-yellow-800 to-amber-700",
      },
    ],
  },
  {
    id: 8,
    name: "יוסף חדד",
    city: "באר שבע",
    area: "הנגב",
    specialty: "השקעות נדל\"ן",
    tags: ["השקעות", "נגב", "תשואה"],
    dealTypes: ["sale", "commercial"],
    rating: 4.4,
    reviews: 44,
    experience: 8,
    deals: 55,
    successRate: 89,
    initials: "יח",
    color: "from-yellow-700 to-amber-700",
    priceMin: 600000,
    bio: "מומחה להשקעות נדל\"ן בנגב.",
    longBio: `יוסף חדד הוא מתווך ויועץ השקעות נדל"ן המתמחה בשוק הנגב המתפתח. עם 8 שנות ניסיון ו-55 עסקאות מוצלחות, יוסף מציע ללקוחותיו הזדמנויות השקעה ייחודיות עם פוטנציאל תשואה גבוה.`,
    verified: false,
    phone: "053-888-9900",
    email: "yosef@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "בני דהן",
        date: "ינואר 2026",
        rating: 4,
        text: "יוסף הראה לי הזדמנויות השקעה מצוינות בבאר שבע. ידע מקצועי ותשואות טובות.",
        dealType: "sale",
      },
    ],
    properties: [
      {
        id: 1,
        title: "בניין דירות בבאר שבע",
        city: "באר שבע",
        type: "בניין",
        price: 8000000,
        rooms: 0,
        sqm: 1200,
        status: "active",
        gradient: "from-yellow-800 to-amber-700",
      },
    ],
  },
  {
    id: 9,
    name: "תמר כץ",
    city: "רעננה",
    area: "השרון הצפוני",
    specialty: "בתים ופנטהאוזים",
    tags: ["פנטהאוז", "בתים פרטיים", "השרון"],
    dealTypes: ["sale"],
    rating: 4.8,
    reviews: 67,
    experience: 13,
    deals: 48,
    successRate: 96,
    initials: "תכ",
    color: "from-amber-700 to-yellow-500",
    priceMin: 2200000,
    bio: "מומחית לנכסי יוקרה ברעננה.",
    longBio: `תמר כץ היא מתווכת בכירה המתמחה בנכסי יוקרה ברעננה והשרון הצפוני. עם ניסיון של 13 שנה, תמר בנתה מוניטין של אמינות ותוצאות מוכחות בשוק התחרותי.`,
    verified: true,
    phone: "052-999-0011",
    email: "tamar@nadlanist.co.il",
    reviewsList: [
      {
        id: 1,
        author: "ארז מלכה",
        date: "פברואר 2026",
        rating: 5,
        text: "תמר מצאה לנו בית חלומות ברעננה. מקצועית, נעימה ואמינה לחלוטין.",
        dealType: "sale",
      },
      {
        id: 2,
        author: "גלית שפר",
        date: "דצמבר 2025",
        rating: 5,
        text: "ידע מעמיק בשוק השרון. עזרה לנו למכור את הבית שלנו במחיר מעל הציפיות.",
        dealType: "sale",
      },
    ],
    properties: [
      {
        id: 1,
        title: "וילה יוקרה ברעננה",
        city: "רעננה",
        type: "וילה",
        price: 9200000,
        rooms: 6,
        sqm: 380,
        status: "active",
        gradient: "from-amber-800 to-yellow-600",
      },
      {
        id: 2,
        title: "פנטהאוז עם גג פרטי",
        city: "רעננה",
        type: "פנטהאוז",
        price: 6500000,
        rooms: 5,
        sqm: 250,
        status: "sold",
        gradient: "from-yellow-900 to-amber-800",
      },
    ],
  },
];

export function getAgentById(id: number): Agent | undefined {
  return ALL_AGENTS.find((a) => a.id === id);
}
