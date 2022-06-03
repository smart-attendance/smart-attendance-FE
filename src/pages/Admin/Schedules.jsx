import { Transition } from "@headlessui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddSchedule, Loading, Navbar, ScheduleList, SideBar } from "../../components";

function Schedules() {

    const user = useSelector((state) => state.user.users);
    const token = useSelector((state) => state.user.users.token);

    const [showing, setShowing] = useState(1);
    const [isLoading, setIsloading] = useState(true);
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get(`https://smart-attendance-be.herokuapp.com/api/schedule/`, {headers: {"Authorization": "Bearer " + token}})
        .then(res => {
            setSchedules(res.data.data);
            setIsloading(false);
        })
        .catch(err => {
            console.log(err);
            setIsloading(false);
        })
    }, [schedules]);

    function handlerShow(e) {
        setShowing(e);
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
                                        Add Schedules
                                    </button>
                                </div>
                                <div className="col-span-1 lg:col-span-9">
                                    <ScheduleList schedules={schedules} />
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
                            <div className="grid grid-cols-1 lg:grid-cols-12 px-5 py-2">
                                <AddSchedule showing={handlerShow} />
                            </div>
                        </Transition>
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    )
}

export default Schedules;