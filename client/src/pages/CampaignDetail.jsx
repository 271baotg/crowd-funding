import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import CustomButton from "../components/CustomButton";
import CountBox from "../components/CountBox";
import { loader } from "../assets";
import { calculateBarPercentage, daysLeft } from "../utils";
import { thirdweb } from "../assets";
import Context from "../context/Web3Context";
import { WidthdrawResultModal } from "../components/WidthdrawResultModal";
import { Modal } from "../components/Modal/Modal";

const CampaignDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, widthdraw, contract, address } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [isOpenWidthdrawResultModal, setIsOpenWidthdrawResultModal] = useState(false);

  useEffect(() => {
    getDonators();
    console.log("State: ", state);
  }, []);

  const getDonators = async () => {
    const data = await getDonations(state.id);
    console.log("Donators: ", data);
    setDonators(data);
  };

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.id, amount);
    setIsLoading(false);
  };

  const handleWidthdraw = async () => {
    if (state.collected < state.target) {
      setIsOpenWidthdrawResultModal(true);
    }
    else {
      await widthdraw(state.id);
      setIsOpenWidthdrawResultModal(true);
    }
  }

  const remainingDays = daysLeft(state.deadline);
  return (
    <div>
      {isLoading && (
        <img
          src={loader}
          alt="loading"
          className="w-[100px] h-[100px] object-contain"
        />
      )}
      {isOpenWidthdrawResultModal &&
        <WidthdrawResultModal
          title={"This is the title"}
          closeButton={true}
          onCloseModal={() => { setIsOpenWidthdrawResultModal(false) }}
        >
          <h1>This is body</h1>
        </WidthdrawResultModal>}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[20px] bg-[#ddd] mt-2 rounded-[10px] overflow-hidden">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.collected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Thời gian còn lại" value={remainingDays} />
          <CountBox
            title={`Mục tiêu ${state.collected} / ${state.target}`}
            value={state.collected}
          />
          <CountBox title="Người ủng hộ" value={0} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-semibold text-[18px]  uppercase">Creator</h4>
            <div className="mt-[30px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-semibold text-[14px]  break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-normal text-[12px] ">
                  20 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] uppercase">Story</h4>
            <div className="mt-[20px]">
              <p className="mt-[4px] font-normal text-[16px]  leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          {/* Donators */}
          <div>
            <h4 className="font-semibold text-[18px] uppercase">Donators</h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item[index]}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px]  uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-[#4acd8d] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] font-semibold text-center text-[#fff]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#fff] bg-[#fff] font-epilogue  text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#f1f1f4] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] ">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#284f52]"
                handleClick={handleDonate}
              />
              <CustomButton
                btnType="button"
                title="Widthdraw"
                styles="w-full mt-2 bg-[#c48c39]"
                handleClick={handleWidthdraw}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
