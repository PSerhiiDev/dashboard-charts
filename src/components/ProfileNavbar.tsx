import profileIcon from "../assets/Icon-user-circle.svg";

const ProfileNavbar = () => {
  return (
    <div className="relative" >
      <button
        className="flex flex-col items-center gap-[3px]"
      >
        <img src={profileIcon} alt="Profile Icon" />
        <p>Name Surname</p>
      </button>
    </div>
  );
};

export default ProfileNavbar;
