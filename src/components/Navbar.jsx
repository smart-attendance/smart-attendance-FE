import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { deleteUser } from '../redux/sliceUser'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment'

function Navbar({user}) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSignOut = () => {
        dispatch(deleteUser());
        navigate("/");
    }
    return (
        <div className='bg-brown-primary p-4 flex justify-between'>
            <div>Smart Attendance</div>
            <div className='flex space-x-3'>
                <div>{moment(Date.now()).format("DD MMMM, YYYY")}</div>
                <div>|</div>
                <div>{user}</div>
                <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open user menu</span>
                                        {/* <img
                                            className="h-8 w-8 rounded-full"
                                            src={imgAcc}
                                            alt=""
                                        /> */}
                                        <AccountCircleIcon className='text-white' />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    onClick={handleSignOut}
                                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Sign out
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
            </div>
        </div>
    )
}

export default Navbar