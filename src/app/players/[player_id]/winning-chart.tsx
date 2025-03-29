/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);
Chart.defaults.set("plugins.datalabels", {
  color: "#000000",
});

const PieChart = ({ values }: { values: any }) => {
  const greens = values.map((res: { greens: number }) => res.greens);
  const skins = values.map((res: { skins: number }) => res.skins);
  const partners = values.map((res: { partners: number }) => res.partners);
  const best_ball = values.map((res: { best_ball: number }) => res.best_ball);
  const low_score = values.map((res: { low_score: number }) => res.low_score);
  const winnings = parseInt(low_score) + parseInt(best_ball) + parseInt(partners) + parseInt(skins) + parseInt(greens);
  console.log(winnings);
  const formattedWinnings = winnings.toLocaleString("en-US", { style: "currency", currency: "USD" });
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
        labels: {
          color: "#9A9540",
        },
      },
      datalabels: {
        color: "#36A2EB",
      },
    },
  };

  return (
    <div className="flex flex-col justify-start rounded-lg text-[#9A9540] p-4 m-4 bg-[#1A3E2A] md:w-96 border border-[#9A9540] shadow-lg shadow-black">
      <h1 className="flex text-center w-full justify-center text-lg">Total Winnings</h1>
      <Pie data={data} options={options} />
      <span className="flex text-center w-full justify-center text-lg">
        <em>Winnings: {formattedWinnings}</em>
      </span>
    </div>
  );
};

export default PieChart;
