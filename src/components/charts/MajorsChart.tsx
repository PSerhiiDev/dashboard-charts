import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Text,
} from "recharts";
import Json from "../../AllData-json.json";
import NoDataMessage from "./NoDataMessage";

interface qalification {
  Specializations_Id: number;
  Universities_Id: number;
  Degree_Id: number;
  EmployeeID: number;
  QualifiedID: number;
}

type Obj = {
  global: number;
  local: number;
  total: number;
}

const MajorsChart = () => {
  const { LKP_Specializations, LKP_Universities, Qualifications } = Json;
  // const filteredQalifications = useSelector(
  //   selectors.getFilteredTableData("Qualifications")
  // );

  const calculateSpec = (
    prev: number,
    id: number,
    field: "local" | "global"
  ) => {
    const isLocal = LKP_Universities.find(
      (univer) => univer.Id === id
    )?.Cities_Id;

    if (field === "local") {
      return isLocal ? prev + 1 : prev;
    } else if (field === "global") {
      return isLocal ? prev : prev + 1;
    }
  };

  const getMajorsData = () => {
    const majors = Qualifications.reduce<Record<string, Obj>>(
      (acc, rec: qalification) => {

        return typeof acc[rec.Specializations_Id] !== "undefined"
          ? {
              ...acc,
              [rec.Specializations_Id]: {
                total: acc[rec.Specializations_Id].total + 1,
                local: calculateSpec(
                  acc[rec.Specializations_Id].local,
                  rec.Universities_Id,
                  "local"
                ),
                global: calculateSpec(
                  acc[rec.Specializations_Id].global,
                  rec.Universities_Id,
                  "global"
                ),
              },
            }
          : {
              ...acc,
              [rec.Specializations_Id]: {
                total: 1,
                local: calculateSpec(0, rec.Universities_Id, "local"),
                global: calculateSpec(0, rec.Universities_Id, "global"),
              },
            };
      },
      {}
    );

    const majorsArr = Object.keys(majors).map((key) => ({
      id: +key,
      name: LKP_Specializations.find((item) => item.Id === +key)?.Name,
      total: majors[key].total,
      local: majors[key].local,
      global: majors[key].global,
    }));

    const topResults = majorsArr.sort((a, b) => b.total - a.total).slice(0, 9);
    const sortedResultsById = topResults.sort((a, b) => a.id - b.id);

    return sortedResultsById;
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

  const customizedLegend = () => {
    return (
      <ul className="flex gap-[15px]">
        <li className="text-[#53AA8A] flex items-center gap-[3px]">
          <div className="w-[3px] h-[13px] bg-[#53AA8A] rounded-[50px]" />
          <span>international universities</span>
        </li>
        <li className="text-[#C3A355] flex items-center gap-[3px]">
          <div className="w-[3px] h-[13px] bg-[#C3A355] rounded-[50px]" />
          <span>local universities</span>
          <div />
        </li>
      </ul>
    );
  };

  const customizedTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FFFFFF] border border-[#F4F4F4] text-center text-[#808080] rounded-[5px] px-[10px] py-[5px] text-[14px] shadow-[0_3px_3px_#B6CBBA]">
          <p>{label}</p>
          <p className={`text-[${payload[0].fill}] text-[12px]`}>
            international universities: {payload[0].payload.local}
          </p>
          <p className={`text-[${payload[1].fill}] text-[12px]`}>
            local universities: {payload[1].payload.global}
          </p>
          <p></p>
        </div>
      );
    }
  };

  return (
    <div className="relative">
      <BarChart
        width={515}
        height={250}
        data={getMajorsData()}
        className="mt-[23px]"
      >
        {getMajorsData().length && (
          <>
            <CartesianGrid vertical={false} opacity={0.4} />
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
              width={10}
              tickMargin={0}
            />
            <Tooltip content={customizedTooltip} />
            <Bar dataKey="local" fill="#53AA8A" radius={20} barSize={7} />
            <Bar dataKey="global" fill="#C3A355" radius={20} barSize={7} />
          </>
        )}
        <Legend
          iconSize={0}
          verticalAlign="top"
          wrapperStyle={{ fontSize: "12px", top: "-10px", fontWeight: "bold" }}
          content={customizedLegend}
        />
      </BarChart>
      {!getMajorsData().length && <NoDataMessage styles="absolute top-0" />}
    </div>
  );
};

export default MajorsChart;
