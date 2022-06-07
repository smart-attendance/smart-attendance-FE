import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";

function AttendList({showing, attendances, attendance}) {
    
    const token = useSelector((state) => state.user.users.token);

    const [isLoading, setIsloading] = useState(false);

    function handleDelete(id) {
        const confirm = window.confirm(`Are You Sure to Delete ${id}`);

        if (confirm) {
            setIsloading(true);
            axios.delete(`https://smart-attendance-be.herokuapp.com/api/attendance/${id}`, {headers: {"Authorization": "Bearer " + token}})
            .then(res => {
                window.alert('Data Deleted');
                setIsloading(false);
            })
            .catch(err => {
                window.alert('failed to delete');
                setIsloading(false);
            });
        }
    }

    return (
        <React.Fragment>
            {isLoading ? (
                <Loading />
            ) : (
                null
            )}
            <div>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th className="px-1">User NIP</th>
                            <th className="px-4">Time</th>
                            <th className="px-4">Status</th>
                            <th className="px-4">Note</th>
                            <th className="px-1">Edit</th>
                            <th className="px-1">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendances?.map((item, id) => (
                            <tr key={id} className="text-sm">
                                <td>{item.id}</td>
                                <td className="px-4">{item.userNip}</td>
                                <td className="px-4">{item.date + " " + item.time}</td>
                                <td className="px-4">{item.attendanceStatus}</td>
                                <td className="px-4">{item.note === "" ? "-" : item.note}</td>
                                <td className="px-4">
                                    <center>
                                        <button className="bg-green-primary hover:bg-blue-300 rounded p-1 m-1" onClick={() => { showing(3); attendance(item); }} >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </button>
                                    </center>
                                </td>
                                <td className="px-4">
                                    <center>
                                        <button className="bg-red-300 hover:bg-orange-300 rounded p-1 m-1" onClick={() => handleDelete(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </button>
                                    </center>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default AttendList;