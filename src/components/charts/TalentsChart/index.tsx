import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./styles.css";
import Json from "../../../AllData-json.json";
import NoDataMessage from "../NoDataMessage";

type Skills = {
  Id: number;
  EmployeeID: number;
  Skills_Id: number;
};

type LabelProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

const colorsData = [
  "#4A8E55",
  "#432534D8",
  "#808080",
  "#1E4D58",
  "#c3a355",
  "#53AA8A",
];

const renderCustomizedLabel = ({ x, y, width, height, fill }: LabelProps) => {
  const radius = 10;

  if (height === 0) {
    return;
  }

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill={fill} />
      <circle cx={x + width / 2} cy={y - radius} r={radius - 2} fill="#fff" />
    </g>
  );
};

const getPath = (x: number, y: number, height: number) => {
  return `M${x + 8.5},${y - 1} h 3 v ${height} h -3 Z`;
};

const TriangleBar = ({ fill, x, y, height }: any) => {
  return <path d={getPath(x, y, height)} stroke="none" fill={fill} />;
};

const CustomizedLabel = (props: any) => {
  const { x, y, height, fill } = props;
  return <circle cx={x + 10} cy={y + height + 10} r={3} fill={fill} />;
};

const CustomXAxisTick = (e: any) => {
  const { x, y, index, payload } = e;

  const color = [
    "#4A8E55",
    "#432534D8",
    "#808080",
    "#1E4D58",
    "#C3A355",
    "#53AA8A",
  ];
  const fillColor = color[index];

  if (payload && payload.value) {
    return (
      <Text
        fill={fillColor}
        fontSize={"9px"}
        width={"12px"}
        x={x}
        y={y}
        textAnchor="middle"
        verticalAnchor="start"
      >
        {payload.value}
      </Text>
    );
  }
  return null;
};

const TalentsChart = () => {
  const DataArr = Json.LKP_Skills;
  const skills: Skills[] = Json.Skills;

  const data = DataArr.map((item, index) => {
    const filtered = skills.filter((val) => val.Skills_Id === item?.Id);
    return { name: item.Name, fill: colorsData[index], pv: filtered.length };
  });

  const checkEmptyValue = data.every((item) => item.pv !== 0);

  return checkEmptyValue ? (
    <ResponsiveContainer width="100%" height="100%" className="talents-wrapper">
      <BarChart
        data={data}
        margin={{
          top: 25,
          right: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid horizontal={true} vertical={false} />
        <XAxis
          dataKey="name"
          tick={<CustomXAxisTick />}
          tickLine={false}
          tickMargin={5}
          axisLine={false}
          interval={0}
        ></XAxis>
        <YAxis
          axisLine={false}
          tickLine={false}
          tickMargin={0}
          tick={{ stroke: "#C3A355", fontWeight: 200, fontSize: "7px", dx: 0 }}
          padding={{ top: 20, bottom: 10 }}
          width={20}
          allowDecimals={false}
        />
        <Tooltip
          wrapperStyle={{
            visibility: "hidden",
          }}
          cursor={false}
        />
        <Bar
          dataKey="pv"
          barSize={18}
          background={{ fill: "#eee", opacity: 0.8 }}
          shape={<TriangleBar />}
          label={<CustomizedLabel />}
        >
          <LabelList dataKey="name" content={renderCustomizedLabel as any} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  ) : (
    <NoDataMessage />
  );
};

export default TalentsChart;
