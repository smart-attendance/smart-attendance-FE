import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";

function AddAttendance({showing, users, schedules}) {

    const token = useSelector((state) => state.user.users.token);
    const initialState = {
        userId: null,
        scheduleId: null,
        note: ""
    }

    const [inputData, setInputData] = useState(initialState);
    const [isLoading, setIsloading] = useState(false);

    function handleChange(e) {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit() {
        setIsloading(true);
        axios.post(`https://smart-attendance-be.herokuapp.com/api/attendance/`, inputData, {headers: {"Authorization": "Bearer " + token}})
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
            <div className="col-span-1 lg:col-span-3 gap-3 flex flex-col items-center">

                {isLoading ? (
                    <Loading />
                ) : (
                    null
                )}

                <div className="flex flex-col gap-4 w-2/3">
                    <div>
                        <label>User ID</label>
                        <input list="users" type='text' name="userId" id="userId" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                        <datalist id="users">
                            {users.map(item => (
                                <option value={item.id}>{item.fullName}</option>
                            ))}
                        </datalist>
                    </div>
                    
                    <div>
                        <label>Schedule ID</label>
                        <input list="schedules" type='text' name="scheduleId" id="scheduleId" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                        <datalist id="schedules">
                            {schedules.map(item => (
                                <option value={item.id}>{`Date: ${item.date}\nlat: ${item.latitude}\nlong: ${item.longitude}`}</option>
                            ))}
                        </datalist>
                    </div>

                    <div>
                        <label>Note</label>
                        <input type='text' name="note" id="note" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                    </div>
                </div>
                
                <div className="flex items-center gap-5">
                    <button className="button-primary bg-green-ternary w-fit p-2 border border-black" onClick={handleSubmit}>
                        Add Attendance
                    </button>
                    <button className="button-primary bg-red-300 w-fit p-2 border border-black" onClick={() => showing(1)}>
                        Back
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddAttendance;