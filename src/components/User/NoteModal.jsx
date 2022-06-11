import React, { useState } from "react";
import { ReactComponent as Close } from "../../images/charm_cross.svg";
import { ReactComponent as Warn } from "../../images/warn.svg";
import ButtonDisabled from "../ButtonDisabled";

function NoteModal({
  inputData,
  handleInput,
  isOpenFalse,
  closeModalFalse,
  handleSubmitNote,
}) {
  return (
    <>
      {isOpenFalse && (
        <div className="absolute top-0 z-10 w-full bg-slate-500 bg-opacity-60 min-h-screen flex justify-center items-center">
          <div className="bg-white rounded-xl z-30 p-12 relative w-5/12">
            <Close
              className="absolute top-2 right-2 cursor-pointer"
              onClick={closeModalFalse}
            />
            <Warn className="w-3/5 mx-auto" />
            <div className="text-center text-[#D88000] font-bold text-3xl mt-8">
              Anda berada di luar wilayah kantor
            </div>
            <p className="text-center text-xl">
              Isi keterangan untuk tetap mengisi presensi
            </p>
            <form
              className="flex justify-center items-center space-x-3 mt-4"
              onSubmit={handleSubmitNote}
            >
              <div className="w-3/5">
                <label htmlFor="keterangan" className="sr-only">
                  Keterangan
                </label>
                <input
                  id="nip"
                  name="nip"
                  type="text"
                  value={inputData?.note}
                  required
                  onChange={handleInput}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-[#29B6F6] sm:text-sm"
                  placeholder="Keterangan"
                />
              </div>
              <ButtonDisabled
                text={"Isi Presensi"}
                isDisabled={inputData.note ? false : true}
                isFilled={inputData.note !== ""}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteModal;
