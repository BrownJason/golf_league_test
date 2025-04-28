/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);
Chart.defaults.set("plugins.datalabels", {
  color: "#000000",
});

const PieChart = ({ values, formattedWinnings }: { values: any; player: any; weeks_played: any; avg_score: any; formattedWinnings: string[] }) => {
  const greens = values.map((res: { greens: number }) => res.greens);
  const skins = values.map((res: { skins: number }) => res.skins);
  const partners = values.map((res: { partners: number }) => res.partners);
  const best_ball = values.map((res: { best_ball: number }) => res.best_ball);
  const low_score = values.map((res: { low_score: number }) => res.low_score);
  const data = {
    labels: ["Greens", "Skins", "Partners", "Best Ball", "Low Score"],
    datasets: [
      {
        label: "Total Winnings",
        data: [greens, skins, partners, best_ball, low_score],
        backgroundColor: ["#1a1c3e", "#3e1a2e", "#3e3c1a", "#3d060f", "#645b48"],
        datalabels: {
          color: "#9A9540",
          font: {
            size: 24,
          },
          textStrokeWidth: 0,
          textShadowBlur: 20,
          textShadowColor: "#000000",
        },
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false
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
      },
    },
  };

  return (
    <div className="flex-col">
      <Bar data={data} options={options} />
      <span className="flex text-center w-full justify-center text-lg">
        <em>Winnings: {formattedWinnings[0]}</em>
      </span>
    </div>
  );
};

export default PieChart;
