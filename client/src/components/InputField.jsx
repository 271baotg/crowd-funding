import React from "react";

const InputField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className="flex-1 flex flex-col">
      {labelName && (
        <span className="font-medium text-[14px] leading-[14px] mb-[10px] text-white">
          {labelName}
        </span>
      )}

      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={10}
          className="py-[15px] px-[30px] outline-none bg-transparent border-[1px] border-[#3a3a43]  rounded-[10px]"
        ></textarea>
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] px-[30px] outline-none bg-transparent border-[1px] border-[#3a3a43] rounded-[10px]"
        />
      )}
    </label>
  );
};

export default InputField;
