/* eslint-disable react/prop-types */
import React from "react";

const HeadBox = ({ data, setOption }) => {
  console.log("Headbox: ", data);
  return (
    <div
      onClick={() => setOption(data.category)}
      className={`${
        data.selected ? `bg-white` : `bg-[#000000]`
      } flex w-full cursor-pointer flex-col justify-between gap-8 py-4 px-3 items-center`}
    >
      <div className="flex flex-row gap-6 items-center">
        <div className={`${data.color} w-[2px] h-[32px] rounded-sm`}></div>
        <div className="flex flex-col items-start justify-center">
          <p
            className={`${
              data.selected ? `text-gray-800` : `text-white`
            } text-[16px]`}
          >
            {data.category}
          </p>
          <p className="text-gray-400 text-[13px]">
            {data.category} transactions
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeadBox;
