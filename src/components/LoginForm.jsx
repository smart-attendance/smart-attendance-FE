import React, { useState } from "react";
import { ReactComponent as Close } from "../images/charm_cross.svg";
import { ReactComponent as EyeClose } from "../images/iconoir_eye-off.svg";
import { ReactComponent as EyeOpen } from "../images/iconoir_eye-empty.svg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../redux/sliceUser";
import Loading from "./Loading";
import jwt_decode from "jwt-decode";

function LoginForm({ isOpen, closeModal }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const initialData = {
    nip: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState(initialData);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const handleInput = (e) => {
    const nameTarget = e.target.name;
    const value = e.target.value;
    setInputData({
      ...inputData,
      [nameTarget]: value,
    });
  };
  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleLogin = (e) => {
    setIsLoading(true);
    axios
      .post(
        `https://smart-attendance-be.herokuapp.com/api/auth/user/login`,
        inputData
      )
      .then((res) => {
        setIsLoading(false);
        dispatch(
          saveUser({
            username: jwt_decode(res.data.data.accessToken)?.sub.split(",")[2],
            token: res.data.data.accessToken,
          })
        );
        navigate(`/user`);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors("NIP atau kata sandi tidak sesuai");
      });
    e.preventDefault();
  };
  return (
    <>
      {isOpen && (
        <div className="absolute top-0 z-10 w-full bg-slate-500 bg-opacity-60 min-h-screen flex justify-center items-center">
          {isLoading ? <Loading /> : null}
          <div className="bg-white rounded-lg z-30 p-12 relative w-1/4">
            <Close
              className="absolute top-2 right-2 cursor-pointer"
              onClick={closeModal}
            />
            <h1 className="font-bold text-3xl text-center">Login</h1>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="nip"
                    className={classNames(errors ? "text-[#E57373]" : "")}
                  >
                    NIP
                  </label>
                  <input
                    id="nip"
                    name="nip"
                    type="text"
                    value={inputData.nip}
                    required
                    onChange={handleInput}
                    className={classNames(
                      errors ? "border-[#E57373]" : "outline-none",
                      "appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-[#29B6F6] sm:text-sm"
                    )}
                    placeholder="Masukkan NIP Anda"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className={classNames(errors ? "text-[#E57373]" : "")}
                  >
                    Kata Sandi
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="password"
                      name="password"
                      type={isVisible ? "text" : "password"}
                      value={inputData.password}
                      required
                      onChange={handleInput}
                      className={classNames(
                        errors ? "border-[#E57373]" : "outline-none",
                        "appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-[#29B6F6] sm:text-sm"
                      )}
                      placeholder="Masukkan Password Anda"
                    />
                    <div
                      className="absolute right-2"
                      onClick={handleVisibility}
                    >
                      {isVisible ? <EyeClose /> : <EyeOpen />}
                    </div>
                  </div>
                </div>
              </div>
              {errors && <p className="text-center text-[#E57373]">{errors}</p>}
              <div
                className={classNames(
                  errors ? "pt-2" : "pt-10",
                  "flex justify-center"
                )}
              >
                <button
                  type="submit"
                  disabled={inputData.nip && inputData.password ? false : true}
                  className={classNames(
                    inputData.nip && inputData.password
                      ? "bg-[#29B6F6] hover:bg-[#66CFFF]"
                      : "bg-[#D8D8D8]",
                    "py-2 px-8 border border-green text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0288D1]"
                  )}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
