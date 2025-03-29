import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./navbar";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative bg-[#1A3E2A]`}>
        <div className="flex flex-col min-h-dvh text-[#9A9540] border-[#9A9540] bg-gray-400 bg-[url(/golf_bg_image.jpg)] bg-cover bg-center bg-blend-multiply bg-fixed">
          <header className="flex flex-row gap-6 flex-wrap justify-end pt-2 pr-6 fixed sticky top-0 border-b rounded-b-lg pb-2 z-1000 scroll:h-8 text-[#9A9540] bg-[#1A3E2A] border-[#9A9540] ">
            <NavBar />
          </header>
          <div className="flex-grow dark my--10  border-[#9A9540]">{children}</div>
          <footer className="row-start-3 fixed flex gap-6 md:flex-col items-center justify-center fixed sticky bottom-0 p-2 rounded-t-lg text-[#9A9540] bg-[#1A3E2A] border-t border-[#9A9540] md:h-12">
            <ul className="flex md:flex-row flex-col">
              <li className="none md:pr-4 ">&#9400; 2025 Brown Family Golf League</li>
              <li className="none">
                Icons by{" "}
                <a target="_blank" href="https://icons8.com">
                  Icons8
                </a>
              </li>
            </ul>
          </footer>
        </div>
      </body>
    </html>
  );
}
