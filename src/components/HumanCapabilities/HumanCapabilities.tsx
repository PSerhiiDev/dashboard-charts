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
      <div className="mt-[40px] flex gap-[30px] h-[320px] text-[#39836B]
      xl:gap-3 xl:justify-center lg:flex-wrap lg:h-full lg:max-w-2xl lg:mx-auto 
      sm:flex-col sm:items-center
      ">
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[258px] xl:order-1">
          <h1>Qualification</h1>
          <QualificationsChart />
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[474px] 
        xl:order-3 sm:w-[350px] sm:px-[10px]">
          <h1 className="">Sections</h1>
          <SectionsChart />
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[330px] xl:order-2">
          <h1>Languages</h1>
          <div className="flex">
            <LanguagesChart />
          </div>
        </div>
      </div>
      <div className="mt-7 mb-10 flex gap-[30px]  text-[#39836B]
      xl:gap-3 xl:justify-center lg:flex-wrap lg:h-full lg:max-w-2xl lg:mx-auto 
      sm:flex-col sm:items-center
      ">
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[546px] h-[320px] flex flex-col 
        xl:order-3 sm:h-[350px] sm:w-[350px]">
          <h1>Education</h1>
          <MajorsChart />
        </div>
        <div className="rounded-md bg-white py-[17px] px-[20px] w-[258px] h-[320px] xl:order-2">
          <h1>Universities</h1>
          <UniversitiesChart />
        </div>
        <div className="rounded-md bg-white py-[17px] pr-[10px] w-[258px] h-[320px] xl:order-1">
          <h1 className="pl-1.5">Talents</h1>
          <TalentsChart />
        </div>
      </div>
    </div>
  );
}

export default HumanCapabilities;
