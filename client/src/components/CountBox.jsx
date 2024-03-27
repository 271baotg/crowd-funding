import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px] ">
      <h4 className="font-bold text-[30px] p-3 text-[#4acd8d] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="text-center font-normal text-[16px] bg-[#ddd] text-[#000000] px-3 py-2 w-full rounded-b-[10px]">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
