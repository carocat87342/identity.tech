import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts'
import { Athena } from "../../athena";

export function ScatterCharts() {
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

  var data = [];
  merchants.map((item)=>{
      data.push([new Date(item).getTime(), totals[merchants.indexOf(item)]]);
  })
  const series = [{
      data: data 
  }]

  const options = {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        type: 'xy'
      }
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      max: 25000
    }
  }

  return (
    <div>
        <ReactApexChart options={options} series={series} type="scatter" height={500} width={500} />
    </div>
  );
}
