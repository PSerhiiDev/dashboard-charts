import React from "react";
import LanguagesChart from "../charts/LanguagesChart";
import MajorsChart from "../charts/MajorsChart";
import QualificationsChart from "../charts/QualificationsChart";
import SectionsChart from "../charts/SectionsChart";
import TalentsChart from "../charts/TalentsChart";
import UniversitiesChart from "../charts/UniversitiesChart";
import PageTitle from "../PageTitle";
import "./HumanCapabilities.css";

function HumanCapabilities() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex align-items gap-4">
        <PageTitle title="Human capabilities" />
      </div>
      <div className="mt-[40px] flex gap-[30px] h-[320px] text-[#39836B]">
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[258px]">
          <h1>Qualification</h1>
          <QualificationsChart />
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[474px]">
          <h1 className="">Sections</h1>
          <SectionsChart />
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[330px]">
          <h1>Languages</h1>
          <div className="flex">
            <LanguagesChart />
          </div>
        </div>
      </div>
      <div className="mt-7 mb-10 flex gap-[30px] h-[320px] text-[#39836B]">
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[546px] flex flex-col">
          <h1>Education</h1>
          <MajorsChart />
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[258px]">
          <h1>Universities</h1>
          <UniversitiesChart />
        </div>
        <div className="rounded-md bg-white py-[17px] pr-[10px] w-[258px]">
          <h1 className="pl-1.5">Talents</h1>
          <TalentsChart />
        </div>
      </div>
    </div>
  );
}

export default HumanCapabilities;
