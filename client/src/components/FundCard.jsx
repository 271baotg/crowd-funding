/* eslint-disable react/prop-types */
import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";

const FundCard = ({ data, handleClick }) => {
  const remainingDays = daysLeft(data.deadline);

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-[#ffffff] cursor-pointer shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]"
      onClick={handleClick}
    >
      <img
        src={data.image}
        alt="campaign-image"
        className="w-full h-[150px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img
            src={tagType}
            alt="tag"
            className="w-[20px] h-[20px] object-contain"
          />
          <p className="ml-[14px] mt-[2px] font-medium text-[12px] text-[#808191]">
            Financial
          </p>
        </div>

        <div className="block">
          <h3 className="font-semibold text-[16px] text-left  leading-[26px]">
            {data.title}
          </h3>
          <p className="mt-[5px] font-normal text-[#808191] text-left leading-[18px] truncate">
            {data.description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px] leading-[22px]">
              {data.collected}
            </h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate">
              Target of {data.target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-[14px]  leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-normal text-[12px] leading-[18p] sm:max-w-[120px] truncate">
              Remaining Times
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
