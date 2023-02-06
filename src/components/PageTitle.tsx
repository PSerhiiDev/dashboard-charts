import { FC } from "react";

type TProps = {
  title: string;
  styles?: string;
};

const PageTitle: FC<TProps> = ({ title, styles }) => {
  return (
    <div className={`flex items-center w-full mt-9 ${styles}`}>
      <h1 className="text-xl text-[#29624F] whitespace-nowrap leading-none">
        {title}
      </h1>
      <div className="w-full h-px mr-3 bg-[#C3A355]"></div>
    </div>
  );
};

export default PageTitle;
