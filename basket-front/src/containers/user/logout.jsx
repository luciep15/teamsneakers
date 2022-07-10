import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogout } from "../../slices/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(setLogout());
    navigate("/login");
  }, []);
  
  console.log("deconnectée")
  return (
    <div>

    </div>
  );
};

export default Logout;
