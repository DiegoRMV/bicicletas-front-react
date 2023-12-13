import { React, useState } from "react";
import "./login.css";
// import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({setIsLogged}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [errores, setErrores] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const registroSatisfactorio = () =>
		toast.success("Registrado Correctamente!", {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setErrores("");

		const data = {
			email,
			password,
			remember,
		};
		console.log(data);
		axios
			.post("auth/login", data)
			.then((response) => {
				registroSatisfactorio();
				localStorage.setItem("token", response.data.access_token);
				setIsLogged(true);
				navigate("/");
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.status === 422) {
					setErrores(error.response.data.errors);
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div>
			<div className="main-login">
				<h1 className="h1-login text-center">LOGIN</h1>
				<form className="form-size" onSubmit={handleSubmit}>
					<div className="div-form">
						<label className="label-form">Email:</label>
						<input
							className="input-form"
							type="email"
							placeholder="example@mail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></input>
						{errores.email && (
                            <p className="input-error text-center text-danger">{errores.email[0]}</p>
                        )}
					</div>
					<div className="div-form mt-3">
						<label className="label-form">Contraseña:</label>
						<input
							className="input-form"
							type="password"
							placeholder="ingresar contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
						{errores.password && (
							<p className="input-error text-center text-danger">{errores.password[0]}</p>
						)}
					</div>
					<div className="div-checkbox mt-3">
						<input
							className="input-form-checkbox"
							type="checkbox"
							placeholder="Recordar"
							value={remember}
							onChange={(e) => setRemember(e.target.value)}
						></input>
						<label className="label-form-checkbox">Recordar</label>
						{errores.remember && (
							<p className="input-error text-center text-danger">{errores.remember[0]}</p>
						)}
					</div>
					<button className="button-form mt-2" type="submit" disabled={loading}>
						{loading ? (
							<div class="spinner-border" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						) : (
							"Ingresar"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
