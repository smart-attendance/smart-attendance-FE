import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import "animate.css";
import UserList from "../../components/Admin/UserList";
import { AttendList, Loading, PresentChart, SideBar } from "../../components";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDash() {
    const user = useSelector((state) => state.user.users);
    const token = useSelector((state => state.user.users.token));

    const [isShowing, setIsShowing] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [users, setUsers] = useState([]);
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        axios.get(`https://smart-attendance-be.herokuapp.com/api/user`, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`https://smart-attendance-be.herokuapp.com/api/attendance/`, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            setAttendances(res.data.data);
            setIsloading(false);
            setIsShowing(true);
        })
        .catch(err => {
            console.log(err);
        })
        
    }, []);

    return (
        <React.Fragment>
            <SideBar />
                <Navbar user={user?.username} />
            <div className="ml-16">
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="px-5 py-2 grid grid-cols-1 lg:grid-cols-12">
                        <div className="col-span-1 lg:col-span-12">
                            <Transition
                                show={isShowing}
                                enter="transform duration-1000"
                                enterFrom="translate-y-full opacity-0"
                                enterTo="translate-y-0 opacity-100"
                                leave="duration-1000"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="text-4xl bg-green-ternary p-3 m-3 rounded-lg"
                            >
                                Welcome To Admin Dashboard
                            </Transition>
                        </div>

                        <div className="col-span-1 lg:col-span-6">
                            <Transition
                                show={isShowing}
                                enter="transform duration-1000"
                                enterFrom="translate-y-full opacity-0"
                                enterTo="translate-y-0 opacity-100"
                                leave="duration-1000"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="m-3">
                                    Users
                                    <UserList users={users.slice(0, 3)} />
                                    <div className="my-2"></div>
                                    {users.length > 3 ? 
                                        (
                                            <Link to={`/admin/users`}>
                                                <p className="button-primary p-2">Show More...</p> 
                                            </Link>
                                        ) : 
                                        null
                                    }
                                </div>

                                <div className="m-3">
                                    Absensi
                                    <AttendList attendances={attendances.slice(0, 3)} />
                                    <div className="my-2"></div>
                                    {attendances.length > 3 ? 
                                        <Link to={`/admin/attendances`}>
                                            <p className="button-primary p-2">Show More...</p> 
                                        </Link> 
                                        : 
                                        null
                                    }
                                </div>

                                {/* <div className="relative w-14 h-14 rounded-full bg-green-secondary">
                                    <div className="absolute w-14 h-14 rounded-full bg-green-primary animate-ping"></div>
                                </div> */}
                            </Transition>
                        </div>
                        <div className="col-span-1 lg:col-span-6">
                            <div className="m-3">
                                <PresentChart absensi={attendances} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

export default AdminDash;