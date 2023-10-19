import React, { useEffect, useState } from "react";
import { Athena } from "../../athena";
import { Doughnut, Pie } from "react-chartjs-2";

export const chartColors = [
  "#408ef7",
  "#142898",
  "#d67245",
  "#611577",
  "#ce52a4",
  "#6d53bb",
  "#d3b33c",
  "#c55054",
  "#387077",
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

export function DoughnutChart() {
  let chartInstance = null;

  const [categories, setCategories] = useState([]);
  const [totals, setTotals] = useState([]);
  useEffect(() => {
    let query= `select category as category, sum(amount) as totals	from view_mock_transactions	group by category	order by sum(amount) desc	limit 10`;
    const line_array =[];
    const totalLine_array = [];
    const result_array = Athena(query);
    result_array.then((result) => {
      const keys = Object.keys(result[0])
      result.map((line)=>{
        line_array.push(line[keys[0]]);
        totalLine_array.push(parseFloat(line[keys[1]]));
      });
      setCategories([...line_array]);
      setTotals([...totalLine_array]);
    })
  }, [])

  const data = {
    maintainAspectRatio: true,
    responsive: true,
    labels: categories,
    datasets: [
      {
        data: totals,
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  };

  const options = {
    legend: {
      display: true,
      position: "right"
    },
    elements: {
      // arc: {
      //   borderWidth: 0
      // }
    }
  };

  return (
      <div>
        <div>
          <Pie
            data={data}
            options={options}
            ref={input => {
              chartInstance = input;
            }}
          />
        </div>
      </div>
  );
}