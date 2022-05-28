import React from 'react'
import { useSelector } from 'react-redux'

function Home() {
    const user = useSelector((state) => state.user.users);

    return (
        <div>Welcome {user?.username}</div>
    )
}

export default Home