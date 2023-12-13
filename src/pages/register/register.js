import { React, useState } from "react";
import "./register.css";
// import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register({ setIsLogged }) {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
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
			name,
			email,
			password,
			password_confirmation: confirmPassword,
		};
		console.log(data);
		axios
			.post("auth/registro", data)
			.then((response) => {
				console.log(response.data);
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
			<div className="main-register">
				<h1 className="h1-register">REGISTRO DE USUARIO</h1>
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
							<p className="input-error text-center text-danger">
								{errores.email[0]}
							</p>
						)}
					</div>
					<div className="div-form mt-2">
						<label className="label-form">Nombre:</label>
						<input
							className="input-form"
							type="text"
							placeholder="ingresar nombre"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></input>
						{errores.name && (
							<p className="input-error text-center text-danger">
								{errores.name[0]}
							</p>
						)}
					</div>
					<div className="div-form mt-2">
						<label className="label-form">Contraseña:</label>
						<input
							className="input-form"
							type="password"
							placeholder="ingresar contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
						{errores.password && (
							<p className="input-error text-center text-danger">
								{errores.password[0]}
							</p>
						)}
					</div>
					<div className="div-form mt-2">
						<label className="label-form">Confirmar contraseña:</label>
						<input
							className="input-form"
							type="password"
							placeholder="Confirmar contraseña"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></input>
						{errores.confirmPassword && (
							<p className="input-error text-center text-danger">
								{errores.confirmPassword[0]}
							</p>
						)}
					</div>
					<button className="button-form mt-4" type="submit" disabled={loading}>
						{loading ? (
							<div class="spinner-border" role="status">
								<span class="visually-hidden">Loading...</span>
							</div>
						) : (
							"Resgistrarse"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
