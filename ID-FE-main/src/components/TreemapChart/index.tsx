import React, { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts'
import { Athena } from "../../athena";

export function TreemapChart() {

  const [data, setData] = useState([]);

  useEffect(() => {
    let query= `select merchant_desc as merchant, sum(amount) as totals  from view_mock_transactions  group by merchant_desc  order by sum(amount) desc  limit 10`;
    let itemData = [];
    const result_array = Athena(query);
    result_array.then((result) => {
      const keys = Object.keys(result[0])
      result.map((line)=>{
        itemData.push({
          x: line[keys[0]],
          y: line[keys[1]]
        })
      });
      setData(itemData);
    })
  }, []);
  
  const series = [
      {
        data: data
      }
  ];
  let _option = {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      colors: [
        '#408ef7',
        '#142898',
        '#d67245',
        '#611577',
        '#d3b33c',
        '#c55054',
        '#ce52a4',
        '#387077',
        '#6d53bb',
        '#52a74e',
        '#EF6537',
        '#C0ADDB'
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      }
    }
  return (
    <div>
      <ReactApexChart options={_option} series={series} type='treemap' height={500} width={500} />
    </div>
  );
}
