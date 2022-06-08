import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Footer, LoginForm, Navbar } from "../../components";
import { ReactComponent as Logo } from "../../images/logo-min.svg";
import { ReactComponent as Hibernate } from "../../images/logos_hibernate.svg";
import { ReactComponent as Postgres } from "../../images/logos_postgresql.svg";
import { ReactComponent as ReactIcon } from "../../images/logos_react.svg";
import { ReactComponent as Redux } from "../../images/logos_redux.svg";
import { ReactComponent as Spring } from "../../images/logos_spring-icon.svg";
import { ReactComponent as Tailwind } from "../../images/logos_tailwindcss-icon.svg";
import { ReactComponent as ChartJS } from "../../images/chartjs-logo.svg";

function Landing() {
  const user = useSelector((state) => state.user.users);
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  function Mailto({ email, subject, body, ...props }) {
    return (
      <a
        className="bg-[#29B6F6] hover:bg-[#66CFFF] cursor-pointer px-3 py-1 rounded-md text-white"
        href={`mailto:${email}?subject=${subject || ""}&body=${body || ""}`}
      >
        {props.children}
      </a>
    );
  }
  return (
    <>
      <div className="bg-[#FCFAF8] min-h-screen relative">
        <Navbar
          user={user?.username}
          color={"#FCFAF8"}
          clickHandler={openModal}
        />
        <div className="flex flex-col relative gap-3 justify-center items-center h-screen text-center">
          <p className="font-light text-md lg:text-xl">
            Employee Attendance Smart Solution
          </p>
          <h2 className="font-bold text-4xl lg:text-6xl lg:w-2/5">
            Manage Attendance Wherever You Are
          </h2>
          <div className="bg-white mt-12 lg:w-3/12 shadow-lg rounded-lg py-3 px-5 flex justify-center items-center">
            <p className="mr-4">Interested in Our Product?</p>
            <Mailto email="foo@bar.baz" subject="Hello" body="Hello world!">
              Contact Us!
            </Mailto>
          </div>
          <div className="bg-white rounded-full h-16 w-16 lg:h-20 lg:w-20 absolute left-[3rem] top-[13rem] lg:left-[26rem] lg:top-[12rem] flex justify-center items-center shadow-lg">
            <Logo className="w-3/5" />
          </div>
          <div className="bg-white rounded-full h-10 w-10 lg:h-14 lg:w-14 absolute left-[9rem] top-[43rem] lg:left-[28rem] lg:top-[26rem] flex justify-center items-center shadow-lg">
            <Hibernate className="w-3/5" />
          </div>
          <div className="bg-white rounded-full h-12 w-12 lg:h-16 lg:w-16 absolute left-[9rem] top-[10rem] lg:left-[18rem] lg:top-[32rem] flex justify-center items-center shadow-lg">
            <Postgres className="w-3/5" />
          </div>
          <div className="bg-white rounded-full h-16 w-16 lg:h-20 lg:w-20 absolute left-[3rem] top-[40rem] lg:left-[12rem] lg:top-[18rem] flex justify-center items-center shadow-lg">
            <ReactIcon className="w-3/5" />
          </div>
          <div className="bg-white rounded-full h-16 w-16 lg:h-20 lg:w-20 absolute right-[3rem] top-[14rem] lg:right-[26rem] lg:top-[12rem] flex justify-center items-center shadow-lg">
            <Redux className="w-3/5" />
          </div>
          <div className="bg-white rounded-full h-10 w-10 lg:h-14 lg:w-14 absolute right-[8rem] top-[42rem] lg:right-[28rem] lg:top-[26rem] flex justify-center items-center shadow-lg">
            <Spring className="w-3/5" />
          </div>
          <div className="bg-white rounded-full h-12 w-12 lg:h-16 lg:w-16 absolute right-[8rem] top-[11rem] lg:right-[18rem] lg:top-[32rem] flex justify-center items-center shadow-lg">
            <Tailwind className="w-3/5" />
          </div>
          <div className="bg-white rounded-full h-16 w-16 lg:h-20 lg:w-20 absolute right-[3rem] top-[39rem] lg:right-[12rem] lg:top-[18rem] flex justify-center items-center shadow-lg">
            <ChartJS className="w-3/5" />
          </div>
        </div>
        <LoginForm isOpen={isOpen} closeModal={closeModal} />
        <Footer color={"#FCFAF8"} />
      </div>
    </>
  );
}

export default Landing;
