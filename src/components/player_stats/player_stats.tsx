"use client";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import PieChart from "../../app/players/[player_id]/winning-chart";
import { WeeklyScore } from "@/app/weekly_score/score-columns";

Chart.register(...registerables);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PlayerStats({ playerScores, par3, par4, par5, peers, player_name, playerWinnings, avgScore, player, weeksPlayed, formattedWinnings }: 
  { playerScores: any[]; par3: number; par4: number; par5: number; peers: any[]; player_name: string,  playerWinnings: any, avgScore: number, player: any, weeksPlayed: number, formattedWinnings: string[] }) {
  const trendData = {
    labels: playerScores.map((score) => score.week_date.split("T")[0]).sort(),
    datasets: [
      {
        label: "Scores",
        data: playerScores.map((score) => score.score),
        borderColor: "#9A9540",
        fill: false,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#9A9540",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9A9540", // Change this to your desired color for the X-axis labels
        },
      },
      y: {
        ticks: {
          color: "#9A9540", // Change this to your desired color for the Y-axis labels
        },
      },
    },
  };

  const peerNames = peers.map((peer) => (peer.player_name !== player_name ? peer.player_name : null)).filter(Boolean);
  const peerScores = peers.map((peer) => (peer.player_name !== player_name ? peer.average_score : null)).filter(Boolean);
  const comparisonData = {
    labels: peerNames,
    datasets: [
      {
        label: "Peer Average Scores",
        data: peerScores,
        backgroundColor: "#4A90E2",
      },
      {
        label: "Your Score",
        data: peers.map(() => playerScores.map((score) => score).reduce((acc: any, val: WeeklyScore) => 
          acc + val.score, 0) / playerScores.length),
        backgroundColor: "#E74C3C",
      },
    ],
  };

  const bar_options = {
    plugins: {
      legend: {
        labels: {
          color: "#9A9540",
        },
      },
      datalabels: {
        color: "#000000",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#9A9540", // Change this to your desired color for the X-axis labels
        },
      },
      y: {
        ticks: {
          color: "#9A9540", // Change this to your desired color for the Y-axis labels,
        },
        beginAtZero: true, // Ensure the Y-axis starts at 0
        min: 0, // Set minimum value for Y-axis
        max: 75, // Set maximum value for Y-axis
      },
    },
  };

  return (
    <div className="mt-6 md:mt-8 bg-[#243E2A] p-4 md:p-6 rounded-xl border border-[#9A9540]">
      <h2 className="text-xl md:text-2xl font-bold text-[#9A9540] mb-6">Performance Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="text-center bg-[#1A3E2A] p-3 rounded-lg border border-[#9A9540] shadow shadow-lg shadow-black">
          <h3 className="text-[#9A9540] text-sm md:text-base mb-2">Best Score</h3>
          <p className="text-xl md:text-2xl text-white">{Math.min(...playerScores.map((score) => score.score))}</p>
        </div>
        <div className="text-center bg-[#1A3E2A] p-3 rounded-lg border border-[#9A9540] shadow shadow-lg shadow-black">
          <h3 className="text-[#9A9540] text-sm md:text-base mb-2">Worst Score</h3>
          <p className="text-xl md:text-2xl text-white">{Math.max(...playerScores.map((score) => score.score))}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="text-center bg-[#1A3E2A] p-3 rounded-lg border border-[#9A9540] shadow shadow-lg shadow-black">
          <h3 className="text-[#9A9540] text-sm md:text-base mb-2">Recent Trend</h3>
          <p className="text-xl md:text-2xl text-white">{calculateTrend(playerScores)}</p>
        </div>
        <div className="text-center bg-[#1A3E2A] p-3 rounded-lg border border-[#9A9540] shadow shadow-lg shadow-black">
          <h3 className="text-[#9A9540] text-sm md:text-base mb-2">Consistency</h3>
          <p className="text-xl md:text-2xl text-white">{calculateConsistency(playerScores)}%</p>
        </div>
        <div className="text-center bg-[#1A3E2A] p-3 rounded-lg border border-[#9A9540] shadow shadow-lg shadow-black">
          <h3 className="text-[#9A9540] text-sm md:text-base mb-2">Performance by Hole Type</h3>
          <p className="text-xl md:text-2xl text-white flex flex-col gap-2">
            <span>Par 3: {par3}</span>
            <span>Par 4: {par4}</span>
            <span>Par 5: {par5}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="text-center bg-[#1A3E2A] p-3 rounded-lg border border-[#9A9540] shadow shadow-lg shadow-black">
          <h3 className="text-[#9A9540] text-sm md:text-base mb-2 text-center">Score History</h3>
          <Line data={trendData} options={options} />
        </div>
        <div className="text-center bg-[#1A3E2A] p-3 rounded-lg border border-[#9A9540] shadow shadow-lg shadow-black">
          <h3 className="text-[#9A9540] text-sm md:text-base mb-2 text-center">Peer Comparison</h3>
          <Bar data={comparisonData} options={bar_options} />
        </div>
        <div className="text-center bg-[#1A3E2A] p-3 rounded-lg border border-[#9A9540] shadow shadow-lg shadow-black">
          <h3 className="text-[#9A9540] text-sm md:text-base mb-2 text-center">Winnings Breakdown</h3>
          <PieChart 
                    values={playerWinnings} 
                    avg_score={avgScore} 
                    player={player} 
                    weeks_played={weeksPlayed} 
                    formattedWinnings={formattedWinnings} 
                  />
        </div>
      </div>
    </div>
  );
}

// Helper functions for performance calculations
function calculateTrend(scores: { score: number }[]) {
  if (scores.length < 2) return "N/A";
  const recent = scores.slice(0, 3).map((s) => s.score);
  const avg = recent.reduce((a: number, b: number) => a + b, 0) / recent.length;
  const overall = scores.map((s) => s.score).reduce((a: number, b: number) => a + b, 0) / scores.length;
  return avg < overall ? "↑ Improving" : avg > overall ? "↓ Declining" : "→ Steady";
}

function calculateConsistency(scores: { score: number }[]) {
  if (scores.length < 2) return "N/A";
  const scoreValues = scores.map((s) => s.score);
  const mean = scoreValues.reduce((a: number, b: number) => a + b, 0) / scoreValues.length;
  const variance = scoreValues.reduce((a: number, b: number) => a + Math.pow(b - mean, 2), 0) / scoreValues.length;
  const stdDev = Math.sqrt(variance);
  // Convert to a percentage where lower variation = higher consistency
  const consistency = Math.max(0, 100 - stdDev * 10);
  return Math.round(consistency);
}
