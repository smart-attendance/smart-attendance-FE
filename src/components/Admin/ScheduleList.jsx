import React from "react";

function AttendList({schedules}) {

    // console.log(schedules);

    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th className="px-4">Date</th>
                        <th className="px-4">Latitude</th>
                        <th className="px-4">Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules?.map((item, id) => (
                        <tr key={id}>
                            <td>{item.id ? item.id : `No. ${id+1}`}</td>
                            <td className="px-4">{item.date}</td>
                            <td className="px-4">{item.latitude}</td>
                            <td className="px-4">{item.longitude}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AttendList;