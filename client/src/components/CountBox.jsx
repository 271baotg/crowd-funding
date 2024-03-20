import React from "react";

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-bold text-[30px] text-white p-3 bg-[#1c1c24] rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="text-center font-normal text-[16px] text-[#808191] bg-[#2828e] px-3 py-2 w-full rounded-b-[10px]">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
