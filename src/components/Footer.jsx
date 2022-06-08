import React from "react";

function Footer({ color }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <div
      className={classNames(
        color ? `bg-[${color}]` : "bg-white",
        "absolute w-full bottom-0 py-3 px-12 lg:px-32 flex justify-between items-center drop-shadow-2xl"
      )}
    >
      <div className="mx-auto font-light">©️ Smart Attendance - 2022</div>
    </div>
  );
}

export default Footer;
