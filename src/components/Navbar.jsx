import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { deleteUser } from '../redux/sliceUser'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment'
import { ReactComponent as Logo } from '../images/logo.svg';
import Button from './Button'

function Navbar({user, color, clickHandler}) {
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
        <div className={classNames(color ? `bg-[${color}]` : 'bg-white', 'absolute z-10 w-full top-0 py-1 px-12 lg:px-32 flex justify-between items-center drop-shadow-lg')}>
            <div>
                <Logo className='w-3/5'/>
            </div>
            <div className='flex space-x-2'>
                {user ? (
                <>
                <p className='font-light'>Selamat datang,</p>
                <div className='font-bold'>{user}</div>
                <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
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
                </>
                )
                :
                (<Button text="Login" clickHandler={clickHandler} />)
                }
            </div>
        </div>
    )
}

export default Navbar