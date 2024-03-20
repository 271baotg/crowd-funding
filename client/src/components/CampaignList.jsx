/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";
const CampaignList = ({ title, isLoading, data }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-semibold text-white text-[20px]">
        {title} ({data.length})
      </h1>

      <div className="flex flex-wrap mt-[30px] gap-[20px]">
        {isLoading && (
          <img
            src={loader}
            alt="loading"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && data.length == 0 && (
          <p className="font-semibold text-[14px] text-[#818183]">
            You have not created any campaigns
          </p>
        )}
        {!isLoading &&
          data.length > 0 &&
          data.map((campaign, i) => (
            <FundCard
              key={campaign.id}
              data={campaign}
              handleClick={() => handleNavigate(campaign)}
            ></FundCard>
          ))}
      </div>
    </div>
  );
};

export default CampaignList;
