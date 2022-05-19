import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from '../components';

function Home() {
    // extract user data from the Redux store state
    const user = useSelector((state) => state.user.users);

    return (
        <div>
            <Navbar user={user?.username} />
            <div className='mt-4'>Welcome {user?.username}</div>
        </div>
    )
}

export default Home