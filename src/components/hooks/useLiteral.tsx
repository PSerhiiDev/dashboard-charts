// import { selectors } from "../store/filters/selectors";
// import { useSelector } from "../store/hooks";
import Json from "../../AllData-json.json";

const arrData = Json.Employee;

const useLiteral = (iterateValue: any, condition: any) => {
  // const filteredEmployee = useSelector(
  //   selectors.getFilteredTableData("Employee")
  // );

 if (arrData.length > 0 ) {
   const array = arrData.map((i: any) => i[iterateValue]);
   let count1 = 0;
   let count2 = 0;
   const arrayLength = array.length;
  
   for (let item of array) {
     if (item == condition) {
       count1 += 1;
     } else count2 += 1;
   }
  
   const iterate1 = ((count1 / arrayLength) * 100).toFixed(0);
   const iterate2 = ((count2 / arrayLength) * 100).toFixed(0);
  
   return [iterate1, iterate2];

 }

 return [0, 0];

}

export default useLiteral