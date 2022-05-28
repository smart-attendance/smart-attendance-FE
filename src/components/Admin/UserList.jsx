import React, { useState } from "react";

function UserList({users}) {

    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th className="px-4">User Name</th>
                        <th className="px-4">Last Present</th>
                        <th>Attendance Percentance</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((item, id) => (
                        <tr key={id}>
                            <td>{item.id}</td>
                            <td className="px-4">{item.name}</td>
                            <td className="px-4">{item.last_present}</td>
                            <td>{item.percent}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;