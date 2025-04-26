import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./navbar";
import { Providers } from "./providers";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brown Family Golf",
  description: "Generated using NextJS, utilizing Shadcn and TailwindCSS for better UI/UX design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}>
        <Providers>
          <div className="flex flex-col min-h-dvh text-[#9A9540] border-[#9A9540] ">
            <header className="sticky top-0 z-50 w-full border-b border-[#9A9540] bg-[#1A3E2A]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1A3E2A]/80">
              <NavBar />
            </header>
            
            <main className="flex-grow dark border-[#9A9540] bg-[url(/uploads/golf_bg_image.jpg)] bg-cover bg-center bg-fixed">
              {children}
            </main>

            <footer className="bg-[#1A3E2A] border-t border-[#9A9540]">
              <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Brand Section */}
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-[#9A9540] mb-3">
                      <Link href="/">Brown Family Golf</Link></h3>
                    <p className="text-sm text-[#9A9540]/80">
                      Bringing family together through the love of golf
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-[#9A9540] mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/players" className="text-sm text-[#9A9540]/80 hover:text-[#9A9540] transition-colors">
                          Players
                        </Link>
                      </li>
                      <li>
                        <Link href="/weekly_score" className="text-sm text-[#9A9540]/80 hover:text-[#9A9540] transition-colors">
                          Weekly Scores
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Credits Section */}
                  <div className="text-center md:text-right">
                    <h3 className="text-lg font-semibold text-[#9A9540] mb-3">Credits</h3>
                    <div className="text-sm text-[#9A9540]/80">
                      <p>© 2025 Brown Family Golf League</p>
                      <p className="mt-1">
                        Icons by{" "}
                        <a 
                          href="https://icons8.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#9A9540] hover:text-[#9A9540]/80 transition-colors"
                        >
                          Icons8
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
