import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, SideBar, UserList } from "../../components";
import { Transition } from "@headlessui/react";

function Users() {
    
    const user = useSelector((state) => state.user.users);
    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        setIsShowing(true);
    }, []);

    const users = [
        {
            "id": 1,
            "name": "Tius",
            "last_present": "2022-05-28",
            "percent": "100"
        },
        {
            "id": 2,
            "name": "Tuis",
            "last_present": "2022-05-28",
            "percent": "100"
        },
        {
            "id": 3,
            "name": "Tisu",
            "last_present": "2022-05-28",
            "percent": "100"
        },
        {
            "id": 4,
            "name": "Tusi",
            "last_present": "2022-05-28",
            "percent": "100"
        },
    ]

    return (
        <React.Fragment>
            <SideBar />
            <div className="ml-16">
                <Navbar user={user?.username} />
                <Transition
                    show={isShowing}
                    enter="transform duration-1000"
                    enterFrom="translate-y-full opacity-0"
                    enterTo="translate-y-0 opacity-100"
                    leave="duration-1000"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="grid grid-cols-2 lg:grid-cols-12 px-5 py-2">
                        <div className="col-span-1 lg:col-span-3 gap-3 flex flex-col items-center">
                            <div className="button-primary bg-green-primary p-2 w-fit">
                                Add User
                            </div>
                            <div className="button-primary bg-green-ternary p-2 w-fit">
                                Edit User
                            </div>
                        </div>
                        <div className="col-span-1 lg:col-span-9">
                            <UserList users={users} />
                        </div>
                    </div>
                </Transition>
            </div>
        </React.Fragment>
    )
}

export default Users;