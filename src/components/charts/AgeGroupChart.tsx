import NoDataMessage from "./NoDataMessage";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import Json from "../../AllData-json.json";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
]);

const AgeGroupChart = () => {
  const arrData = Json.Employee;
  const calculate_age = (dob: number) => {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);

    return Math.abs(age.getUTCFullYear() - 1970);
  };

  function ageGroupes() {
    const dates = arrData?.map((i: any) => i.BirthDate);
    let cat18_21 = 0;
    let cat21_25 = 0;
    let cat25_30 = 0;
    let cat30_35 = 0;
    let cat35_40 = 0;
    let cat40_45 = 0;
    let cat45_50 = 0;
    let other = 0;

    for (let age of dates) {
      if (calculate_age(age) >= 18 && calculate_age(age) < 21) {
        cat18_21 += 1;
      } else if (calculate_age(age) >= 21 && calculate_age(age) < 25) {
        cat21_25 += 1;
      } else if (calculate_age(age) >= 25 && calculate_age(age) < 30) {
        cat25_30 += 1;
      } else if (calculate_age(age) >= 30 && calculate_age(age) < 35) {
        cat30_35 += 1;
      } else if (calculate_age(age) >= 35 && calculate_age(age) < 40) {
        cat35_40 += 1;
      } else if (calculate_age(age) >= 40 && calculate_age(age) < 45) {
        cat40_45 += 1;
      } else if (calculate_age(age) >= 45 && calculate_age(age) <= 50) {
        cat45_50 += 1;
      } else {
        other += 1;
      }
    }

    return {
      cat18_21,
      cat21_25,
      cat25_30,
      cat30_35,
      cat35_40,
      cat40_45,
      cat45_50,
    };
  }

  const {
    cat18_21,
    cat21_25,
    cat25_30,
    cat30_35,
    cat35_40,
    cat40_45,
    cat45_50,
  } = ageGroupes();

  const data = [
    { name: "18-20", value: cat18_21 },
    { name: "21-24", value: cat21_25 },
    { name: "25-29", value: cat25_30 },
    { name: "30-34", value: cat30_35 },
    { name: "35-39", value: cat35_40 },
    { name: "40-44", value: cat40_45 },
    { name: "45-50", value: cat45_50 },
  ];

  const filterNonZero = data.filter((item) => item.value !== 0);
  const checkEmptyValue = data.every((item) => item.value !== 0);

  const option = {
    color: [
      "#808080",
      "#39836B",
      "#1E4D58",
      "#C3A355",
      "#D3E8D6",
      "#E5D9B4",
      "#D3DAD4",
    ],
    legend: {
      type: "scroll",
      align: "right",
      orient: "vertical",
      itemWidth: 15,
      itemHeight: 15,
      right: 0,
      icon: "circle",
      top: 5,
      data: filterNonZero.map((item) => item.name),
    },
    series: [
      {
        type: "pie",
        radius: [0, 80],
        height: "73.33%",
        left: 0,
        width: 320,
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          alignTo: "edge",
          formatter: "{value|{c}}\n",
          minMargin: 5,
          edgeDistance: 30,
          lineHeight: 15,
          rich: {
            value: {
              fontSize: 14,
              color: "#000",
            },
          },
        },
        labelLine: {
          length: 5,
          length2: 0,
          maxSurfaceAngle: 80,
        },
        labelLayout: function (params: any) {
          const points = params.labelLinePoints;
          points[2][0] = params.labelRect.x + params.labelRect.width;
          return {
            labelLinePoints: points,
          };
        },
        data: filterNonZero,
      },
    ],
  };
  return checkEmptyValue ? (
    <>
      <ReactEChartsCore
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
        theme={"theme_name"}
        opts={{}}
      />
    </>
  ) : (
    <NoDataMessage />
  );
};

export default AgeGroupChart;
