import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Text,
} from "recharts";
import Json from "../../AllData-json.json";
import NoDataMessage from "./NoDataMessage";
interface qalification {
  Administration_Id: number;
}

const LKP_Administration = Json.LKP_Administration;
const employee = Json.Employee

const SectionsChart = () => {

  const getSectionsData = () => {
    const administrationsCount = employee.reduce<Record<string, number>>(
      (acc, rec: qalification) => {
        return typeof acc[rec.Administration_Id] !== "undefined"
          ? { ...acc, [rec.Administration_Id]: acc[rec.Administration_Id] + 1 }
          : { ...acc, [rec.Administration_Id]: 1 };
      },
      {}
    );

    const result = [];

    for (let key in administrationsCount) {
      result.push({
        index: +key,
        name: LKP_Administration.find((item) => item.Id === +key)?.Name,
        value: +administrationsCount[key],
      });
    }

    const topResults = result.sort((a, b) => b.value - a.value).slice(0, 9);
    const sortedResultsById = topResults.sort((a, b) => a.index - b.index);

    return sortedResultsById;
  };

  const CandyBar = (props: any) => {
    const { x: oX, y: oY, width: oWidth, height: oHeight, opacity } = props;

    let x = oX;
    let y = oHeight < 0 ? oY + oHeight : oY;
    let width = oWidth;
    let height = Math.abs(oHeight);

    return (
      <rect
        fill="#53aa8a"
        opacity={opacity}
        mask="url(#mask-stripe)"
        x={x}
        y={y}
        width={width}
        height={height}
      />
    );
  };

  const CustomizedAxisTick = (props: any) => {
    const { x, y, payload } = props;

    return (
      <Text
        x={x}
        y={y}
        width={75}
        textAnchor="middle"
        verticalAnchor="start"
        fontSize={11}
        fill="#53aa8a"
      >
        {payload.value}
      </Text>
    );
  };

  const customizedTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FFFFFF] border border-[#F4F4F4] text-center rounded-[5px] px-[10px] py-[5px] text-[14px] shadow-[0_3px_3px_#B6CBBA]">
          <p>{label}</p>
          <p>{payload[0].payload.value}</p>
        </div>
      );
    }
  };

  return getSectionsData().length ? (
    <BarChart
      width={445}
      height={225}
      data={getSectionsData()}
      barSize={20}
      barCategoryGap={15}
      style={{
        justifyContent: "flex-start",
        marginTop: "30px",
      }}
    >
      <pattern
        id="pattern-stripe"
        width="20"
        height="7.5"
        patternUnits="userSpaceOnUse"
      >
        <rect id="pattern-stripe" width="20" height="3" fill="white" />
      </pattern>
      <mask id="mask-stripe">
        <rect width="100%" height="100%" fill="url(#pattern-stripe)" />
      </mask>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="name"
        axisLine={false}
        tickLine={false}
        tick={<CustomizedAxisTick />}
        interval={0}
      />
      <YAxis
        axisLine={false}
        tickLine={false}
        tick={{
          fontSize: 11,
          fill: "#C3A355",
        }}
        tickMargin={0}
        width={18}
      />
      <Tooltip content={customizedTooltip} />
      <Bar
        dataKey="value"
        background={<CandyBar opacity={0.4} />}
        shape={<CandyBar />}
      />
    </BarChart>
  ) : (
    <NoDataMessage />
  );
};

export default SectionsChart;
