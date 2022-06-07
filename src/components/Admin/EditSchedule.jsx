import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";

function EditUser({showing, schedule}) {

    const token = useSelector((state) => state.user.users.token);
    const initialState = {
        id: schedule.id,
        date: schedule.date,
        latitude: schedule.latitude,
        longitude: schedule.longitude
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
        axios.put(`https://smart-attendance-be.herokuapp.com/api/schedule/${inputData.id}`, inputData, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            window.alert('data has been updated!');
            setIsloading(false);
            showing(1);
        })
        .catch(err => {
            window.alert('Edit Failed!');
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
                    <label>ID</label>
                    <input type='text' name="id" id="id" className="border-black border rounded w-full p-1" onChange={handleChange} value={inputData.id}></input>
                </div>
                
                <div>
                    <label>Date</label>
                    <input type='date' name="date" id="date" className="border-black border rounded w-full p-1" onChange={handleChange} value={inputData.date}></input>
                </div>

                <div>
                    <label>Latitude</label>
                    <input type='number' name="latitude" id="latitude" className="border-black border rounded w-full p-1" onChange={handleChange} value={inputData.latitude}></input>
                </div>

                <div>
                    <label>Longitude</label>
                    <input type='number' name="longitude" id="longitude" className="border-black border rounded w-full p-1" onChange={handleChange} value={inputData.longitude}></input>
                </div>

                <div className="flex items-center gap-5">
                    <button className="button-primary bg-green-ternary w-fit p-2 border border-black" onClick={handleSubmit}>
                        Edit Schedule
                    </button>
                    <button className="button-primary bg-red-300 w-fit p-2 border border-black" onClick={() => showing(1)}>
                        Back
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditUser;