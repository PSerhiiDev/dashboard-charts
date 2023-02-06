import { useEffect, useState } from "react";
import Json from "../../../AllData-json.json";
// import { selectors } from "../store/filters/selectors";
// import { useSelector } from "../store/hooks";

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


const DataArr = Json.Employee;
const axes = Json.LKP_RankTitle;

type TObject = {
  [x: string]: string
}

const obj: TObject[] = [ // rank
  //   { "id": "ملازم", "value": "ملازم" }, // lieutenant
  //   { "id": "نقيب", "value": "نقيب" }, // captain
  //   { "id": "رقيب", "value": "رقيب" }, // Sergeant
  // { "id": "مقدم", "value": "مقدم" }, // Presenter
  //     { "id": "عقيد", "value": "عقيد" }, // Colonel
];

const civilObj: TObject[] = [ // civil
  //   { "id": "الأولى", "value": "الأولى" }, // 1

  //  { "id": "الثانية", "value": "الثاني" }, // 2 //الثاني test data to match
  // { "id": "الثانية", "value": "الثانية" }, // 2 //الثانية does not match

  //   { "id": "الثالثة", "value": "الثالثة" }, // 3
  //  { "id": "الرابعة", "value": "الرابعة" }, // 4
  //  { "id": "الخامسة", "value": "الخامسة" }, // 5
];

const useAxesValues = (graphType: number) => {

// const filteredEmployee = useSelector(
//   selectors.getFilteredTableData("Employee")
// );


  const highRank = DataArr.filter((i: any) => {
    return i?.IsHighRank === true && i?.RankType_Id === 1
  });
  
  const filteredRanks = (number: number) => {
    return highRank.filter((i: any) => i?.RankTitle_Id === number).length || 0;
  };
  
  const numbers = [5, 12, 13, 14, 16, 15];
  const adaptedNumber = obj.length ? numbers.reverse() : numbers;
  
   const labels3Data = adaptedNumber.map(number => (
    filteredRanks(number)
  ))

  const xAxisLabel = axes.filter((i: any) => i.RankType_Id === graphType);

  const labels = xAxisLabel.map((item: any) => {
    if (item.Name.split(" ").length > 1) {
      return item.Name.split(" ").reverse()
    } else {
      return item.Name
    }
  }).reverse();

  const ranksNumber = (rankName: string) => {
    if (graphType === 1) {
      return DataArr.filter((i: any) => i?.RanktitleName === rankName).length
    }

    if (graphType === 2) {
      return DataArr.filter((i: any) => i?.RanktitleName === rankName).length
    }

    if (graphType === 3) {
      return labels3Data
    }
  }

  const labelsData = xAxisLabel.map(item => ranksNumber(item.Name)).reverse();

  return [labelsData, labels, labels3Data]

}

export default useAxesValues;