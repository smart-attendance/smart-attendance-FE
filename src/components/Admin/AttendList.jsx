import React from "react";

function AttendList({attendances}) {
    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th className="px-4">User Name</th>
                        <th className="px-4">At Time</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances?.map((item, id) => (
                        <tr key={id}>
                            <td>{item.id}</td>
                            <td className="px-4">{item.name}</td>
                            <td className="px-4">{item.time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AttendList;