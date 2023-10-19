import React, { useEffect, useState } from "react";
import { Athena } from "../../athena";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function BarChart() {

  const [merchants, setMerchants] = useState([]);
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    let query= `select case when transaction_per_month <=10 then 'Less than 10 transactions per month'
                when transaction_per_month <=25 then '11-25 transactions per month'
                when transaction_per_month <=50 then '26-50 transactions per month'
                when transaction_per_month >50  then 'Over 50 transactions per month'
                end as transactions_per_month,
                count(acct_number) as accounts
                from (  select "acct_number", count(distinct "transaction_id") / count(distinct date_trunc('month', date)) as transaction_per_month
                from identify.view_mock_transactions
                group by "acct_number" ) tr
                group by case when transaction_per_month <=10 then 'Less than 10 transactions per month'
                when transaction_per_month <=25 then '11-25 transactions per month'
                when transaction_per_month <=50 then '26-50 transactions per month'
                when transaction_per_month >50  then 'Over 50 transactions per month'
                end`;
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
        text: 'Number of Accounts by Transactions per Month Bucket',
      },
    },
  };

  const labels = merchants;
  const faker = totals;
  const data = {
    labels,
    datasets: [
      {
        label: 'Number of Accounts',
        data: labels.map((index) => faker[labels.indexOf(index)]),
        backgroundColor: '#408ef7',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}