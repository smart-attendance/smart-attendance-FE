import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddAttendance, AttendList, EditAttendance, Loading, Navbar, SideBar } from "../../components";
import { Transition } from "@headlessui/react";
import axios from "axios";

function Attendances() {
    
    const user = useSelector((state) => state.user.users);
    const token = useSelector((state) => state.user.users.token);

    const [showing, setShowing] = useState(1);
    const [isLoading, setIsloading] = useState(true);

    const [attendances, setAttendances] = useState([]);
    const [users, setUsers] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [filterUser, setFilterUser] = useState("All Users");
    const [filterAttendance, setFilterAttendance] = useState([]);
    const [activeAttendance, setActiveAttendance] = useState({});

    useEffect(() => {
        axios.get(`https://smart-attendance-be.herokuapp.com/api/attendance/`, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            setAttendances(res.data.data);
            setIsloading(false);
        })
        .catch(err => {
            console.log(err);
            setIsloading(false);
        });

        axios.get(`https://smart-attendance-be.herokuapp.com/api/user`, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            setUsers(res.data.data);
            setIsloading(false);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get(`https://smart-attendance-be.herokuapp.com/api/schedule/`, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            setSchedules(res.data.data);
            setIsloading(false);
        })
        .catch(err => {
            console.log(err);
            setIsloading(false);
        });

    }, [attendances]);

    function handleShow(e) {
        if (e === 1) { setFilterUser("All Users"); setFilterAttendance([]) };
        setShowing(e);
    }

    function handleChange(e) {
        if (e === "All Users") { setFilterUser(e); setFilterAttendance([]) };
        
        setFilterUser(e);
        axios.get(`https://smart-attendance-be.herokuapp.com/api/attendance/user/${e}`, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            setFilterAttendance(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function handleAttendance(e) {
        setActiveAttendance(e);
    }

    return (
        <React.Fragment>
            <SideBar />
            <div className="ml-16">
                <Navbar user={user?.username} />
                {isLoading ? (
                    <Loading />
                ) : (
                    <React.Fragment>
                        <Transition
                            show={showing === 1}
                            enter="transform duration-1000"
                            enterFrom="translate-y-full opacity-0"
                            enterTo="translate-y-0 opacity-100"
                            leave="duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="grid grid-cols-2 lg:grid-cols-12 px-5 py-2">
                                <div className="col-span-1 lg:col-span-3 gap-3 flex flex-col items-center">
                                    <button className="button-primary bg-green-primary p-2 w-fit" onClick={() => setShowing(2)}>
                                        Add Attendance
                                    </button>

                                    <label>User ID</label>
                                    <select onChange={(e) => handleChange(e.target.value)} value={filterUser} className="border-black border rounded w-2/3 p-1">
                                        <option value="All Users">All Users</option>
                                        {users.map(item => (
                                            <option key={item} value={item.id}>{item.nip}</option>
                                        ))}
                                    </select>
                                    
                                </div>
                                <div className="col-span-1 lg:col-span-9">
                                    <AttendList attendances={filterUser !== "All Users" ? filterAttendance : attendances} attendance={handleAttendance} showing={handleShow} />
                                </div>
                            </div>
                        </Transition>

                        <Transition
                            show={showing === 2}
                            enter="transform duration-1000"
                            enterFrom="translate-y-full opacity-0"
                            enterTo="translate-y-0 opacity-100"
                            leave="duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="grid grid-cols-2 lg:grid-cols-12 px-5 py-2">
                                <div className="col-span-1 lg:col-span-3 gap-3 flex flex-col items-center">
                                    <AddAttendance showing={handleShow} users={users} schedules={schedules} />
                                </div>
                            </div>
                        </Transition>

                        <Transition
                            show={showing === 3}
                            enter="transform duration-1000"
                            enterFrom="translate-y-full opacity-0"
                            enterTo="translate-y-0 opacity-100"
                            leave="duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="grid grid-cols-2 lg:grid-cols-12 px-5 py-2">
                                <div className="col-span-1 lg:col-span-3 gap-3 flex flex-col items-center">
                                    <EditAttendance showing={handleShow} attendance={activeAttendance} users={users} schedules={schedules} />
                                </div>
                            </div>
                        </Transition>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    )
}

export default Attendances;