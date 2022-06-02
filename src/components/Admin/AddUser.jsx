import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";

function AddUser({showing}) {

    const token = useSelector((state) => state.user.users.token);
    const initialState = {
        nip: "",
        fullName: "",
        password: ""
    }

    const [inputData, setInputData] = useState(initialState);
    const [toggle, setToggle] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    
    function handleChange(e) {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
        console.log(inputData);
    }

    function handleSubmit() {
        setIsloading(true);
        axios.post(`https://smart-attendance-be.herokuapp.com/api/user/register`, inputData, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            window.alert('data has been added!');
            setIsloading(false);
            showing(1);
        })
        .catch(err => {
            console.log(err);
            setIsloading(false);
        });
    }

    return (
        <React.Fragment>

            {isLoading ? (
                <Loading />
            ) : (
                null
            )}
            <div className="flex flex-col gap-4 w-2/3">
                <div>
                    <label>NIP</label>
                    <input type='text' name="nip" id="nip" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                </div>
                
                <div>
                    <label>Full Name</label>
                    <input type='text' name="fullName" id="fullName" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                </div>

                <div>
                    <label>Password</label>
                    <input type={toggle ? `password` : `text`} name="password" id="password" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                    <button className="button-primary bg-blue-300 w-fit p-2 border border-black mt-3" onClick={() => setToggle(!toggle)}>Toggle Password</button>
                </div>

                <div className="flex items-center gap-5">
                    <button className="button-primary bg-green-ternary w-fit p-2 border border-black" onClick={handleSubmit}>
                        Add User
                    </button>
                    <button className="button-primary bg-red-300 w-fit p-2 border border-black" onClick={() => showing(1)}>
                        Back
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddUser;