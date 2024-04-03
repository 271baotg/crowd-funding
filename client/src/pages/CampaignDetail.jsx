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
import { ReturnFundResultModal } from "../components/ReturnFundResultModal";

const CampaignDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, widthdraw, returnFund, contract, address } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);
  const [isOpenWidthdrawResultModal, setIsOpenWidthdrawResultModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOpenReturnFund, setIsOpenReturnFund] = useState(false);
  const [isWidthdraw, setIsWidthdraw] = useState(false);
  const [isReturnFund, setIsReturnFund] = useState(false);


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
    try {
      const result = await donate(state.id, amount);
      if (result != false) {
        setStatus("Campaign funding succeeded");
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
      if (result == false) {
        setStatus("Campaign funding failed");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 5000);
      }
    } catch (error) {
      setStatus("Campaign funding error");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      getDonators();
    }
  };

  const handleWidthdraw = async () => {
    if (state.collected < state.target) {
      setIsOpenWidthdrawResultModal(true);
      setIsWidthdraw(false);
    }
    else {
      const result = await widthdraw(state.id);
      if (result) {
        setIsWidthdraw(true);
      } else {
        setIsWidthdraw(false);
      }

      setIsOpenWidthdrawResultModal(true);
    }
  }

  const handleReturn = async () => {
    const result = await returnFund(state.id);
    if (result) {
      setIsReturnFund(true);
    } else {
      setIsReturnFund(false);
    }
    setIsOpenReturnFund(true);
  }

  const remainingDays = daysLeft(state.deadline);
  return (
    <div>
      {isOpenWidthdrawResultModal &&
        <WidthdrawResultModal
          title={"This is the title"}
          isWidthdraw={isWidthdraw}
          closeButton={true}
          onCloseModal={() => { setIsOpenWidthdrawResultModal(false) }}
        >
          <h1>This is body</h1>
        </WidthdrawResultModal>
      }

      {isOpenReturnFund &&
        <ReturnFundResultModal
          title={"This is the title"}
          isReturnFund={isReturnFund}
          closeButton={true}
          onCloseModal={() => { setIsOpenReturnFund(false) }}
        >
          <h1>This is body</h1>
        </ReturnFundResultModal>
      }

      {isOpen && (
        <Modal
          onCloseModal={() => {
            () => {
              setIsOpen(false);
            };
          }}
          background={"bg-white"}
          textColor={"text-black"}
        >
          <Modal.Header
            title={"Fund Campaign"}
            onClose={() => {
              setIsOpen(false);
            }}
            closeButton={true}
          ></Modal.Header>
          <Modal.Body>
            <div className="p-4 overflow-y-auto">
              {isLoading && (
                <div>
                  <img
                    src={loader}
                    alt="loading"
                    className="w-[100px] h-[100px] m-auto object-contain"
                  />
                  <div className="m-auto text-center">
                    <h3 className="text-[#1dc071] text-[24px] font-semibold">
                      Wating for confirm ...
                    </h3>
                  </div>
                </div>
              )}
              <p className="mt-1 text-black text-center m-auto">
                Do you want to continue the fundraising campaign?
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
              }}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#hs-basic-modal"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDonate}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Continue
            </button>
          </Modal.Footer>
        </Modal>
      )}

      {isSuccess && (
        <div className="fixed inset-0 z-80 flex items-baseline justify-end overflow-x-hidden overflow-y-auto sm:py-6 sm:px-4 sm:px-0">
          <div
            id="alert-additional-content-3"
            className=" p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Success</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">{status}</div>
            <div className="flex">
              <button
                type="button"
                onClick={() => { setIsSuccess(false) }}
                className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
                data-dismiss-target="#alert-additional-content-3"
                aria-label="Close"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="fixed inset-0 z-80 flex items-baseline justify-end overflow-x-hidden overflow-y-auto sm:py-6 sm:px-4 sm:px-0">
          <div
            id="alert-additional-content-2"
            className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Failed</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">{status}</div>
            <div className="flex">
              <button
                type="button"
                onClick={() => setIsError(false)}
                className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
                data-dismiss-target="#alert-additional-content-2"
                aria-label="Close"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

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

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[20px] flex flex-col gap-4 ">
              {donators.length > 0 ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Wallet address
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Donator
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {donators.map((item, index) => (
                      <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={`${item}-${index}`}>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {index + 1}. {item.donator}
                        </td>
                        <td className="px-6 py-4">
                          {item.donation} (ETH)
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                handleClick={() => { setIsOpen(!isOpen) }
                }
              />
              <CustomButton
                btnType="button"
                title="Widthdraw"
                styles="w-full mt-2 bg-[#c48c39]"
                handleClick={handleWidthdraw}
              />
              <CustomButton
                btnType="button"
                title="Return fund"
                styles="w-full mt-2 bg-red-500"
                handleClick={handleReturn}
              />

            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CampaignDetail;
