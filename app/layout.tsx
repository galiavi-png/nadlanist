import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AuthProvider } from "@/app/context/AuthContext";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "נדלניסט | מרקטפלייס מתווכי נדל\"ן בישראל",
  description: "מצאו את המתווך המושלם עבורכם. פלטפורמת הנדל\"ן המובילה בישראל.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
