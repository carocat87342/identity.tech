import React, { useEffect, useState } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import { Athena } from "../../athena";

Chart.register(ArcElement);

export const chartColors = [
  "#86cbf3",
  "#2d64ad",
  "#60ca3c",
  "#666699",
  "#CC9933",
  "#006666",
  "#3399FF",
  "#993300",
  "#CCCC99",
  "#666666",
  "#FFCC66",
  "#6699CC",
  "#663366",
  "#9999CC",
  "#CCCCCC",
  "#669999",
  "#CCCC66",
  "#CC6600",
  "#9999FF",
  "#0066CC",
  "#99CCCC",
  "#999999",
  "#FFCC00",
  "#009999",
  "#99CC33",
  "#FF9900",
  "#999966",
  "#66CCCC",
  "#339966",
  "#CCCC33",
  "#003f5c",
  "#665191",
  "#a05195",
  "#d45087",
  "#2f4b7c",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#EF6F6C",
  "#465775",
  "#56E39F",
  "#59C9A5",
  "#5B6C5D",
  "#0A2342",
  "#2CA58D",
  "#84BC9C",
  "#CBA328",
  "#F46197",
  "#DBCFB0",
  "#545775"
];

export function PieChart() {
  let chartInstance = null;

  const [merchants, setMerchants] = useState([]);
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    let query= `select merchant_desc as merchant, sum(amount) as totals  from view_mock_transactions  where category = 'Peer-to-Peer'  group by merchant_desc  order by sum(amount) desc  limit 10`;
    const line_array =[];
    const totalLine_array = [];
    const result_array = Athena(query);
    result_array.then((result) => {
      const keys = Object.keys(result[0])
      result.map((line)=>{
        line_array.push(line[keys[0]]);
        totalLine_array.push(parseFloat(line[keys[1]]));
      });
      setMerchants([...line_array]);
      setTotals([...totalLine_array]);
    })
  }, []);

  const pieOptions = {
    legend: {
      position: "left"
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };
  const data = {
    maintainAspectRatio: true,
    responsive: true,
    labels: merchants,
    datasets: [
      {
        data: totals,
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  };

  return (
      <div>
        <Pie data={data} options={pieOptions} />
      </div>
  );
}