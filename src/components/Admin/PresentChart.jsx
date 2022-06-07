import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from 'react-chartjs-2';

function PresentChart({absensi}) {
    
    const [presensi, setPresensi] = useState([0, 0, 0, 0, 0, 0, 0]);

    useEffect(() => {
        const now = Date.now();

        const arr = [0, 0, 0, 0, 0, 0, 0];

        absensi.map(item => {
            const id = Math.floor((now - Date.parse(item.time)) / (1000 * 3600 * 24));
            if (id <= 7) {
                arr[id]++
            }
        });
        setPresensi(arr);
    }, [])

    const data = {
        labels: ['Hari ini', 'h+1', 'h+2', 'h+3', 'h+4', 'h+5', 'h+6'],
        datasets: [
            {
                data: presensi,
                backgroundColor: [
                    'rgba(74, 182, 255, 0.2)',
                    'rgba(0, 255, 127, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            }
        ]
    }

    return (
        <React.Fragment>
            <Bar data={data} options={{responsive: true, plugins: { title: { display: true, text: "Absensi Per Hari" }}}} />
        </React.Fragment>
    )
}

export default PresentChart;