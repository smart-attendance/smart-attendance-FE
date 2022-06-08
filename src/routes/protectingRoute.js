import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

function ProtectingRoute(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.users);

  useEffect(() => {
    if (user?.username === "") {
      navigate("/");
    } else if (jwt_decode(user?.token)?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (jwt_decode(user?.token)?.role === "user") {
      navigate("/user");
    }
  }, [user]);
  return props.children;
}

export default ProtectingRoute;
