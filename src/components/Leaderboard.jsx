/* eslint-disable react/prop-types */
import { useState } from "react";
import clsx from "clsx";
import leaderboardData from "../assets/static-data/leaderboard.json";

function RenderLeaderboard({ week, index }) {
  const [expanded, setExpanded] = useState(false);

  const toggaleCollapse = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <div key={index} className={clsx("flex border border-black bg-gray-200 dark:bg-[#3c505c] rounded-t-lg", expanded ? "rounded-t-lg" : "rounded-lg")}>
        <div className="justify-start w-128 grow indent-4 text-white text-3xl ">Week of {week.week}</div>
        <button className={clsx("flex-none border border-black rounded-l-lg bg-[#6c844c] text-[#f9e6bf]  w-32", expanded ? "rounded-t-lg" : "rounded-lg")} onClick={toggaleCollapse}>
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>
      <table className={clsx("border border-black bg-gray-200 text-center table-auto w-full ", expanded ? " mb-4" : "hidden")}>
        <tbody>
          <tr>
            <th className=" text-black h-16 border">Player</th>
            <th className=" text-black h-16 border">Score</th>
            <th className=" text-black h-16 border">Total</th>
            <th className=" text-black h-16 border">Thru</th>
            <th className=" text-black h-16 border">Round</th>
          </tr>
          {week.scores
            .sort((a, b) => a.score - b.score)
            .map((score) => (
              <tr key={score.player}>
                <td className="text-black h-16 border rounded-b-lg">{score.player}</td>
                <td className=" text-black h-16 border rounded-b-lg">{score.score}</td>
                <td className=" text-black h-16 border rounded-b-lg">{score.stroke_behind !== 0 ? "+" + score.stroke_behind : "E"}</td>
                <td className=" text-black h-16 border rounded-b-lg">{score.side}</td>
                <td className={clsx("h-16 border border-black rounded-b-lg", score.behind_par === 0 ? "text-green-500" : score.behind_par < 0 ? "text-red-500" : "text-black")}>{score.behind_par}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

function Leaderboard() {
  const data = leaderboardData.weeks.sort((a, b) => new Date(b.week) - new Date(a.week));

  return (
    <div className="grid bg-none m-32mx-auto p-8">
      <div className={clsx("flex border border-black bg-white text-center dark:bg-[#3c505c] text-white text-3xl table-auto w-full indent-4 rounded-lg", data === undefined ? "hidden" : "")}>Leaderboard</div>
      {data.map((week, i) => (
        <RenderLeaderboard week={week} key={week.week + "_main"} index={i} />
      ))}
    </div>
  );
}

export default Leaderboard;
