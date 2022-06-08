import React from "react";
import { ReactComponent as Close } from "../../images/charm_cross.svg";
import { ReactComponent as Success } from "../../images/success.svg";

function SuccessModal({ isOpen, closeModal }) {
  return (
    <>
      {isOpen && (
        <div className="absolute top-0 z-10 w-full bg-slate-500 bg-opacity-60 min-h-screen flex justify-center items-center">
          <div className="bg-white rounded-xl z-30 p-12 relative w-5/12">
            <Close
              className="absolute top-2 right-2 cursor-pointer"
              onClick={closeModal}
            />
            <Success className="w-3/5 mx-auto" />
            <div className="text-center text-[#01AA13] font-bold text-3xl mt-8">
              Presensi berhasil dicatat
            </div>
            <div onClick={closeModal} className="text-center cursor-pointer text-lg">Klik untuk melanjutkan</div>
          </div>
        </div>
      )}
    </>
  );
}

export default SuccessModal;
