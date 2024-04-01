import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { loader } from "../assets";
import { money } from "../assets";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { checkIfImage } from "../utils";
import Context, { Web3Context } from "../context/Web3Context";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { account, createCampaign } = useContext(Context);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [Status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const toggleSuccessAlert = (e) => {
    e.preventDefault();
    setIsSuccess(!isSuccess);
  }

  const toggleErrorAlert = (e) => {
    e.preventDefault();
    setIsError(!isError);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toggleModal(e);
    try {
      const result = await createCampaign({
        ...form,
        target: ethers.utils.parseUnits(form.target, 18),
      });
      if (result) {
        setStatus("Successfully creating a campaign")
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        setStatus("Decline to create a campaign");
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      setStatus("Error: Unable to create campaign.");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeHandle = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };


  return (
    <div className="bg-[#ffffff] flex justify-center items-center flex-col border-2 border-gray-300 rounded-[10px] sm:p-10 p-4">

      {isLoading && (
        <img
          src={loader}
          alt="loading"
          className="w-[100px] h-[100px] object-contain"
        />
      )}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] border-2 border-black-300 bg-transparent rounded-[10px]">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-[#4acd8d]">
          Start a campaign
        </h1>
      </div>

      <form
        onSubmit={submitHandler}
        className="w-full flex flex-col gap-[30px] mt-12"
      >
        <div className="flex flex-wrap gap-[30px]">
          <InputField
            labelName="Your name"
            placeholder="Please enter your name"
            inputType="text"
            value={form.name}
            handleChange={(e) => onChangeHandle("name", e)}
          />
          <InputField
            labelName="Campaign title"
            placeholder="Please enter your name"
            inputType="text"
            value={form.title}
            handleChange={(e) => onChangeHandle("title", e)}
          />
        </div>
        <InputField
          labelName="Story behind"
          placeholder="Descibe the story and idea behind your project"
          inputType="text"
          isTextArea="true"
          value={form.description}
          handleChange={(e) => onChangeHandle("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <InputField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            step="0.1"
            value={form.target}
            handleChange={(e) => onChangeHandle("target", e)}
          />
          <InputField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => onChangeHandle("deadline", e)}
          />
        </div>

        <InputField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => onChangeHandle("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            handleClick={toggleModal}
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-80 flex items-baseline justify-center overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 sm:py-6 sm:px-4 sm:px-0">
            <div className="bg-white dark:bg-gray-800 sm:max-w-lg sm:w-full rounded-xl shadow-sm">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  New Campaign
                </h3>
                <button type="button" onClick={toggleModal} className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-basic-modal">
                  <span className="sr-only" >Close</span>
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <p className="mt-1 text-gray-800 dark:text-gray-400">
                  Do you want to continue creating a campaign?
                </p>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                <button type="button" onClick={toggleModal} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-basic-modal">
                  Cancel
                </button>
                <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </form>

      {isSuccess && (
        <div className="fixed inset-0 z-80 flex items-baseline justify-end overflow-x-hidden overflow-y-auto sm:py-6 sm:px-4 sm:px-0">
          <div id="alert-additional-content-3" className=" p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <div className="flex items-center">
              <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Success</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
              {Status}
            </div>
            <div className="flex">
              <button type="button" className="text-white bg-green-800 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                  <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                View more
              </button>
              <button type="button" onClick={toggleSuccessAlert} className="text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800" data-dismiss-target="#alert-additional-content-3" aria-label="Close">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className="fixed inset-0 z-80 flex items-baseline justify-end overflow-x-hidden overflow-y-auto sm:py-6 sm:px-4 sm:px-0">
          <div id="alert-additional-content-2" className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <div className="flex items-center">
              <svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Failed</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
              {Status}
            </div>
            <div className="flex">
              <button type="button" onClick={toggleErrorAlert} className="text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800" data-dismiss-target="#alert-additional-content-2" aria-label="Close">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CreateCampaign;
