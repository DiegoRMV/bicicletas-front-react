import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function CheckAuth({isLogged}) {
    if(isLogged === null) return null;
	return isLogged ? <Outlet /> : <Navigate to="/login"/>;
}
