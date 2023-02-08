import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
  Text,
} from "recharts";
import Json from "../../../AllData-json.json";
import { ReactComponent as CloseIcon } from "../../../assets/close.svg";
import "./styles.css";

interface Props {
  onClose: () => void;
  type: "local" | "global";
}

interface EmployeeCount {
  min: number;
  max: number;
}
interface ResultItem {
  univer?: string;
  degree?: string;
  employee: number;
  degreeId: number;
}

interface qalification {
  Universities_Id: number;
  Degree_Id: number;
}

type Obj = {
  degree: number[];
  isLocal: boolean;
};

const UniversitiesRank = ({ onClose, type }: Props) => {
  const { LKP_Degree, LKP_Universities, Qualifications } = Json;
  const [results, setResults] = useState<ResultItem[]>();
  const [employeeCount, setEmployeeCount] = useState<EmployeeCount>();
  const degreeForShow = [
    "bachelor",
    "master",
    "doctorate",
    "diploma",
    "secondary",
  ];

  useEffect(() => {
    getUniversitiesData();
  }, []);

  const getDegree = (arr: number[]) => {
    return arr.reduce((acc: any, rec) => {
      return typeof acc[rec] !== "undefined"
        ? { ...acc, [rec]: acc[rec] + 1 }
        : { ...acc, [rec]: 1 };
    }, {});
  };

  const getUniversitiesData = () => {
    const universities = Qualifications.reduce<Record<string, Obj>>(
      (acc, rec: qalification) => {
        console.log(acc[rec.Universities_Id]);
        return {
          ...acc,
          [rec.Universities_Id]: {
            degree: acc[rec.Universities_Id]?.degree
              ? [...acc[rec.Universities_Id]?.degree, rec.Degree_Id]
              : [rec.Degree_Id],
            isLocal: Boolean(
              LKP_Universities.find(
                (univer) => univer.Id === rec.Universities_Id
              )?.Cities_Id
            ),
          },
        };
      },
      {}
    );

    const universitiesArr = [];
    for (let key in universities) {
      const resultItem = {
        name: LKP_Universities.find((item) => item.Id === +key)?.Name,
        degree: getDegree(universities[key].degree),
      };
      if (type === "local" && universities[key].isLocal) {
        universitiesArr.push(resultItem);
      } else if (type === "global" && !universities[key].isLocal) {
        universitiesArr.push(resultItem);
      }
    }

    const results: ResultItem[] = [];
    universitiesArr.forEach((univer) =>
      Object.keys(univer.degree).map((key) => {
        const degreeName = LKP_Degree.find((item) => item.Id === +key)?.Name;
        console.log(degreeName);
        if (degreeForShow.includes(degreeName!))
          results.push({
            univer: univer.name,
            degree: degreeName,
            employee: univer.degree[key],
            degreeId: +key,
          });
      })
    );

    setResults(results);
    setEmployeeCount({
      min: Math.min(...results.map((item) => item.employee)),
      max: Math.max(...results.map((item) => item.employee)),
    });
  };

  const getShapeStyle = (id: number) => {
    switch (id) {
      case 1:
        return {
          stroke: "#53aa8a",
          fill: "rgba(83,170,138,0.2)",
        };
      case 2:
        return {
          stroke: "#1e4d58",
          fill: "rgba(30,77,88,0.18)",
        };
      case 3:
        return {
          stroke: "#4a8e55",
          fill: "rgb(74, 142, 85, 0.2)",
        };
      case 4:
        return {
          stroke: "#808080",
          fill: "rgb(128, 128, 128, 0.2)",
        };
      case 5:
        return {
          stroke: "#c3a355",
          fill: "rgb(195, 163, 85, 0.2)",
        };
    }
  };

  const getShapeNumber = (employee: number) => {
    const step = (employeeCount!.max - employeeCount!.min) / 5;

    let count = employeeCount!.min;
    let shapeNumber = 1;

    for (let i = 1; i <= 5; i++) {
      if (employee >= count && employee <= count + step) {
        shapeNumber = i;
      }
      count += step + 0.001;
    }
    return shapeNumber;
  };

  const customizedShape = (props: any) => {
    const { x, y, degreeId, employee, width, height } = props;
    return (
      <circle
        cx={x + width / 2}
        cy={y + height / 2}
        fill={getShapeStyle(degreeId)?.fill}
        stroke={getShapeStyle(degreeId)?.stroke}
        strokeWidth="2"
        r={getShapeNumber(employee) * 8}
      />
    );
  };

  const customizedTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#FFFFFF] border border-[#F4F4F4] text-center rounded-[5px] px-[20px] py-[10px] text-[12px] shadow-[0_3px_3px_#B6CBBA]">
          <p>Number of graduates</p>
          <p>{payload[2].value}</p>
        </div>
      );
    }
  };

  const customizedXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    console.log(x, y, payload);
    return (
      <Text
        x={x}
        y={y}
        width={100}
        textAnchor="middle"
        verticalAnchor="start"
        fontSize={12}
        fill="#1E4D58"
      >
        {payload.value}
      </Text>
    );
  };

  const customizedYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <Text
        x={x}
        y={y}
        width={100}
        textAnchor="end"
        fontSize={16}
        fill="#39836B"
      >
        {payload.value}
      </Text>
    );
  };

  return (
    <div className="w-[1236px] h-[625px] bg-[#FFFFFF] rounded-[10px] shadow-[0_3px_6px_#B6CBBA] p-[18px] universities-rank">
      <button
        className="w-[22px] h-[22px] flex items-center justify-center rounded-full border-[2px] border-[#39836b]"
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      <h1 className="text-center text-[20px]">
        {type === "local"
          ? "The number of local university graduates"
          : "Number of graduates from international universities"}
      </h1>
      <div className="relative flex flex-col h-[92%]">
        <ScatterChart
          width={1200}
          height={510}
          margin={{ top: 10, left: 20, bottom: 30, right: 15 }}
        >
          <CartesianGrid opacity={0.6} />
          {results?.length && (
            <XAxis
              type="category"
              dataKey="univer"
              axisLine={false}
              tickLine={false}
              allowDuplicatedCategory={false}
              tick={customizedXAxisTick}
              interval={0}
              tickMargin={1}
            />
          )}
          <YAxis
            axisLine={false}
            tickLine={false}
            type="category"
            dataKey="degree"
            allowDuplicatedCategory={false}
            tick={customizedYAxisTick}
            ticks={degreeForShow}
            domain={degreeForShow}
            tickMargin={70}
          />
          <ZAxis dataKey="employee" />
          <Tooltip content={customizedTooltip} />
          <Scatter data={results} shape={customizedShape} />
        </ScatterChart>
        <h1 className="absolute left-0 top-[-30px] text-[20px]">
          Qualification
        </h1>
        <h1 className="text-center text-[#1E4D58] text-[20px] mt-auto">
          Ranking of universities globally
        </h1>
      </div>
    </div>
  );
};

export default UniversitiesRank;
