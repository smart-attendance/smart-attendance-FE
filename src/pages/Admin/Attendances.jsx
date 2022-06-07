import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AttendList, Loading, Navbar, SideBar } from "../../components";
import { Transition } from "@headlessui/react";
import axios from "axios";

function Attendances() {
    
    const user = useSelector((state) => state.user.users);
    const token = useSelector((state) => state.user.users.token);

    const [showing, setShowing] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        axios.get(`https://smart-attendance-be.herokuapp.com/api/attendance`, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            setAttendances(res.data.data);
            setIsloading(false);
        })
        .catch(err => {
            console.log(err);
            setIsloading(false);
        })
        setShowing(true);
    }, [attendances]);

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
                            show={showing}
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
                                </div>
                                <div className="col-span-1 lg:col-span-9">
                                    <AttendList attendances={null} />
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