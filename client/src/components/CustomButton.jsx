import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles, isDisable }) => {
  return (
    <button
      type={btnType}
      className={`${styles} ${isDisable ? "cursor-not-allowed" : ""} font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]`}
      onClick={handleClick}
      disabled={isDisable}
    >
      {title}
    </button>
  );
};

export default CustomButton;
