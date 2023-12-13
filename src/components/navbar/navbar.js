import { React } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar({ isLogged, setIsLogged }) {
	const logout = () => {
		axios
			.post("auth/logout", null, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				localStorage.removeItem("token");
				setIsLogged(false);
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="navbar-size">
			<div className="navbar-left">
				{isLogged && (
					<>
						<Link to="/home">
							<h3 className="navbar-h3">BICICLETAS</h3>
						</Link>
						<Link to="/alquileres">
							<h3 className="navbar-h3">MIS ALQUILERES</h3>
						</Link>
					</>
				)}
			</div>
			<div className="navbar-center"></div>
			<div className="navbar-right">
				{isLogged ? (
					<>
						<Link to="/perfil">
							<h3 className="navbar-h3">PERFIL</h3>
						</Link>
						<button className="btn btn-light py-0" onClick={logout}>Salir</button>
					</>
				) : (
					<>
						<Link to="/login">
							<h3 className="navbar-h3">Login</h3>
						</Link>
						<Link to="/register">
							<h3 className="navbar-h3">Registro</h3>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
