import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[5%_1fr_5%] items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start contianer md:m-0 m-4 ">
        <h1 className="border border-[#9A9540] rounded-xl shadow-xl p-4 text-center w-full text-[#9A9540] bg-[#1A3E2A]">Welcome to Brown Family Golf</h1>
        <div className="border border-[#9A9540] rounded-xl shadow-xl p-4 text-wrap md:w-128 text-[#9A9540] bg-[#1A3E2A]">
          To view the weekly winnings, go to the{" "}
          <Link href="/weekly_score" className="text-lg italic underline hover:text-black">
            Weekly Scores
          </Link>{" "}
          page.
          <br />
          <br />
          For a list of Players and to also view your weekly scores / winnings, click the Players link in the Navigation bar or{" "}
          <Link href="/players" className="text-lg italic underline hover:text-black">
            Players Info
          </Link>{" "}
          page.
          <br />
          <br />
          Weekly jackpots are $5 per person. <br />
          We play every Friday starting @ 6:00 p.m. through-out the summer at Green Oaks.
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
      </main>
    </div>
  );
}
