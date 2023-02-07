import { Legend, RadialBar, RadialBarChart } from "recharts";
import Json from "../../AllData-json.json";
// import { selectors } from "../../../store/filters/selectors";
// import { useSelector } from "../../../store/hooks";
import NoDataMessage from "./NoDataMessage";

interface language {
  Languages_Id: number;
}

const LKP_Languages = Json.LKP_Languages;
const Languages = Json.Languages;

const LanguagesChart = () => {
  const fills = ["#C3A355", "#29624F", "black", "#53AA8A", "#808080"];
  // const filteredLanguages = useSelector(
  //   selectors.getFilteredTableData("Languages")
  // );
  let languagesLenght = 0;

  const getLanguagesData = () => {
    const languagesCount = Languages.reduce<Record<string, number>>(
      (acc, rec: language) => {
        return typeof acc[rec.Languages_Id] !== "undefined"
          ? { ...acc, [rec.Languages_Id]: acc[rec.Languages_Id] + 1 }
          : { ...acc, [rec.Languages_Id]: 1 };
      },
      {}
    );

    const result = [];

    for (let key in languagesCount) {
      result.push({
        name: LKP_Languages.find((language) => language.Id === +key)?.Name,
        value: +languagesCount[key],
      });
    }

    const sortedResult = result
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .reverse();

    languagesLenght = sortedResult.length;

    const sumValues = sortedResult.reduce((accumulator, object) => {
      return accumulator + object.value;
    }, 0);

    const resultWithFill = sortedResult.map((item, idx) => ({
      ...item,
      fill: fills[idx],
      value: +((item.value / sumValues) * 100).toFixed(0),
    }));

    return resultWithFill;
  };

  const getLabelPosition = () => {
    switch (languagesLenght) {
      case 1:
        return "top-[67px]";
      case 2:
        return "top-[22px] gap-[28px]";
      case 3:
        return "top-[6px] gap-[14px]";
      case 4:
        return "top-0 gap-[6px]";
      case 5:
        return "top-[-5px] gap-[1.5px]";
    }
  };

  return getLanguagesData().length ? (
    <div className="languages-chart">
      <RadialBarChart
        width={230}
        height={230}
        cx={115}
        data={getLanguagesData()}
        innerRadius={40}
        outerRadius={130}
        barSize={6}
        startAngle={90}
        endAngle={-200}
        style={{
          direction: "initial",
          justifyContent: "flex-start",
          marginRight: "61px",
        }}
      >
        <RadialBar dataKey="value" cornerRadius={30} background />
        <Legend
          iconSize={0}
          width={83}
          height={130}
          layout="vertical"
          align="left"
          verticalAlign="top"
          wrapperStyle={{ fontSize: "12px", top: 0, right: "-70px" }}
        />
      </RadialBarChart>
      <ul className={`radialBarLabels ${getLabelPosition()}`}>
        {getLanguagesData().map((item) => (
          <h5
            key={item.name}
            className={`text-${
              item.fill === "black" ? item.fill : `[${item.fill}]`
            }`}
          >
            {item.value}%
          </h5>
        ))}
      </ul>
    </div>
  ) : (
    <NoDataMessage />
  );
};

export default LanguagesChart;
