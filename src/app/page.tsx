/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BrownFamilyLogo from "@/components/ui/BrownFamilyLogo";
import { fetchSeasonOverviewData, fetchWeeklyGlance } from "@/lib/api";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Animated golf-themed SVG background for homepage
const GolfBackground = () => (
  <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none animate-fade-in" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" style={{opacity:0.10}}>
    <defs>
      <linearGradient id="golfGradientHome" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#305D3C"/>
        <stop offset="100%" stopColor="#B2825E"/>
      </linearGradient>
    </defs>
    <ellipse cx="720" cy="320" rx="900" ry="120" fill="url(#golfGradientHome)" />
    <circle cx="200" cy="180" r="30" fill="#EDE6D6" stroke="#B2825E" strokeWidth="4"/>
    <rect x="1200" y="200" width="12" height="60" rx="4" fill="#B2825E"/>
    <polygon points="1206,200 1212,220 1200,220" fill="#EDE6D6"/>
  </svg>
);

export default async function Home() {
 try {
    const season_info = await fetchSeasonOverviewData();
    const weekly_glance = await fetchWeeklyGlance();

    let partners = 'N/A';
    let low_score = 'N/A';
    let greens = 'N/A';
    let skins = 'N/A';
    let best_ball = 'N/A';

    let weekly_greens: any[] = [];
    let weekly_partners: any[] = [];
    let weekly_skins: any[] = [];
    let weekly_best_ball: any[] = [];
    let weekly_low_score: any[] = [];

    if ((weekly_glance !== null || weekly_glance !== undefined) && weekly_glance.length > 1) {
      weekly_partners = weekly_glance.map((res: any) => {
        if (res.partners > 0) {
          return res.player_name + ' (' + parseFloat(res.partners).toLocaleString("en-US", { style: "currency", currency: "USD" }) + ')';
        };
      }).filter((player: string) => player !== undefined)
      if (weekly_partners.length > 0) {
        partners = weekly_partners.reduce((acc: string, val: string) => { if (acc.length > 0) { return (acc + ' / ' + val)}});
      } else {
        partners = 'N/A';
      }

      weekly_low_score = weekly_glance.map((res: any) => {
        if (res.low_score > 0) {
          return res.player_name + ' (' + parseFloat(res.low_score).toLocaleString("en-US", { style: "currency", currency: "USD" }) + ')';
        };
      }).filter((player: string) => player !== undefined);

      if (weekly_low_score.length > 0) {
        low_score = weekly_low_score.reduce((acc: string, val: string) => { if (acc.length > 0) { return (acc + ' / ' + val)}});
      } else {
        low_score = 'N/A';
      }
  
      weekly_greens = weekly_glance.map((res: any) => {
        if (res.greens > 0) {
          return res.player_name + ' (' + parseFloat(res.greens).toLocaleString("en-US", { style: "currency", currency: "USD" }) + ')';
        };
      }).filter((player: string) => player !== undefined);

      if (weekly_greens.length > 0) {
        greens = weekly_greens.reduce((acc: string, val: string) => { if (acc.length > 0) { return (acc + ' / ' + val)}});
      } else {
        greens = 'N/A';
      }
  
      weekly_skins = weekly_glance.map((res: any) => {
        if (res.skins > 0) {
          return res.player_name + ' (' + parseFloat(res.skins).toLocaleString("en-US", { style: "currency", currency: "USD" }) + ')';
        };
      }).filter((player: string) => player !== undefined);

      if (weekly_skins.length > 0) {
        skins = weekly_skins.reduce((acc: string, val: string) => { if (acc.length > 0) { return (acc + ' / ' + val)}});      
      } else {
        skins = 'N/A';
      }
  

      weekly_best_ball = weekly_glance.map((res: any) => {
        if (res.best_ball > 0) {
          return res.player_name + ' (' + parseFloat(res.best_ball).toLocaleString("en-US", { style: "currency", currency: "USD" }) + ')';
        };
      }).filter((player: string) => player !== undefined);

      if (weekly_best_ball.length > 0) {
        best_ball = weekly_best_ball.reduce((acc: string, val: string) => { if (acc.length > 0) { return (acc + ' / ' + val)}});
      } else {
        best_ball = 'N/A';
      }
    } 

   
    return (
      <div className="p-4 md:p-6 relative overflow-hidden">
        <GolfBackground />
        <main className="max-w-full mx-auto animate-fade-in relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#EDE6D6] mb-4 text-shadow-lg text-shadow-black">
              <BrownFamilyLogo />
            </h1>
            <div className="h-1 w-32 md:w-40 bg-[#EDE6D6] mx-auto rounded-full mb-6"></div>
            <p className="text-[#EDE6D6] text-sm md:text-base max-w-2xl mx-auto">
              Track scores, monitor progress, and compete with family members
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fade-in">
            {/* Players Card */}
            <Link href="/players" className="group">
              <div className="bg-[#292929] hover:bg-[#305D3C]/60 border border-[#B2825E] rounded-xl p-6 shadow shadow-black shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-[#305D3C] border-2 border-[#B2825E] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#305D3C]" fill="none" stroke="#EDE6D6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  </div>
                <h2 className="text-xl font-semibold text-[#EDE6D6] mb-2">Players</h2>
                <p className="text-sm text-[#EDE6D6]/80">View player profiles and statistics</p>
              </div>
            </Link>

            {/* Weekly Scores Card */}
            <Link href="/weekly_score" className="group">
              <div className="bg-[#292929] hover:bg-[#305D3C]/60 border border-[#B2825E] rounded-xl p-6 shadow shadow-black shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-[#305D3C] border-2 border-[#B2825E] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#305D3C]" fill="none" stroke="#EDE6D6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[#EDE6D6] mb-2">Weekly Scores / Winnings</h2>
                <p className="text-sm text-[#EDE6D6]/80">Track weekly performance / scores and View earnings / prize distributions</p>
              </div>
            </Link>

            {/* Gallery Card */}
            <Link href="/gallery" className="group">
              <div className="bg-[#292929] hover:bg-[#305D3C]/60 border border-[#B2825E] rounded-xl p-6 shadow shadow-black shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-[#305D3C] border-2 border-[#B2825E] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#305D3C]" fill="none" stroke="#EDE6D6" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-[#EDE6D6] mb-2">Gallery</h2>
                <p className="text-sm text-[#EDE6D6]/80">View some images of the golf course</p>
              </div>
            </Link>
          </div>

          {/* Quick Stats Section */}
          <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-6 md:p-8 mb-12 shadow shadow-black shadow-lg animate-fade-in">
            <h2 className="text-xl md:text-2xl font-semibold text-[#EDE6D6] mb-6 text-center">Season Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline mb-2">Total Players</p>
                <p className="text-2xl md:text-3xl font-bold text-[#EDE6D6]">{season_info.length > 0 ? season_info[0].total_players : 'N/A'}</p>
              </div>
              <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline mb-2">Weeks Played</p>
                <p className="text-2xl md:text-3xl font-bold text-[#EDE6D6]">{season_info.length > 0 ? season_info[0].weeks_played : 'N/A'}</p>
              </div>
              <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline mb-2">Total Rounds</p>
                <p className="text-2xl md:text-3xl font-bold text-[#EDE6D6]">{season_info.length > 0 ? season_info[0].rounds_played : 'N/A'}</p>
              </div>
              <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline mb-2">Season Pot</p>
                <p className="text-2xl md:text-3xl font-bold text-[#EDE6D6]">{season_info.length > 0 ? season_info[0].season_pot : 'N/A'}</p>
              </div>
            </div>
          </div>

          
          <Link href="/weekly_score" className="group">
            <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-6 md:p-8 shadow shadow-black shadow-lg animate-fade-in">
              <h2 className="text-xl md:text-2xl font-semibold text-[#EDE6D6] mb-6 text-center">Week At A Glance</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                  <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline mb-2">Partners</p>
                  <p className="text-2xl md:text-2xl font-bold text-[#EDE6D6]">
                    {partners}
                  </p>
                </div>
                <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                  <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline  mb-2">Low Score</p>
                  <p className="text-2xl md:text-2xl font-bold text-[#EDE6D6]">{low_score}</p>
                </div>
                <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                  <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline  mb-2">Greens</p>
                  <p className="text-2xl md:text-2xl font-bold text-[#EDE6D6]">{greens}</p>
                </div>
                <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                  <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline  mb-2">Skins</p>
                  <p className="text-2xl md:text-2xl font-bold text-[#EDE6D6]">{skins}</p>
                </div>
                <div className="text-center bg-[#305D3C] rounded-lg p-2 border border-[#B2825E]">
                  <p className="text-3xl text-[#EDE6D6]/80 mb-1 font-bold underline  mb-2">Best Ball</p>
                  <p className="text-2xl md:text-2xl font-bold text-[#EDE6D6]">{best_ball}</p>
                </div>
              </div>
            </div>
          </Link>
        </main>
    </div>
  );
  } catch (error) {
    <div className="p-4 md:p-6 relative overflow-hidden">
      <h1>Error loading home page</h1>
    </div>
  }
}
