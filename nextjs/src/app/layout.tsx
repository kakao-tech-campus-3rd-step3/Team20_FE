import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./_providers/QueryProvider";
import { GlobalLayout } from "@/features/Header/ui/GlobalLayout";
import { KakaoScript } from "./_components/KakaoScript";
import { AuthProvider } from "./_providers/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K-SPOT - 한국 콘텐츠 촬영지 탐방 서비스",
  description: "K-드라마, K-영화, K-POP 촬영지를 탐방하고 여행 계획을 세워보세요",
  keywords: ["K-드라마", "K-영화", "K-POP", "촬영지", "여행", "한국"],
  authors: [{ name: "K-SPOT Team" }],
  openGraph: {
    title: "K-SPOT - 한국 콘텐츠 촬영지 탐방 서비스",
    description: "K-드라마, K-영화, K-POP 촬영지를 탐방하고 여행 계획을 세워보세요",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased`}>
        <KakaoScript />
        <QueryProvider>
          <AuthProvider>
            <GlobalLayout>
              {children}
            </GlobalLayout>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
