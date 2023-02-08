import { useEffect, useState } from "react";
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
import Modal from "../Modal";
import SwitchButton from "../SwitchButton";
import NoDataMessage from "./NoDataMessage";
import UniversitiesRank from "./UniversitiesRank";

interface result {
  index: number;
  name?: string;
  value: number;
}
interface results {
  local: result[];
  global: result[];
}

interface qalification {
  Universities_Id: number;
}

interface LabelName {
  y: number
  x: number
  name: string
  fill: string
}

const qualifications = Json.Qualifications
const LKP_Universities = Json.LKP_Universities;

const UniversitiesChart = () => {
  const [filter, setFilter] = useState<"local" | "global">("local");
  const [rankType, setRankType] = useState<"local" | "global">("local");
  const [results, setResults] = useState<results>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const colorsData = ["#53aa8a", "#c3a355", "#4a8e55", "#000", "#29624f"];

  useEffect(() => {
    getUniversitiesData();
  }, []);

  const getUniversitiesData = () => {
    const universties = qualifications.reduce<Record<string, number>>(
      (acc, rec: qalification) => {
        return typeof acc[rec.Universities_Id] !== "undefined"
          ? { ...acc, [rec.Universities_Id]: acc[rec.Universities_Id] + 1 }
          : { ...acc, [rec.Universities_Id]: 1 };
      },
      {}
    );

    const results = {
      local: [],
      global: [],
    } as results;

    for (let key in universties) {
      const resultItem = {
        index: +key,
        name: LKP_Universities.find((item) => item.Id === +key)?.Name,
        value: +universties[key],
      };
      if (LKP_Universities.find((item) => item.Id === +key)?.Cities_Id) {
        results.local.push(resultItem);
      } else {
        results.global.push(resultItem);
      }
    }

    const topResults = {
      local: results.local.sort((a, b) => b.value - a.value).slice(0, 5),
      global: results.global.sort((a, b) => b.value - a.value).slice(0, 5),
    };

    const sortedResultsById = {
      local: topResults.local.sort((a, b) => a.index - b.index),
      global: topResults.global.sort((a, b) => a.index - b.index),
    };

    setResults(sortedResultsById);
  };

  const handleArrowClick = (name: "local" | "global") => {
    setIsModalOpen(true);
    setRankType(name);
  };

  const customNameLabel = ({ y, x, name, fill }: LabelName) => {
    return (
      <text x={x} y={y - 5} fill={fill} fontSize={12} textAnchor="start">
        {name}
      </text>
    );
  };

  return (
    <div className="chart-wrapper">
      <div className="flex gap-[15px] justify-end mt-[10px]">
        <SwitchButton
          text="international universities"
          isActive={filter === "global"}
          color="#C3A355"
          onClick={() => setFilter("global")}
          arrowClick={() => handleArrowClick("global")}
        />
        <SwitchButton
          text="local universities"
          isActive={filter === "local"}
          color="#39836B"
          onClick={() => setFilter("local")}
          arrowClick={() => handleArrowClick("local")}
        />
      </div>
      {results && results[filter].length ? (
        <BarChart
          width={220}
          height={225}
          data={results ? results[filter] : []}
          barSize={15}
          layout="vertical"
          style={{
            justifyContent: "flex-start",
            marginTop: "10px"
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
            {colorsData.map((item, idx) => (
              <Cell key={idx} fill={item} />
            ))}
          </Bar>
        </BarChart>
      ) : (
        <NoDataMessage styles="mt-[84px]" />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UniversitiesRank
          onClose={() => setIsModalOpen(false)}
          type={rankType}
        />
      </Modal>
    </div>
  );
};

export default UniversitiesChart;
