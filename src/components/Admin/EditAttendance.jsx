import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";

function EditAttendance({showing, users, schedules, attendance}) {

    const token = useSelector((state) => state.user.users.token);
    const initialState = {
        attendanceStatus: attendance.attendanceStatus,
        id: attendance.id,
        latitude: attendance.latitude,
        longitude: attendance.longitude,
        note: attendance.note,
        time: attendance.time
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
        axios.put(`https://smart-attendance-be.herokuapp.com/api/attendance/`, inputData, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            window.alert('data has been updated!');
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
                        <label>Attendance Status</label>
                        <select onChange={(e) => handleChange(e)} value={inputData.attendanceStatus} className="border-black border rounded w-full p-1" name="attendanceStatus">
                            <option>Hadir Dalam Radius Kantor</option>
                            <option>Hadir Di Luar Radius Kantor</option>
                            <option>Terlambat</option>
                        </select>
                    </div>

                    <div>
                        <label>Note</label>
                        <input type='text' name="note" id="note" className="border-black border rounded w-full p-1" onChange={handleChange} value={inputData.note}></input>
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

export default EditAttendance;