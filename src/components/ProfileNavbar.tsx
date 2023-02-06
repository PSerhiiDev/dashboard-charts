import { useRef, useState } from "react";
import profileIcon from "../assets/Icon-user-circle.svg";
import profileMinIcon from "../assets/profile-min-icon.png";
import logOutIcon from "../assets/log-out-icon.svg";
import { useNavigate } from "react-router-dom";
// import useClickOutside from "../../hooks/useClickOutside";
// import { useDispatch, useSelector } from "../../store/hooks";
// import { globalActions, globalSelectors } from "../../store/global";

const ProfileNavbar = () => {
  // const [isPopupShow, setIsPopupShow] = useState<boolean>(false);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const isLoggedIn = useSelector(globalSelectors.getIsLoggedIn);
  // const username = useSelector(globalSelectors.getUsername);

  // const profileRef = useRef<HTMLInputElement>(null);
  // useClickOutside(profileRef, () => setIsPopupShow(false));

  // const handleProfileMinClick = () => {
  //   navigate("/profile");
  //   setIsPopupShow(false);
  // };

  // const handleProfileClick = () => {
  //   if (isLoggedIn) {
  //     setIsPopupShow(!isPopupShow);
  //   } else {
  //     navigate("/sign-in");
  //   }
  // };

  // const handleLogoutClick = () => {
  //   // dispatch(globalActions.setIsLoggedIn(false));
  //   setIsPopupShow(false);
  //   navigate("/sign-in");
  // };

  return (
    <div className="relative" >
      <button
        // onClick={handleProfileClick}
        className="flex flex-col items-center gap-[3px]"
      >
        <img src={profileIcon} alt="Profile Icon" />
        <p>Name Surname</p>
        {/* <p>{isLoggedIn ? username : "تسجيل الدخول"}</p> */}
      </button>
      {/* {isPopupShow && (
        <div className="absolute text-[10px] text-[#29624F] w-[132px] bg-[#FFFFFF] shadow-[0_3px_6px_#00000029] rounded-[5px] rounded-tr-[0px] top-[60px] right-[-17px]">
          <button
            className="flex items-center gap-[5px] my-[12px] mr-[8px]"
            onClick={handleProfileMinClick}
          >
            <img src={profileMinIcon} alt="Profile" width="12px" />
            <span>الملف الشخصي</span>
          </button>
          <div className="w-full h-[0.2px] bg-[#D6D6D6]" />
          <button
            className="flex items-center gap-[5px] my-[12px] mr-[8px]"
            onClick={handleLogoutClick}
          >
            <img src={logOutIcon} alt="Log out" />
            <span>تسجيل خروج</span>
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProfileNavbar;
