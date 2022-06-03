import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { useDropzone } from 'react-dropzone';
import { ScheduleList } from "..";
import papa from "papaparse";

function AddSchedule({showing}) {

    const token = useSelector((state) => state.user.users.token);
    const initialState = [{
        date: "",
        latitude: "",
        longitude: ""
    }]

    const [choose, setChoose] = useState(1);
    const [inputData, setInputData] = useState(initialState);
    const [isLoading, setIsloading] = useState(false);
    const [file, setFile] = useState("");

    const { getRootProps, getInputProps } = useDropzone({
        accept: '.csv',
        onDrop: acceptedFiles => {
            papa.parse(acceptedFiles[0], {
                complete: function(results) {
                    const tmp = toObject(results.data);
                    setInputData(tmp);
                    setFile(acceptedFiles[0].path);
                }
            });
        },
        noDragEventsBubbling: true
    });

    function toObject(e) {
        const res = [];

        e.map(item => {
            const obj = { date: "", latitude: "", longitude: "" }
            
            obj.date = item[0]; obj.latitude = item[1]; obj.longitude = item[2];
            
            res.push(obj);
        })

        return res;
    }

    function handleChange(e) {
        const tmp = [...inputData];

        tmp[0][e.target.name] = e.target.value;
        setInputData(tmp);
    }

    function handleSubmit() {
        setIsloading(true);
        axios.post(`https://smart-attendance-be.herokuapp.com/api/schedule/many`, inputData, {headers: {"Authorization": "Bearer " + token}})
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

                {choose === 1 ? (
                    <div className="flex flex-col gap-4 w-2/3">
                        <button className="button-primary p-1 bg-green-secondary border border-white shadow" onClick={() => setChoose(2)}>Upload File Instead</button>
                        <div>
                            <label>Date</label>
                            <input type='date' name="date" id="date" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                        </div>
                        
                        <div>
                            <label>Latitude</label>
                            <input type='number' name="latitude" id="latitude" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                        </div>

                        <div>
                            <label>Longitude</label>
                            <input type='number' name="longitude" id="longitude" className="border-black border rounded w-full p-1" onChange={handleChange}></input>
                        </div>
                    </div>
                ) : (
                    <React.Fragment>
                        <button className="button-primary p-1 bg-green-secondary border border-white shadow w-2/3" onClick={() => setChoose(1)}>Manual Input</button>
                        {file ? 
                            (
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-6 w-6 bi bi-file-earmark-spreadsheet-fill" viewBox="0 0 16 16">
                                        <path d="M6 12v-2h3v2H6z"/>
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z"/>
                                    </svg>
                                    {file}
                                </div>
                            ) : null
                        }
                        <div {...getRootProps({ className: 'dropzone' })} className="flex flex-col gap-4 w-2/3">
                            <label htmlFor="image" className="block text-sm font-semibold">
                                Excel File
                            </label>
                            <div className='flex mt-1 justify-center px-6 pt-5 pb-6 border-2 border-black border-dashed rounded-md bg-green-200'>
                                <input {...getInputProps()} className="sr-only" />
                                <div className="space-y-1 text-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-12 w-12 mx-auto bi bi-file-earmark-spreadsheet-fill" viewBox="0 0 16 16">
                                        <path d="M6 12v-2h3v2H6z"/>
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM3 9h10v1h-3v2h3v1h-3v2H9v-2H6v2H5v-2H3v-1h2v-2H3V9z"/>
                                    </svg>
                                    <div className="flex text-sm">
                                        <p className="pl-1">Upload a file or drag and drop</p>
                                    </div>
                                    <p className="text-xs">.csv</p>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
                <div className="flex items-center gap-5">
                    <button className="button-primary bg-green-ternary w-fit p-2 border border-black" onClick={handleSubmit}>
                        Add Schedule
                    </button>
                    <button className="button-primary bg-red-300 w-fit p-2 border border-black" onClick={() => showing(1)}>
                        Back
                    </button>
                </div>
            </div>
            <div className="col-span-1 lg:col-span-9 gap-3 flex flex-col items-center">
                <p className="text-xl">PREVIEW</p>
                <ScheduleList schedules={inputData} />
            </div>
        </React.Fragment>
    )
}

export default AddSchedule;