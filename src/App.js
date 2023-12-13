import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import NotFound from "./pages/notFound/notFound";
import Perfil from "./pages/perfil/perfil";
import Alquileres from "./pages/alquileres/alquileres";
import Navbar from "./components/navbar/navbar";
import CheckAuth from "./components/CheckAuth";
import axios from "axios";

function AppWrapper() {
	const [isLogged, setIsLogged] = useState(null);

	useEffect(() => {
		if (localStorage.getItem("token")) {
			setIsLogged(true);
		} else {
			setIsLogged(false);
		}
	}, [isLogged]);

	axios.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response?.status === 401) {
				localStorage.removeItem("token");
				setIsLogged(false);
			}
			return Promise.reject(error);
		}
	);

	return (
		<>
			<Navbar isLogged={isLogged} setIsLogged={setIsLogged} />
			<Routes>
				<Route element={<CheckAuth isLogged={isLogged} />}>
					<Route path="/" element={<Home />} />
					<Route path="/home" element={<Home />} />
					<Route path="/alquileres" element={<Alquileres />} />
					<Route path="/perfil" element={<Perfil />} />
				</Route>
				<Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
				<Route
					path="/register"
					element={<Register setIsLogged={setIsLogged} />}
				/>
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

function App() {
	return (
		<Router>
			<AppWrapper />
		</Router>
	);
}

export default App;
