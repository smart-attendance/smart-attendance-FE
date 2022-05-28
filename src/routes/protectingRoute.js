import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function ProtectingRoute(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.users);

    useEffect(() => {
        if (user?.username.length === 0) {
            navigate("/login");
        }
    }, [user])
    return props.children;
}

export default ProtectingRoute