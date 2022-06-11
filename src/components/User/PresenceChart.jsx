import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

function PresenceChart({ presenceData }) {
  const [percentage, setPercentage] = useState();
  const data = {
    labels: ["Hadir", "Terlambat", "Tidak Hadir"],
    datasets: [
      {
        labels: "Persentase Kehadiran",
        data: [
          presenceData?.present,
          presenceData?.latePresent,
          presenceData?.notPresent,
        ],
        backgroundColor: ["#66BB6A", "#FFB74D", "#E57373"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    setPercentage(
      `${parseInt(
        (presenceData?.present /
          (presenceData?.present +
            presenceData?.latePresent +
            presenceData?.notPresent)) *
          100
      )}%`
    );
  }, [presenceData]);

  return (
    <div className="ml-4 w-6/12">
      <div className="relative flex justify-center items-center">
        <Doughnut className="hover:z-10"
          data={data}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
        />
        <div className="absolute font-bold text-[#66BB6A] text-5xl z-0">
          {percentage}
        </div>
      </div>
      <div className="text-2xl mt-4">Persentase Kehadiran</div>
      <div className="flex items-center space-x-2 mt-2">
        <div className="bg-[#66BB6A] w-4 h-4"></div>
        <div>Hadir</div>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <div className="bg-[#FFB74D] w-4 h-4"></div>
        <div>Terlambat</div>
      </div>
      <div className="flex items-center space-x-2 mt-2">
        <div className="bg-[#E57373] w-4 h-4"></div>
        <div>Tidak Hadir</div>
      </div>
    </div>
  );
}

export default PresenceChart;
