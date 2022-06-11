import React from "react";

function ButtonDisabled({ isDisabled, isFilled, text }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={classNames(
        isFilled
          ? "bg-[#29B6F6] hover:bg-[#66CFFF]"
          : "bg-[#D8D8D8] text-[#A0A0A0]",
        "py-2 px-8 border border-green text-md rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0288D1]"
      )}
    >
      {text}
    </button>
  );
}

export default ButtonDisabled;
