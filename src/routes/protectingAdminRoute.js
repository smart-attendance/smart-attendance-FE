import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function ProtectingAdminRoute(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.users);

    useEffect(() => {
        if (user?.role === "user") {
            navigate("/login");
        }
    }, [user])
    return props.children;
}

export default ProtectingAdminRoute