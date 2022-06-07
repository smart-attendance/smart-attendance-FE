import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Loading";

function UserList({users, showing, user}) {

    const token = useSelector((state) => state.user.users.token);
    const [isLoading, setIsloading] = useState(false);

    function handleDelete(id) {
        const confirm = window.confirm(`Are You Sure to Delete ${id}`);

        if (confirm) {

            axios.delete(`https://smart-attendance-be.herokuapp.com/api/user/${id}`, {headers: {"Authorization": "Bearer " + token}})
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
                <table className="table-auto border-l border-r border-black">
                    <thead>
                        <tr>
                            <th className="border-t border-black bg-green-secondary">#</th>
                            <th className="border-t border-black bg-green-secondary">User ID</th>
                            <th className="border-t border-black bg-green-secondary px-4">NIP</th>
                            <th className="border-t border-black bg-green-secondary px-4">Last Present</th>
                            <th className="border-t border-black bg-green-secondary">Full Name</th>
                            <th className="border-t border-black bg-green-secondary px-1">Edit</th>
                            <th className="border-t border-black bg-green-secondary px-1">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((item, id) => (
                            <tr key={id}>
                                <td className="px-2 border-r border-b border-black">{id+1}</td>
                                <td className="px-2 border-r border-b border-black">{item.id}</td>
                                <td className="px-3 border-r border-b border-black">{item.nip}</td>
                                <td className="px-3 border-r border-b border-black"> - </td>
                                <td className="border-r border-b border-black">{item.fullName}</td>
                                <td className="border-r border-b border-black">
                                    <center>
                                        <button className="bg-green-primary hover:bg-blue-300 rounded p-1 m-1" onClick={() => { showing(3); user(item) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </button>
                                    </center>
                                </td>
                                <td className="border-b border-black">
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

export default UserList;