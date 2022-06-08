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
    <div className="bg-[#FCFAF8] min-h-screen relative">
      <Navbar user={user?.username} color={"#FCFAF8"} clickHandler={openModal} />
      <div className="flex flex-col relative gap-3 justify-center items-center h-screen text-center">
        <p className="font-light text-xl">Employee Attendance Smart Solution</p>
        <h2 className="font-bold text-6xl w-2/5">
          Manage Attendance Wherever You Are
        </h2>
        <div className="bg-white mt-12 w-3/12 shadow-lg rounded-lg py-3 px-5 flex justify-center items-center">
          <p className="mr-4">Interested in Our Product?</p>
          <Mailto email="foo@bar.baz" subject="Hello" body="Hello world!">
            Contact Us!
          </Mailto>
        </div>
        <div className="bg-white rounded-full h-20 w-20 absolute left-[26rem] top-[12rem] flex justify-center items-center shadow-lg">
          <Logo className="w-3/5" />
        </div>
        <div className="bg-white rounded-full h-14 w-14 absolute left-[28rem] top-[26rem] flex justify-center items-center shadow-lg">
          <Hibernate className="w-3/5" />
        </div>
        <div className="bg-white rounded-full h-16 w-16 absolute left-[18rem] top-[32rem] flex justify-center items-center shadow-lg">
          <Postgres className="w-3/5" />
        </div>
        <div className="bg-white rounded-full h-20 w-20 absolute left-[12rem] top-[18rem] flex justify-center items-center shadow-lg">
          <ReactIcon className="w-3/5" />
        </div>
        <div className="bg-white rounded-full h-20 w-20 absolute right-[26rem] top-[12rem] flex justify-center items-center shadow-lg">
          <Redux className="w-3/5" />
        </div>
        <div className="bg-white rounded-full h-14 w-14 absolute right-[28rem] top-[26rem] flex justify-center items-center shadow-lg">
          <Spring className="w-3/5" />
        </div>
        <div className="bg-white rounded-full h-16 w-16 absolute right-[18rem] top-[32rem] flex justify-center items-center shadow-lg">
          <Tailwind className="w-3/5" />
        </div>
        <div className="bg-white rounded-full h-20 w-20 absolute right-[12rem] top-[18rem] flex justify-center items-center shadow-lg">
          <ChartJS className="w-3/5" />
        </div>
      </div>
      <Footer color={"#FCFAF8"} />
      <LoginForm isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default Landing;
