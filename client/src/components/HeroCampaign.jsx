/* eslint-disable react/prop-types */
import React from "react";
import { tagType, thirdweb } from "../assets";
import { daysLeft } from "../utils";
import { calculateBarPercentage } from "../utils";
import CustomButton from "./CustomButton";
const HeroCampaign = ({ data, handleClick }) => {
  const remainingDays = daysLeft(data.deadline);
  let campaignStateStyle = "";
  const setCampaignStyle = () => {
    switch (data.state) {
      case 0: {
        campaignStateStyle = "text-14[px] font-bold text-yellow-500";
        break;
      }
      case 1: {
        campaignStateStyle = "text-[14px] font-bold text-[#1dc071] italic";
        break;
      }
      case 2: {
        campaignStateStyle = "text-[14px] font-bold text-[#FF0000] italic";
        break;
      }
      default: {
        break;
      }
    }
  };
  setCampaignStyle();

  let campaignStateElement = (
    <p className={campaignStateStyle}>
      {data.state == 0
        ? "Chưa sẵn sàng"
        : data.state == 1
        ? "Đang mở"
        : "Đã kết thúc"}
    </p>
  );
  return (
    <div>
      <h1 className="font-semibold text text-[30px]">Top trending:</h1>
      <div className="flex w-full">
        <img
          src={data.image}
          alt="campaign-image"
          className="w-[50%] h-[300px] object-cover rounded-[15px]"
        />

        <div className="flex-1 flex flex-col p-4 flex-wrap">
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
            <h3 className="font-semibold text-[24px] text-left  leading-[26px]">
              {data.title}
            </h3>
            <p className="mt-[40px] whitespace-normal font-normal text-[#808191] text-left leading-[18px] truncate">
              {data.description.split(" ").slice(0, 20).join(" ")} ...
            </p>
          </div>

          <div className="flex flex-col mt-[15px] gap-2">
            <div className="flexw-full">
              <div className=" w-full h-[20px] bg-[#ddd] mt-2 rounded-[10px] overflow-hidden">
                <div
                  className="h-full bg-[#4acd8d]"
                  style={{
                    width: `${calculateBarPercentage(
                      data.target,
                      data.collected
                    )}%`,
                    maxWidth: "100%",
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-row justify-between bottom-0">
              <div>
                <h4 className="font-semibold text-[14px] leading-[22px]">
                  {data.collected}
                </h4>
                <p className="mt-[3px] font-normal text-[12px] leading-[18px] sm:max-w-[120px] truncate">
                  Target of {data.target}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[14px]  leading-[22px]">
                  Status
                </h4>
                {campaignStateElement}
              </div>
              <div>
                <h4 className="font-semibold text-[14px]  leading-[22px]">
                  {remainingDays} Days
                </h4>
                <p className="mt-[3px] font-normal text-[12px] leading-[18p] sm:max-w-[120px] truncate">
                  Remaining Times
                </p>
              </div>
            </div>
            <CustomButton
              btnType="button"
              title="More details"
              styles={`bg-[#1dc071] w-[200px] h-[15px] bottom-0 mt-[8px]`}
              handleClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCampaign;
