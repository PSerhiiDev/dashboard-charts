import React from "react";
import PageTitle from "../PageTitle";
// import LanguagesChart from "../charts/LanguagesChart";
// import MajorsChart from "../charts/MajorsChart";
// import QualificationsChart from "../charts/QualificationsChart";
// import SectionsChart from "../charts/SectionsChart";
// import TalentsChart from "../charts/TalentsChart/TalentsChart";
// import UniversitiesChart from "../charts/UniversitiesChart";
// import SearchOptionsBar from "../SearchOptionsBar";
// import PageTitle from "../PageTitle";
// import PageContainer from "../PageContainer";

import "./HumanCapabilities.css";

function HumanCapabilities() {
  return (
    <div>
      <div className="flex align-items gap-4">
        <PageTitle title="القدرات والجدارات" />
        {/* <SearchOptionsBar itemsCount={5} /> */}
      </div>
      <div className="mt-[40px] flex gap-[30px] h-[320px] text-[#39836B]">
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[258px]">
          <h1>المؤهل</h1>
          {/* <QualificationsChart /> */}
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[474px]">
          <h1>الأقسام</h1>
          {/* <SectionsChart /> */}
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[330px]">
          <h1>اللغات</h1>
          <div className="flex">
            {/* <LanguagesChart /> */}
          </div>
        </div>
      </div>
      <div className="mt-7 mb-10 max-w-full w-[1122px] mx-auto flex gap-[30px] h-[320px] text-[#39836B]">
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[546px] flex flex-col">
          <h1>التخصصات</h1>
          {/* <MajorsChart /> */}
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[258px]">
          <h1>الجامعات</h1>
          {/* <UniversitiesChart /> */}
        </div>
        <div className="rounded-md bg-white py-[17px] pr-[10px] w-[258px]">
          <h1>المواهب</h1>
          {/* <TalentsChart /> */}
        </div>
      </div>
    </div>
  );
}

export default HumanCapabilities;
