import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../redux/sliceUser";
import axios from "axios";
import Loading from "../Loading";
import { ReactComponent as Close } from "../../images/charm_cross.svg";
import { ReactComponent as EyeClose } from "../../images/iconoir_eye-off.svg";
import { ReactComponent as EyeOpen } from "../../images/iconoir_eye-empty.svg";
import ButtonDisabled from "../ButtonDisabled";

function LoginAdmin() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  // const variable use for initiate state
  const initialData = {
    username: "",
    password: "",
  };

  // returns a reference to the dispatch function from the Redux store
  const dispatch = useDispatch();
  // returns a function that navigate programmatically to other components/pages
  const navigate = useNavigate();

  // a state that user to store input data
  const [inputData, setInputData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // a function that use to handle input changes
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

  // a function that handle submit to sign in / log in
  const handleSignIn = (e) => {
    setIsLoading(true);
    axios
      .post(
        `https://smart-attendance-be.herokuapp.com/api/auth/admin/login`,
        inputData
      )
      .then((res) => {
        setIsLoading(false);
        dispatch(
          saveUser({
            username: res.data.data.username,
            token: res.data.data.accessToken,
          })
        );
        navigate(`/admin/dashboard`);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrors("Unauthenticated!");
        console.log(err);
      });
    e.preventDefault();
  };

  return (
    <>
      <div className="absolute top-0 z-10 w-full bg-cover-side bg-cover min-h-screen flex justify-center items-center">
        {isLoading ? <Loading /> : null}
        <div className="bg-white rounded-lg z-30 p-12 relative w-1/4">
          <h1 className="font-bold text-3xl text-center">Login Admin </h1>
          <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className={classNames(errors ? "text-[#E57373]" : "")}
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={inputData.username}
                  required
                  onChange={handleInput}
                  className={classNames(
                    errors ? "border-[#E57373]" : "outline-none",
                    "appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-[#29B6F6] sm:text-sm"
                  )}
                  placeholder="Masukkan username Anda"
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
                  <div className="absolute right-2" onClick={handleVisibility}>
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
              <ButtonDisabled
                isDisabled={
                  inputData.username && inputData.password ? false : true
                }
                isFilled={inputData.username && inputData.password}
                text={"Login"}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginAdmin;
