import React, { useState } from "react";
import 'animate.css';
import LoginUser from "../components/Login/LoginUser";
import LoginAdmin from "../components/Login/LoginAdmin";

function LoginT() {

  const [animation, setAnimation] = useState(false);

  function handleAnimation() {
    setAnimation(!animation);
  }

  return (
    <div className="bg-green-200 min-h-screen text-black grid grid-cols-1 lg:grid-cols-12">
      <div className="col-span-1 lg:col-span-12 lg:my-14 lg:mx-16 my-3 mx-3 bg-white grid grid-cols-1 lg:grid-cols-12 shadow-lg rounded-lg h-full">
        <div className="col-span-1 lg:col-span-6">
          <div className="flex justify-center bg-cover-side bg-cover opacity-70 h-full rounded-tl-lg rounded-bl-lg">
            <div className="mt-40">
              <h1 className="text-5xl font-semibold text-teal-400 bg-white p-2 rounded-md shadow-md animate-typing animate-blink-caret">
                Smart Attendance
              </h1>
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-6 flex justify-center items-center">
          <div className={`bg-[#f1c7b2] rounded-lg shadow-2xl w-3/4 p-12 ${!animation ? `animate__bounceIn block` : `animate__bounceOut hidden`}`}>
            <LoginUser handleAnimation={handleAnimation} />
          </div>
          <div className={`bg-green-400 rounded-lg shadow-2xl w-3/4 p-12 ${animation ? `animate__bounceIn block` : `animate__bounceOut hidden`}`}>
            <LoginAdmin handleAnimation={handleAnimation} />
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-12">{/* <Footer /> */}</div>
    </div>
  );
}

export default LoginT;
