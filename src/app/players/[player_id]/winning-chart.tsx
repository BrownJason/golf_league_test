/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ values }: { values: any }) => {
  const greens = values.map((res: { greens: number }) => res.greens).reduce((acc: number, cval: number) => acc + cval, 0);
  const skins = values.map((res: { skins: number }) => res.skins).reduce((acc: number, cval: number) => acc + cval, 0);
  const partners = values.map((res: { partners: number }) => res.partners).reduce((acc: number, cval: number) => acc + cval, 0);
  const winnings = skins + greens + partners;
  const formattedWinnings = winnings.toLocaleString("en-US", { style: "currency", currency: "USD" });
  const data = {
    labels: ["Greens", "Skins", "Partners"],
    datasets: [
      {
        label: "Total Winnings",
        data: [greens, skins, partners],
        backgroundColor: ["#1a1c3e", "#3e1a2e", "#3e3c1a"],
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
