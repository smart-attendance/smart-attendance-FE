import { useSelector } from "react-redux";
import {
  Footer,
  Loading,
  PresenceChart,
  ScheduleCard,
  SuccessModal,
} from "../../components";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Clock from "react-live-clock";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Home() {
  const user = useSelector((state) => state.user.users);
  const token = user?.token;
  const userId = jwt_decode(user?.token)?.sub.split(",")[0];
  const [isInside, setIsInside] = useState();
  const [todaySchedule, setTodaySchedule] = useState();
  const [attendanceList, setAttendanceList] = useState([]);
  const [isAbsent, setIsAbsent] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [presenceData, setPresenceData] = useState();

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function handleAbsent() {
    if (isInside) {
      setIsloading(true);
      const data = {
        note: "",
        scheduleId: todaySchedule?.id,
        userId: userId,
      };
      axios
        .post(
          "https://smart-attendance-be.herokuapp.com/api/attendance/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((resp) => {
          if (resp?.status === 200) {
            openModal();
            setIsloading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  }
  var hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  var bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  useEffect(() => {
    setIsloading(true);
    axios
      .get("https://smart-attendance-be.herokuapp.com/api/schedule/today", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setTodaySchedule(resp?.data.data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    setIsloading(true);
    axios
      .get(
        `https://smart-attendance-be.herokuapp.com/api/attendance/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        setAttendanceList(resp?.data.data);
        setIsloading(false);
      });
  }, [userId, token]);

  useEffect(() => {
    setIsAbsent(
      attendanceList.some((obj) => obj.scheduleId === todaySchedule?.id)
    );
  }, [todaySchedule, attendanceList]);

  useEffect(() => {
    axios
      .get("https://smart-attendance-be.herokuapp.com/api/schedule/state", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        setIsInside(resp?.data.data);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get(
        `https://smart-attendance-be.herokuapp.com/api/attendance/percentage/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        setPresenceData(resp?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, token]);

  return (
    <div className="min-h-screen relative bg-[#F3F5F6]">
      {isLoading ? <Loading /> : null}
      <Navbar user={user?.username} />
      <div className="grid grid-cols-1 lg:grid-cols-9 gap-12 relative  lg:py-28">
        <div className="lg:col-span-2"></div>
        <div className="lg:col-span-3 col-span-1">
          <div className="text-2xl mb-4">{`${
            hari[new Date().getDay()]
          }, ${new Date().getDate()} ${
            bulan[new Date().getMonth()]
          } ${new Date().getFullYear()}`}</div>
          <Clock
            className="font-bold text-7xl"
            format={"HH:mm:ss"}
            ticking={true}
          />
          <div className="text-2xl mt-16">Jadwal Hari ini</div>
          <ScheduleCard
            schedule={todaySchedule}
            isAbsent={isAbsent}
            isInside={isInside}
            handleClick={handleAbsent}
          />
        </div>
        <div className="lg:col-span-3 col-span-1">
          <PresenceChart presenceData={presenceData} />
        </div>
      </div>
      <SuccessModal isOpen={isOpen} closeModal={closeModal} />
      <Footer />
    </div>
  );
}

export default Home;
