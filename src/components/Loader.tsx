import { FC } from "react";

const Loader: FC = () => {
  return (
    <>
      <div className="w-screen h-screen bg-white fixed z-[100] overflow-y-hidden opacity-90" />
      <div className="relative">
        <div className="absolute w-screen h-screen z-[110] flex items-center justify-center bg-transparent">
          <div className="relative">
            <div className="animate-ping rounded-full bg-[#808080] w-12 h-12 absolute -left-3 -top-3" />
            <div className="rounded-full bg-[#39836b] w-12 h-12 absolute -left-3 -top-3" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
