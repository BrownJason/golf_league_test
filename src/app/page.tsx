import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[5%_1fr_5%] items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start contianer md:m-0 m-4 ">
        <h1 className="border border-[#f9e6bf] rounded-xl shadow-xl p-4 text-center w-full text-[#f9e6bf] bg-[#6c844c]">Welcome to Brown Family Golf</h1>
        <div className="border border-[#f9e6bf] rounded-xl shadow-xl p-4 text-wrap md:w-128 text-[#f9e6bf] bg-[#6c844c]">
          To view the weekly winnings, go to the{" "}
          <Link href="/weekly_score" className="text-lg italic">
            Weekly Scores
          </Link>{" "}
          page.
          <br />
          <br />
          For a list of Players and to also view your weekly scores / winnings, click the Players link in the Navigation bar or{" "}
          <Link href="/players" className="text-lg italic">
            Players Info
          </Link>{" "}
          page.
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
      </main>
    </div>
  );
}
