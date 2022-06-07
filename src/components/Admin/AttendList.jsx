import React from "react";

function AttendList({attendances}) {
    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className="px-4">User ID</th>
                        <th className="px-4">Time</th>
                        <th className="px-4">Status</th>
                        <th className="px-4">Note</th>
                    </tr>
                </thead>
                <tbody>
                    {attendances?.map((item, id) => (
                        <tr key={id}>
                            <td>{item.id}</td>
                            <td>{ /* item.user.id */ } - </td>
                            <td className="px-4">{item.time}</td>
                            <td className="px-4">{item.attendanceStatus}</td>
                            <td className="px-4">{item.note === "" ? "-" : item.note}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AttendList;