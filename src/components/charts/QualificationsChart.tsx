import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import Json from "../../AllData-json.json";
import NoDataMessage from "./NoDataMessage";

type Qalification = {
  Degree_Id: number;
  QualifiedID: number;
  Universities_Id: number;
  Specializations_Id: number;
  EmployeeID: number;
}

type ChartPercentageProps = {
  y: number
  value: number
  fill: string
}

type ChartNameProps = {
  x: number
  y: number
  name: string
  fill: string
}

const LKP_Degree = Json.LKP_Degree;
const qualifications = Json.Qualifications

const QualificationsChart = () => {
  const colorsData = ["#53aa8a", "#c3a355", "#4a8e55", "#000", "#29624f"];

  const getQalificationsData = () => {
    const degreeCount = qualifications.reduce<Record<string, number>>(
      (acc, rec: Qalification) => {
        return acc[rec.Degree_Id] !== undefined
          ? { ...acc, [rec.Degree_Id]: acc[rec.Degree_Id] + 1 }
          : { ...acc, [rec.Degree_Id]: 1 };
      },
      {}
    );

    const result = [];

    for (let key in degreeCount) {
      result.push({
        name: LKP_Degree.find((item) => item.Id === +key)?.Name,
        value: +degreeCount[key]
      });
    }

    const sortedResult = result.sort((a, b) => b.value - a.value).slice(0, 5);
    const sumValues = sortedResult.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);

    const resultWithPercent = sortedResult.map((item) => ({
      ...item,
      value: +((item.value / sumValues) * 100).toFixed(0),
    }));

    return resultWithPercent;
  };

  const customPercentageLabel = ({ y, value, fill }: ChartPercentageProps) => {

    return (
      <text x={190} y={y - 5} fill={fill} fontSize={12} >
        {value}%
      </text>
    );
  };

  const customNameLabel = ({ y, x, name, fill }: ChartNameProps) => {

    return (
      <text x={x} y={y - 5} fill={fill} fontSize={12} >
        {name}
      </text>
    );
  };

  return getQalificationsData().length ? (
    <div className="chart-wrapper">
      <BarChart
        width={220}
        height={245}
        data={getQalificationsData()}
        barSize={15}
        layout="vertical"
        style={{
          justifyContent: "flex-start",
          marginTop: "30px",
        }}
      >
        <CartesianGrid horizontal={false} opacity={0.2} />
        <XAxis
          axisLine={false}
          tickLine={false}
          type="number"
          tick={{
            fontSize: 11,
            fill: "#53aa8a",
          }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          orientation="right"
          type="category"
          dataKey="name"
          hide
        />
        <Bar
          dataKey="value"
          radius={20}
          barSize={7}
          background={{ radius: 20 }}
        >
          <LabelList dataKey="name" content={customNameLabel as any} />
          <LabelList content={customPercentageLabel as any} />
          {colorsData.map((item, idx) => (
            <Cell key={idx} fill={item} />
          ))}
        </Bar>
      </BarChart>
    </div>
  ) : (
    <NoDataMessage />
  );
};

export default QualificationsChart;
