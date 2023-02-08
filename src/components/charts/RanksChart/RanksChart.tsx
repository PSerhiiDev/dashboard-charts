import React, { useState } from "react";
import "./RanksChart.css";
import useAxesValues from "./useAxexValues";
import ReactApexChart from "react-apexcharts";

type Series = {
  data: number[];
  name: string;
};

const RanksChart = () => {
  const [labels2Data, labels2] = useAxesValues(1);
  const [labels1Data, labels1] = useAxesValues(2);
  const [_, __, labels3Data] = useAxesValues(3);

  const [checked, setChecked] = useState(true);

  const series1 = [
    {
      name: "Civil",
      data: (labels1Data as number[]).every((item: number) => item === 0)
        ? []
        : labels1Data,
    },
  ];

  const series2 = [
    {
      name: "Military",
      data: (labels2Data as number[]).every((item: number) => item === 0)
        ? []
        : labels2Data,
    },
    {
      name: "high rank", // red chart
      data: (labels3Data as number[]).every((item: number) => item === 0)
        ? []
        : labels3Data,
    },
  ];

  //number of light green x-axis labels
  let m = 0;

  let series = series1;
  let labels = labels1;

  if (checked) {
    m = 10;
    series = series2;
    labels = labels2;
  }

  // light green color for the first n columns and dark green for the rest
  const makeColors = ({ dataPointIndex }: { dataPointIndex: number }) => {
    if (dataPointIndex < m) {
      return "#53AA8A";
    } else {
      return "#39836B";
    }
  };

  // light green color for the first n x-labels and dark green for the rest
  const makeLabelColors = () => {
    return Array(m)
      .fill("#53AA8A")
      .concat(Array(labels.length - m).fill("#39836B"));
  };

  const options: any = {
    chart: {
      type: "bar",
      redrawOnWindowResize: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
        borderRadius: 3,
      },
    },
    colors: [makeColors, "#D03B3B"],
    grid: {
      show: true,
      borderColor: "rgba(80,80,80, 0.2)",
      padding: {
        top: 0,
        bottom: 0,
      },
      margin: {
        top: 0,
        bottom: 0,
      },
    },
    dataLabels: {
      enabled: false,
      value: false,
    },
    stroke: {
      show: true,
      width: checked ? 2 : 12,
      colors: ["transparent"],
    },
    xaxis: {
      categories: labels,
      axisBorder: {
        show: true,
        color: "#C3A355",
        height: 1,
        width: "100%",
        offsetX: 0,
        offsetY: 10,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        rotate: 0,
        offsetY: -5,
        style: {
          colors: makeLabelColors(),
          fontSize: 9,
          fontFamily: "Neo Sans Arabic",
          letterSpacing: "0.01px",
          textAlign: "center",
        },
      },
    },
    yaxis: {
      showDuplicates: false,
      min: 0, // start values point
      tickAmount: 4,
      labels: {
        maxWidth: 15,
        style: {
          colors: ["#C3A355"],
          fontSize: "12px",
          fontFamily: "Neo Sans Arabic, Regular",
          fontWeight: 400,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: false,
    },
    noData: {
      text: "No data yet",
      align: "center",
      verticalAlign: "middle",
      offsetY: -20,
      style: {
        fontSize: "18px",
      },
    },
  };

  return (
    <div id="column-chart">
      <div className="flex justify-start">
        <div className="ml-12 mr-5 text-[#29624F]">Switch</div>
        <label className="form-control form-control--1">
          <input
            id="radio-1"
            type="radio"
            name="radio"
            defaultChecked={checked}
            onClick={() => setChecked((checked) => !checked)}
          />
          Military
        </label>
        <label htmlFor="radio-1" className="form-control form-control--2 ml-6">
          High rank
        </label>
        <label className="form-control form-control--3 ml-6">
          <input
            type="radio"
            name="radio"
            defaultChecked={!checked}
            onClick={() => setChecked((checked) => !checked)}
          />
          Civil
        </label>
      </div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series as Series[]}
          type="bar"
          height={250}
        />
      </div>
    </div>
  );
};

export default RanksChart;
