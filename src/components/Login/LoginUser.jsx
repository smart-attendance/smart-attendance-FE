import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../redux/sliceUser";
import LockIcon from "@mui/icons-material/Lock";

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
    const handleSignIn = () => {
        dispatch(saveUser({ username: inputData.username }));
        navigate(`/`);
    };

    return (
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
    )
}

export default LoginUser;