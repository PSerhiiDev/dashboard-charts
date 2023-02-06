import React from 'react'
import useLiteral from '../../hooks/useLiteral';
import NoDataMessage from '../NoDataMessage';
import Chart from "react-apexcharts";
import "./MaritalChart.css";


const MaritalChart = () => {

  const [marriedPer, singlePer] = useLiteral('MaritalStatus', "married");
  const state = {
    options: {
      plotOptions: {
        radialBar: {
          offsetX: -30,
          offsetY: 30,
          hollow: {
            size: '40%',
          },
          dataLabels: {
            show: true,
            name: {
              show: false,
              fontSize: '16px',
              offsetY: -30,
              formatter: (val: any, show: any, opts: any) => {
                return '%' + opts.globals.series[1]
              }
            },
            value: {
              show: false,
              fontSize: '17px',
              offsetY: 5,
            },
            total: {
              show: true,
              label: '',
              formatter: function (opts: any) {
                return '%' + opts.globals.series[0]
              }
            }
          },
        }
      },
      stroke: {
        lineCap: "round" as "round" | "butt" | "square"
      },
      legend: {
        markers: {
          width: 2,
          offsetX: 1,
          radius: 2
        },
        
        show: true,
        formatter: (seriesName: any, value: any) => {
          return `${[{ name: 'married', value: 40 }, 
                     { name: 'single', value: 60 }].map(item => {
            return item.name;
          })[value.seriesIndex]}`
        }
      },
      colors: [
        "#39836B",
        "#C3A355",
      ]
    },
    series: [singlePer as any, marriedPer as any],
    labels: ['dsad', 'dsadsada'],
    stroke: {
      show: true,
      width: 100
    }
  }

  const checkIfEmpty = (marriedPer  !== 0 && singlePer !== 0) ? true : false

  return checkIfEmpty ? (
    <div className="radialWrapper">
      <div className="div40">{`${marriedPer}%`}</div>
      <div className="div60">{`${singlePer}%`}</div>
      <Chart options={state.options}
        height={250}
        series={state.series}
        labels={['dsad', 'dsadsada']}
        states={{
          hover: {
            filter: {
              type: 'lighten',
              value: 0.15,
            }
          }
        }}
        type="radialBar" width="380" />
    </div>
  ) : (
    <NoDataMessage />
  )
}

export default MaritalChart