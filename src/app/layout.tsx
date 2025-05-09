import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./navbar";
import Link from "next/link";
import { ThemeProvider } from "./theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}>
        <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <div className="flex flex-col min-h-dvh text-[var(--text)] border-[var(--text)] ">
            <header className="sticky top-0 z-50 w-full border-b border-[var(--text)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
              <NavBar />
            </header>
            
            <main className="flex-grow bg-cover bg-center bg-fixed">
              {children}
            </main>

            <footer className="bg-[var(--card))] border-t border-[var(--text)]">
              <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Brand Section */}
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-3">
                      <Link href="/">Brown Family Golf</Link></h3>
                    <p className="text-sm text-[var(--text)]/80">
                      Bringing family together through the love of golf
                    </p>
                  </div>

                  {/* Quick Links */}
                  <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link href="/players" className="text-sm text-[var(--text)]/80 hover:text-[var(--text)] transitions">
                          Players
                        </Link>
                      </li>
                      <li>
                        <Link href="/weekly_score" className="text-sm text-[var(--text)]/80 hover:text-[var(--text)] transitions">
                          Weekly Scores
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Credits Section */}
                  <div className="text-center md:text-right">
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Credits</h3>
                    <div className="text-sm text-[var(--text)]/80">
                      <p>© 2025 Brown Family Golf League</p>
                      <p className="mt-1">
                        Icons by{" "}
                        <a 
                          href="https://icons8.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[var(--text)] hover:text-[var(--text)]/80 transitions"
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
        </ThemeProvider>
      </body>
    </html>
  );
}
