/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import FundCard from "./FundCard";
import HeroCampaign from "./HeroCampaign";
const CampaignList = ({ title, isLoading, data }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <div className="flex flex-col flex-wrap mt-[30px] gap-[20px]">
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
        {!isLoading && data.length > 0 && (
          <HeroCampaign
            data={data[0]}
            handleClick={() => handleNavigate(data[0])}
          ></HeroCampaign>
        )}
        <>
          <h1 className="font-semibold text text-[30px]">
            Featured Campaign:{" "}
          </h1>
          <div className="flex flex-row gap-6 flex-wrap">
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
        </>
      </div>
    </div>
  );
};

export default CampaignList;
