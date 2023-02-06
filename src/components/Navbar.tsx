import React, { useState, useEffect, useCallback } from "react";
import logo from "../assets/logo.svg";
import advancedFilter from "../assets/advanced-filter.svg";
import { NavLink, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import ProfileNavbar from "./ProfileNavbar";
// import { NavLink, useLocation } from "react-router-dom";
// import AdvancedSearch from "./AdvancedSearch";
// import ProfileNavbar from "./ProfileNavbar";

function Navbar() {
  const [searchShow, setSearchShow] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
 const pathname = useLocation();

  useEffect(() => {
    resetState();
  }, [pathname]);

  // const isNavbarShow = pathname.pathname !== "/sign-in";

  function resetState() {
    setSearchShow(false);
  }

  let activeStyle = {
    borderBottom: "1px solid #39836B",
    paddingBottom: "4px",
  };

  let defaultStyle = {
    borderBottom: "1px solid #B0D1C6",
    paddingBottom: "4px",
  };

  const onCloseAdvancedSearch = useCallback(() => {
    setAdvancedSearch(false);
    setSearchShow(false);
  }, [advancedSearch]);

  const navList = [
    // {
    //   id: 1,
    //   name: "Sectors",
    //   link: "/Sectors",
    // },
    {
      id: 1,
      name: "HumanPower",
      link: "/",
    },
    {
      id: 2,
      name: "Human capabilities",
      link: "/human-capabilities",
    },
    // {
    //   id: 4,
    //   name: "القائمة",
    //   link: "/List",
    // }, //
  ];

  return (
    <div className="bg-white drop-shadow-[0_2px_4px_rgba(57,131,107,0.25)] border-b sticky top-0 z-50">
      <nav className=" max-w-full w-[1122px] mx-auto relative">
        <div className="flex h-20 items-center">
          <img src={logo} alt="logo" className="mr-auto pr-4" />
          <ul className="h-full flex text-center">
            {navList.map((item) => (
              <li
                key={item.id}
                className={`text-[#39836B] border-r px-4 pt-7 hover:bg-[#ECF3ED] cursor-pointer
                 ${pathname.pathname === item.link ? "bg-[#ECF3ED]" : ""} 
             
              `}
              >
                <NavLink
                  className="relative"
                  to={item.link}
                  style={({ isActive }) =>
                    isActive ? activeStyle : defaultStyle
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="text-[#353334] border-r px-10 pt-7 text-[10px] flex flex-col items-center cursor-pointer">
              <button onClick={() => setSearchShow(!searchShow)}>
                <BsSearch className="mx-auto mb-1 text-lg text-[#C3A355]" />
                Search
              </button>
            </li>
            {searchShow && (
              <div className="max-w-full w-[1122px] h-12 border absolute -bottom-14 left-0 bg-white rounded flex items-center px-5">
                <BsSearch className="text-[#39836B]" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="text-xs outline-none ml-2 text-[#39836B] py-2"
                />
                <img
                  src={advancedFilter}
                  className="cursor-pointer ml-auto"
                  onClick={() => setAdvancedSearch(!advancedSearch)}
                />
                {/* {advancedSearch && (
                  <AdvancedSearch onDecline={onCloseAdvancedSearch} />
                )} */}
              </div>
            )}
            <li className="text-[#353334] border-r px-4 pt-6 text-[10px]">
              <ProfileNavbar />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
