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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}>
        <div className="flex flex-col min-h-dvh text-[#f9e6bf] border-[#f9e6bf] bg-[url(/golf_bg_image.jpg)] bg-cover bg-center">
          <header className="flex flex-row gap-6 flex-wrap justify-end pt-6 pr-6 fixed sticky top-0 border-b rounded-b-lg pb-6 z-1000 scroll:h-8 text-[#f9e6bf] bg-[#6c844c] border-[#f9e6bf]">
            <NavBar />
          </header>
          <div className="flex-grow dark my--10  border-[#f9e6bf]">{children}</div>
          <footer className="row-start-3 fixed flex gap-6 md:flex-col items-center justify-center fixed sticky bottom-0 p-8 rounded-t-lg text-[#f9e6bf] bg-[#6c844c] border-t border-[#f9e6bf]">
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
