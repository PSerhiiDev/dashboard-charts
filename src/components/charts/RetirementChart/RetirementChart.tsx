import React from 'react'
import NoDataMessage from '../NoDataMessage';
import { Legend, Pie, PieChart, Sector, ResponsiveContainer } from "recharts";
import Json from "../../../AllData-json.json";
import "./RetirementChart.css"

type DataFromJSON = {
  EmployeeID: number;
  Name: string;
  Gender_Id: number;
  Gender: string;
  Nationality_Id: number;
  NationalityName: string;
  RankType_Id: number;
  RankTitle_Id: number;
  RanktitleName: string;
  MaritalStatus_Id: number;
  MaritalStatus: string;
  BirthDate: string;
  Sector_Id: number;
  SectoreName: string;
  Administration_Id: number;
  AdministrationName: string;
  Cities_Id: number;
  CityName: string;
  JoiningDate: string;
  IsHighRank: boolean;
}

// const utc = parseInt(new Date().toJSON().slice(0, 10));
// const DataArr = Json.Employee;


// "المتبقي من التقاعد": [
//   { "id": "1 - 5 سنة", "value": "1 - 5 سنة" },
//   { "id": "10 - 14 سنة", "value": "10 - 14 سنة" },
//   { "id": "15 - 20 سنة", "value": "15 - 20 سنة" }
// ]

type TObject = {
  [x: string]: string
}


const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius,
    startAngle, endAngle, fill, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 0) * cos;
  const sy = cy + (outerRadius + 0) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 30;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";
  return (
    <g className="doughnutWrapper">
      {value ? (
        <>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={fill}
            cornerRadius={30}
          />
          <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) + 5}
            y={ey - 5}
            textAnchor={textAnchor}
            style={{ fontSize: "11px" }}
            fill="#333"
          >
            👤 {value}
          </text>
        </>
      ) : (
        <div></div>
      )}
    </g>
  );
};

const arrData = Json.Employee;

const RetirementChart = () => {

  // const filteredEmployee = useSelector(
  //   selectors.getFilteredTableData("Employee")
  // );



  const data = [
    { id: "15 - 20 سنة", name: "20-15", value: 0, fill: "#39836b" },
    { id: "10 - 14 سنة", name: "14-10", value: 0, fill: "#c3a355" },
    { id: "1 - 5 سنة", name: "5-1", value: 0, fill: "#53aa8a" },
  ];

  const utc = parseInt(new Date().toJSON().slice(0, 10));
  const dates = arrData.map((item: any) => item.BirthDate.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3/$1/$2"));
  
  dates.map((item: any) => {
    const diffTime = Math.abs(utc - parseInt(item));
    const dateDiff = 60 - diffTime;
    if (dateDiff <= 20 && dateDiff >= 15) {
      data[0].value += 1;
    }
    if (dateDiff <= 14 && dateDiff >= 10) {
      data[1].value += 1;
    }
    if (dateDiff <= 5 && dateDiff >= 1) {
      data[2].value += 1;
    }
  });

  const checkLowValues = data.map((item) => {
    if (item.value > 0 && item.value < 5) {
      return false
    }
    return true
  })

  const checkEmptyValue = data.every(item => item.value === 0);
  const activeIndex = data.map((_, index) => index);

  return !checkEmptyValue ? (
    <ResponsiveContainer className="retired-chart" width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          paddingAngle={checkLowValues.includes(false) ? -3 : -10}
        />
        <Legend
          iconSize={10}
          width={80}
          height={280}
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
        />
      </PieChart>
    </ResponsiveContainer>
  ) : (
    <NoDataMessage />
  );
}

export default RetirementChart