export default function Page() {
  return (
    <div className="grid grid-rows-[5%_1fr_5%] items-center justify-items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        <div className="mx-auto py-10 items-center">
          <div className="text-[#9A9540]">
            <div className="flex flex-row text-xl border border-[#9A9540] p-4 rounded-xl shadow-lg shadow-black bg-[#1A3E2A] mx-auto justify-center">Statistics Page</div>
          </div>
        </div>

        <div
          className="lg:grid lg:grid-flow-col lg:grid-rows-3 flex flex-col mx-auto py-10 justify-start text-xl border border-[#9A9540] p-4 rounded-xl shadow-lg shadow-black bg-[#1A3E2A] 
        "
          title="Player name and in parathesis the winnings / score"
        >
          <div className="mx-auto py-10 items-center text-xl p-4">Most Low Scores: PJ (6)</div>
          <div className="mx-auto py-10 items-center text-xl p-4">Lowest Avgerage: PJ (36)</div>
          <div className="mx-auto py-10 items-center text-xl p-4">Lowest Score: </div>
          <div className="mx-auto py-10 items-center text-xl p-4">Lowest Handicap: </div>
          <div className="mx-auto py-10 items-center text-xl p-4">Highest Handicap: </div>
          <div className="mx-auto py-10 items-center text-xl p-4">Most Best Balls: </div>
          <div className="mx-auto py-10 items-center text-xl p-4">Most Greens: </div>
          <div className="mx-auto py-10 items-center text-xl p-4">Most Weeks Player: </div>
          <div className="mx-auto py-10 items-center text-xl p-4">Highest Amount Won:</div>
          <div className="mx-auto py-10 items-center text-xl p-4">Most Winnings:</div>
        </div>
      </main>
    </div>
  );
}
