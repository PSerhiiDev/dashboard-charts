import React from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

interface Props {
  color: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
  arrowClick: () => void;
}

const SwitchButton = ({
  color,
  text,
  isActive,
  onClick,
  arrowClick,
}: Props) => {
  return (
    <div className="flex items-center gap-[5px]">
      <button onClick={arrowClick}>
        <ArrowLeft className={`text-[${color}]`} />
      </button>
      <button
        className={`text-[${color}] flex items-center gap-[4px]`}
        onClick={onClick}
      >
        <h5 className="text-[12px] w-[68px]">{text}</h5>
        <div
          className={`w-[11px] h-[11px] rounded-full border border-[${color}]`}
        >
          {isActive && (
            <div
              className={`w-[7px] h-[7px] m-[1px] rounded-full`}
              style={{
                background: color,
              }}
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default SwitchButton;
