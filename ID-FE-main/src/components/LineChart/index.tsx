import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts'
import { Athena } from "../../athena";


export function LineChart() {

  const [merchants, setMerchants] = useState([]);
  const [totals, setTotals] = useState([]);

  useEffect(() => {
    let query= `select case when current_balance <0 then 'Negative' 
          when current_balance <= 100 then 'Less than $100'
          when current_balance <= 1000 then 'Less than $1000'
          when current_balance <= 5000 then 'Less than $5000'
          else 'Over $5000' end 
                  as cb, 
          count("acct_number") as counts
          from identify.view_mock_transactions
          where current_balance is not null
          group by case when current_balance <0 then 'Negative' 
          when current_balance <= 100 then 'Less than $100'
          when current_balance <= 1000 then 'Less than $1000'
          when current_balance <= 5000 then 'Less than $5000'
          else 'Over $5000' end
          order by case when current_balance <0 then 'Negative' 
          when current_balance <= 100 then 'Less than $100'
          when current_balance <= 1000 then 'Less than $1000'
          when current_balance <= 5000 then 'Less than $5000'
          else 'Over $5000' end`;
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
  
  const series = [
      {
        data: totals
      }
  ];
  let options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: merchants
    }
  }
  return (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={265} width={500} />
    </div>
  );
}
