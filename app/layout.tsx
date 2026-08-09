import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const inter = localFont({
 variable: "--font-inter",
 src: [
 {
 path: "../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf",
 weight: "100 900",
 style: "normal",
 },
 {
 path: "../public/fonts/Inter/Inter-Italic-VariableFont_opsz,wght.ttf",
 weight: "100 900",
 style: "italic",
 },
 ],
});

const anton = localFont({
 variable: "--font-anton",
 src: "../public/fonts/Anton/Anton-Regular.ttf",
 weight: "400",
 style: "normal",
});

export const metadata: Metadata = {
 title: "Horror Movie Archive",
 description: "Private premium horror movie archive",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html
 lang="en"
 className={`dark ${inter.variable} ${anton.variable}`}
 data-visual-theme="horror-archive"
 suppressHydrationWarning
 >
 <body className="min-h-screen font-sans antialiased">
 <AppProviders>{children}</AppProviders>
 </body>
 </html>
 );
}
