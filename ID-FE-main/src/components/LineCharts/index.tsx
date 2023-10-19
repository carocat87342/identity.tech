import React, { useEffect, useState } from "react";
import { Athena } from "../../athena";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineCharts() {
    const [merchants, setMerchants] = useState([]);
    const [totals, setTotals] = useState([]);
    useEffect(() => {
      let query= `select date, sum(amount) as amount
                  from identify.view_mock_transactions
                  group by date`;
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

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart',
        },
      },
    };
      
    const labels = merchants;
    const faker = totals;
    const data = {
      labels,
      datasets: [
        {
          label: 'amount by Date',
          data: labels.map((index) => faker[labels.indexOf(index)]),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
    return <Line options={options} data={data} />;
}
