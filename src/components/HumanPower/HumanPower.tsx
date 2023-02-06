import React from "react";
import femaleIcon from "../../assets/female-icon.svg";
import maleIcon from "../../assets/male-icon.svg";
import pieIcon from "../../assets/pie-charts-icon.svg";
import listIcon from "../../assets/list-menu-icon.svg";
import infoIcon from "../../assets/info-icon-non-saudi.svg";
import Json from "../../AllData-json.json";
// import "./HumanPower.css";
// import SearchOptionsBar from "./SearchOptionsBar";
// import PageTitle from "./PageTitle";
// import PageContainer from "./PageContainer";
// import PieChartContent from "./charts/PieChart";
// import Doughnut from "./charts/Doughnut";
// import RadialChart from "./charts/RadialChart";
// import useLiteral from "../hooks/useLiteral";
// import BarChart from "./charts/BarChart";
import { useNavigate } from "react-router-dom";
import useLiteral from "../hooks/useLiteral";
import PageTitle from "../PageTitle";
import NoDataMessage from "../charts/NoDataMessage";
import MaritalChart from "../charts/MaritalChart/MaritalChart";
import AgeGroupChart from "../charts/AgeGroupChart";
import RetirementChart from "../charts/RetirementChart/RetirementChart";
import RanksChart from "../charts/RanksChart/RanksChart";
// import NoDataMessage from "./charts/NoDataMessage";

function HumanPower() {
  const arrData = Json.Employee;

  const navigate = useNavigate();

  const [malesPer, femalesPer] = useLiteral("Gender", "male");
  const checkIfEmpty = malesPer !== 0 && femalesPer !== 0 ? true : false;
  // in case we will need Nationality
  // const [saudisPer, nonSaudiPer] = useLiteral("Nationality_Id", 1);

  return (
    <div className="relative human-power max-w-7xl m-auto">
      {/* <div className="absolute left-0 top-8">
        <div className=" bg-[#53AA8A] p-2.5 rounded-tr-lg cursor-pointer">
          <img src={pieIcon} alt="" />
        </div>
        <div
          className="bg-[#d4d4d4] py-3 px-2.5 rounded-br-lg cursor-pointer"
          onClick={() => navigate("/List")}
        >
          <img src={listIcon} alt="" />
        </div>
      </div> */}

      <div>
        <div className="flex align-items gap-4">
          <PageTitle title="Human staff" />
          {/* <SearchOptionsBar itemsCount={5} /> */}
        </div>
        <div className="mt-[40px]  flex gap-7 h-[320px] text-[#39836B]">
          <div className="rounded-md bg-white w-[270px] p-4">
            <h1>Marital status</h1>
            <div>
              <MaritalChart />
            </div>
          </div>

          {/* First row middle column div */}
          <div className="w-[258px] flex flex-col gap-5 ">
            {/* Gender div */}
            <div className="rounded-md bg-white p-4 pb-16 h-screen">
              <h1>Sex</h1>
              {checkIfEmpty ? (
                <div>
                  <div className="mt-8 mb-12">
                    <div className="bg-[#DBDBDB55] py-3 px-3 mb-4">
                      <div
                        style={{ width: `${malesPer}%` }}
                        className="bg-[#39836B] h-2.5 rounded-lg "
                      ></div>
                    </div>

                    <div className="bg-[#DBDBDB55] py-3 px-3">
                      <div
                        style={{ width: `${femalesPer}%` }}
                        className="bg-[#C3A355] h-2.5 rounded-lg w-[10px]"
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-8 justify-center items-center mt-4">
                    <div className="flex gap-1">
                      <p className="text-sm mr-1.5 items-center text-end text-[#53aa8a]">
                        <span className="block mt-1  text-xl font-black text-[#39836B]">{`${malesPer}%`}</span>
                        Male
                      </p>
                      <img src={maleIcon} alt="" className="w-[17px]" />
                    </div>
                    <div className="flex gap-1 items-center">
                      <p className="text-[#C3A355] text-sm mr-1.5 text-end">
                        <span className="block mt-1 text-xl font-black text-[#C3A355]">{`${femalesPer}%`}</span>
                        Female
                      </p>
                      <img src={femaleIcon} alt="" className="w-[20px]" />
                    </div>
                  </div>
                </div>
              ) : (
                <NoDataMessage />
              )}
            </div>
            {/* end of gender div */}
            {/* Nationality div */}
            {/* <div className="rounded-md bg-white h-[145px] p-4">
            <h1>الجنسية</h1>
            <div className="flex gap-10 justify-center items-center mt-4">
              <div className="text-center text-sm text-[#53aa8a]">
                <p className="font-bold text-lg">{`%${saudisPer}`}</p>
                <p>سعودي</p>
              </div>
              <div className="text-center  text-[#C3A355] relative">
                <p className="font-bold text-lg">{`%${nonSaudiPer}`}</p>
                <p className="text-sm">غير سعودي</p>
                <img
                  src={infoIcon}
                  alt=""
                  className="absolute top-0 left-0 cursor-pointer"
                />
              </div>
            </div>
          </div> */}
            {/* End of nationality div */}
          </div>
          {/* end of first row middle column div */}

          <div className="rounded-md bg-white w-[540px] p-4">
            <h1>Age group</h1>
            <h2 className="text-black mt-3 text-end mr-3">Number</h2>
<AgeGroupChart />
            {/* <PieChartContent /> */}
          </div>
        </div>

        <div className="mt-7 mb-10 max-w-full mx-auto flex gap-7 h-[320px] text-[#39836B]">
          <div className="rounded-md bg-white w-[370px] p-4">
          <h1>Expected Retirement</h1>
            <h2 className="mt-3 text-[#000] text-end">Number of years</h2>
            <RetirementChart />
            {/* <Doughnut /> */}
          </div>
          <div className="rounded-md bg-white w-[720px] p-4">
            <h1>Ranks</h1>
            <RanksChart />
            {/* الرتب */}
            {/* <BarChart /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HumanPower;
