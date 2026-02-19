import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Vroff – Det nya mänskligare sättet att samarbeta",
  description: "Vroff är det nya mänskligare sättet att samarbeta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body className={`${quicksand.variable} font-[family-name:var(--font-quicksand)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
