import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { money } from "../assets";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import { checkIfImage } from "../utils";
import Context from "../context/Web3Context";

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

  const submitHandler = async (e) => {
    e.preventDefault();
    await createCampaign({
      ...form,
      target: ethers.utils.parseUnits(form.target, 18),
    });
    console.log(form);
  };

  const onChangeHandle = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loading..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
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
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
