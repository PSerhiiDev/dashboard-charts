import femaleIcon from "../../assets/female-icon.svg";
import maleIcon from "../../assets/male-icon.svg";
import useLiteral from "../hooks/useLiteral";
import PageTitle from "../PageTitle";
import NoDataMessage from "../charts/NoDataMessage";
import MaritalChart from "../charts/MaritalChart/MaritalChart";
import AgeGroupChart from "../charts/AgeGroupChart";
import RetirementChart from "../charts/RetirementChart/RetirementChart";
import RanksChart from "../charts/RanksChart/RanksChart";

function HumanPower() {
  const [malesPer, femalesPer] = useLiteral("Gender", "male");
  const checkIfEmpty = malesPer !== 0 && femalesPer !== 0 ? true : false;

  return (
    <div className="relative human-power max-w-7xl m-auto">
      <div>
        <div className="flex align-items gap-4">
          <PageTitle title="Human staff" />
        </div>
        <div className="mt-[40px]  flex gap-7 h-[320px] text-[#39836B]">
          <div className="rounded-md bg-white w-[270px] p-4">
            <h1>Marital status</h1>
            <div>
              <MaritalChart />
            </div>
          </div>
          <div className="w-[258px] flex flex-col gap-5 ">
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
          </div>
          <div className="rounded-md bg-white w-[540px] p-4">
            <h1>Age group</h1>
            <h2 className="text-black mt-3 text-end mr-3">Number</h2>
            <AgeGroupChart />
          </div>
        </div>
        <div className="mt-7 mb-10 max-w-full mx-auto flex gap-7 h-[320px] text-[#39836B]">
          <div className="rounded-md bg-white w-[370px] p-4">
            <h1>Expected Retirement</h1>
            <h2 className="mt-3 text-[#000] text-end">Number of years</h2>
            <RetirementChart />
          </div>
          <div className="rounded-md bg-white w-[720px] py-4 px-2">
            <h1>Ranks</h1>
            <RanksChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HumanPower;
