import Json from "../../../AllData-json.json";
import { DataFromJSON } from "../../../types";

type RankTitle = {
  Id: number;
  Name: string;
  RankType_Id: number;
};

type TObject = {
  [x: string]: string;
};

const DataArr = Json.Employee;
const axes = Json.LKP_RankTitle;

const obj: TObject[] = [];

const useAxesValues = (graphType: number) => {
  const highRank = DataArr.filter((i: DataFromJSON) => {
    return i?.IsHighRank === true && i?.RankType_Id === 1;
  });

  const filteredRanks = (number: number) => {
    return (
      highRank.filter((i: DataFromJSON) => i?.RankTitle_Id === number).length ||
      0
    );
  };

  const numbers = [5, 12, 13, 14, 16, 15];
  const adaptedNumber = obj.length ? numbers : numbers;

  const labels3Data = adaptedNumber.map((number) => filteredRanks(number));

  const xAxisLabel = axes.filter((i: RankTitle) => i.RankType_Id === graphType);

  const labels = xAxisLabel.map((item: RankTitle) => {
    if (item.Name.split(" ").length > 1) {
      return item.Name.split(" ");
    } else {
      return item.Name;
    }
  });

  const ranksNumber = (rankName: string) => {
    if (graphType === 1) {
      return DataArr.filter((i: DataFromJSON) => i?.RanktitleName === rankName)
        .length;
    }

    if (graphType === 2) {
      return DataArr.filter((i: DataFromJSON) => i?.RanktitleName === rankName)
        .length;
    }

    if (graphType === 3) {
      return labels3Data;
    }
  };

  const labelsData = xAxisLabel.map((item) => ranksNumber(item.Name)).reverse();

  return [labelsData as number[], labels as string[], labels3Data as number[]];
};

export default useAxesValues;
