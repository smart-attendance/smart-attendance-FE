import moment from "moment";
import Button from "../Button";

function ScheduleCard({ schedule, isAbsent, isInside, handleClick }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="bg-white rounded-md shadow-lg w-4/5 mt-2">
        {schedule !== null ? (
          <>
            <div
              className={classNames(
                isAbsent === true ? "bg-[#29B6F6]" : "bg-[#D8D8D8]",
                "rounded-t-md px-3 py-2"
              )}
            >
              {isAbsent === true
                ? "Anda sudah mengisi presensi hari ini"
                : "Anda belum mengisi presensi"}
            </div>
            <div className="font-bold text-2xl m-3">{`${moment(
              schedule?.date
            ).format("l")} - Jadwal Harian`}</div>
            <div className="mx-3 mt-8 flex justify-between items-center">
              <div className="mb-4">
                <p className="font-light text-[#ABABAB]">Absensi sebelum</p>
                <p>09.05</p>
              </div>
              {!isAbsent && (
                <Button text={"Isi Presensi"} clickHandler={handleClick} />
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-52 rounded-md border-2 border-dashed border-[#A6A6A6] font-light text-sm text-[#A6A6A6]">
            Tidak ada jadwal Kegiatan
          </div>
        )}
      </div>
    </>
  );
}

export default ScheduleCard;
