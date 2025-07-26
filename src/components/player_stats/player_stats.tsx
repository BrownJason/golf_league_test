"use client";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import PieChart from "../../app/players/[player_id]/winning-chart";

Chart.register(...registerables);

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PlayerStats({ playerScores, par3, par4, par5, peers, player_name, playerWinnings, avgScore, player, weeksPlayed, formattedWinnings }: 
  { playerScores: any[]; par3: number; par4: number; par5: number; peers: any[]; player_name: string,  playerWinnings: any, avgScore: number, player: any, weeksPlayed: number, formattedWinnings: string[] }) {
    const sortedScores = [...playerScores].sort(
      (a, b) => new Date(a.week_date).getTime() - new Date(b.week_date).getTime()
    );

    const trendData = {
      labels: sortedScores.map((score) => score.week_date.split("T")[0]),
      datasets: [
        {
          label: "Scores",
          data: sortedScores.map((score) => score.score),
          borderColor: "#EDE6D6",
          fill: false,
        },
      ],
    };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#EDE6D6",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#EDE6D6", // Change this to your desired color for the X-axis labels
        },
      },
      y: {
        ticks: {
          color: "#EDE6D6", // Change this to your desired color for the Y-axis labels
        },
      },
    },
  };

  const peerNames = peers.map((peer) => (peer.player_name)).filter(Boolean);
  const peerScores = peers.map((peer) => (peer.average_score)).filter(Boolean);
  const comparisonData = {
    labels: peerNames,
    datasets: [
      {
        label: "Peer Average Scores",
        data: peerScores,
        backgroundColor: peerNames.map((name) => name === player_name ? "#ff0f0fff" : "#1392a8ff"), // Highlight player's own score
      },
    ],
  };

  const bar_options = {
    plugins: {
      legend: {
        labels: {
          color: "#EDE6D6",
        },
      },
      datalabels: {
        color: "#000000",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#EDE6D6", // Change this to your desired color for the X-axis labels
        },
      },
      y: {
        ticks: {
          color: "#EDE6D6", // Change this to your desired color for the Y-axis labels,
        },
        beginAtZero: true, // Ensure the Y-axis starts at 0
        min: 0, // Set minimum value for Y-axis
        max: 75, // Set maximum value for Y-axis
      },
    },
  };

  return (
    <div className="mt-6 md:mt-8 bg-[#292929] p-4 md:p-6 rounded-xl border border-[#EDE6D6]">
      <h2 className="text-xl md:text-2xl font-bold text-[#EDE6D6] mb-6">Performance Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2">Best Score</h3>
          <p className="text-xl md:text-2xl text-[#EDE6D6]">{Math.min(...playerScores.map((score) => score.score))}</p>
        </div>
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2">Worst Score</h3>
          <p className="text-xl md:text-2xl text-[#EDE6D6]">{Math.max(...playerScores.map((score) => score.score))}</p>
        </div>
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2">Average Score</h3>
          <p className="text-xl md:text-2xl text-[#EDE6D6]">{(playerScores.reduce((acc, score) => acc + score.score, 0) / playerScores.length).toFixed(2)}</p>  
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2">Recent Trend</h3>
          <p className="text-xl md:text-2xl text-[#EDE6D6]">{calculateTrend(playerScores)}</p>
        </div>
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2">Consistency</h3>
          <p className="text-xl md:text-2xl text-[#EDE6D6]">{calculateConsistency(playerScores)}%</p>
        </div>
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2">Performance by Hole Type</h3>
          <p className="text-xl md:text-2xl text-[#EDE6D6] flex flex-col gap-2">
            <span>Par 3: {par3}</span>
            <span>Par 4: {par4}</span>
            <span>Par 5: {par5}</span>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2 text-center">Score History</h3>
          <Line data={trendData} options={options} />
        </div>
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2 text-center">Peer Comparison</h3>
          <Bar data={comparisonData} options={bar_options} />
        </div>
        <div className="text-center bg-[#305D3C] p-3 rounded-lg border border-[#EDE6D6] shadow shadow-lg shadow-black">
          <h3 className="text-[#EDE6D6] text-sm md:text-base mb-2 text-center">Winnings Breakdown</h3>
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
