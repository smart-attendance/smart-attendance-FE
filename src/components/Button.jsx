import React from "react";

function Button({ text, clickHandler }) {
  return (
    <div
      className="bg-[#29B6F6] hover:bg-[#66CFFF] cursor-pointer px-3 py-1 rounded-md text-white"
      onClick={clickHandler}
    >
      {text}
    </div>
  );
}

export default Button;
