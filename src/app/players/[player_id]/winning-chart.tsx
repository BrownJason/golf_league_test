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

const WinningsPieChart = ({ values, formattedWinnings }: { values: any; player: any; weeks_played: any; avg_score: any; formattedWinnings: string[] }) => {
  const greens = values.map((res: { greens: number }) => res.greens).reduce((res: any, value: number) => {
    return res + value
  }, 0);
  const skins = values.map((res: { skins: number }) => res.skins).reduce((res: any, value: number) => {
    return res + value
  }, 0);
  const partners = values.map((res: { partners: number }) => res.partners).reduce((res: any, value: number) => {
    return res + value
  }, 0);
  const best_ball = values.map((res: { best_ball: number }) => res.best_ball).reduce((res: any, value: number) => {
    return res + value
  }, 0);
  const low_score = values.map((res: { low_score: number }) => res.low_score).reduce((res: any, value: number) => {
    return res + value
  }, 0);
  const data = {
    labels: ["Greens", "Skins", "Partners", "Best Ball", "Low Score"],
    datasets: [
      {
        label: "Total Winnings",
        data: [greens, skins, partners, best_ball, low_score],
        backgroundColor: ["#1a1c3e", "#3e1a2e", "#3e3c1a", "#3d060f", "#645b48"],
        datalabels: {
          color: "#EDE6D6",
          font: {
            size: 18,
          },
          formatter: (value: number) => {
            // Ensure value is a number before formatting
            const num = typeof value === 'number' ? value : Number(value);
            if (isNaN(num)) return '';
            // Format as USD currency, remove leading zero for numbers between -1 and 1
            const formatted = num.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2
            });
            return formatted.replace(/^(-?)\$0\./, '$1$.');
          }
        },
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#EDE6D6",
        },
      },
      datalabels: {
        color: "#EDE6D6",
      },
    },
  };

  return (
    <div className="flex-col w-full flex items-center justify-center">
      <div style={{ maxWidth: 400, maxHeight: 300, width: '100%', height: '300px' }}>
        <Pie data={data} options={options} />
      </div>
      <span className="flex text-center w-full justify-center text-lg">
        <em>Winnings: {formattedWinnings[0]}</em>
      </span>
    </div>
  );
};

export default WinningsPieChart;
