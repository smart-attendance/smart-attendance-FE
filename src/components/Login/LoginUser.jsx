import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../redux/sliceUser";
import LockIcon from "@mui/icons-material/Lock";
import Loading from "../Loading";

function LoginUser({handleAnimation}) {

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

    // a function that use to handle input changes
    const handleInput = (e) => {
        const nameTarget = e.target.name;
        const value = e.target.value;
        setInputData({
        ...inputData,
        [nameTarget]: value,
        });
    };

    // a function that handle submit to sign in / log in
    const handleSignIn = async () => {
        
        setIsLoading(true);
        await new Promise(wait => setTimeout(wait, 1500));
        setIsLoading(false);

        setErrors("Unauthenticated!");
        return;

        dispatch(saveUser({ username: inputData.username }));
        navigate(`/nyehe`);     // UBAH YANG INI YA HYU
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <Loading />
            ) : null
            }
            {errors ? (
                <React.Fragment>
                    <div className="justify-center items-center flex fixed inset-0 z-50">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white">
                                <div className="flex items-center gap-4 justify-between p-5 border-b border-solid border-slate-200 rounded-lg">
                                    <div className="w-11 h-11 rounded-full bg-red-600 animate-ping relative">
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" fill="red" className="absolute bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                    </svg>
                                    <p className="text-2xl font-semibold">
                                        {errors}
                                    </p>
                                </div>
                                <button className="button-primary bg-green-primary p-2 m-2 mx-10" onClick={() => setErrors("")}>Close</button>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </React.Fragment>
            ) : null
            }
            <div className="space-y-4">
                <h2 className="text-center text-3xl font-extrabold text-[#ce6935]">
                Sign in as User
                </h2>
                <form method="POST" action="#" className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px md:w-7/12 mx-auto">
                    <div>
                    <label htmlFor="username" className="sr-only">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        onChange={handleInput}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Username"
                    />
                    </div>
                    <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        onChange={handleInput}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                    />
                    </div>
                </div>
                </form>
                <button
                type="submit"
                onClick={handleSignIn}
                className="relative flex mx-auto justify-center w-full md:w-7/12 py-2 px-4 border border-brown-secondary text-sm font-medium rounded-md text-[#e6e0d4] bg-[#ce6935] hover:bg-brown-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-primary"
                >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockIcon
                    className="h-5 w-5 text-[#e6e0d4] group-hover:text-[#f1f1f1]"
                    aria-hidden="true"
                    />
                </span>
                Sign in
                </button>
                <button className="relative flex mx-auto justify-center w-full md:w-7/12 py-2 px-4 border border-blue-500 text-sm font-medium rounded-md text-[#e6e0d4] bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400" onClick={() => { handleAnimation() }}>Sign in as Admin</button>
            </div>
        </React.Fragment>
    )
}

export default LoginUser;