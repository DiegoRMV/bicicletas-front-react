import { React, useEffect, useState } from "react";
import "./perfil.css";
import { toast } from "react-toastify";
import axios from "axios";
// import Navbar from "../../components/navbar/navbar";

function Perfil() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [errores, setErrores] = useState("");
	const [loading, setLoading] = useState(false);

	const actualizacionSatisfactoria = () =>
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
			current_password: password,
			password: newPassword,
			password_confirmation: confirmPassword,
		};

		axios
			.put("perfil", data, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((response) => {
				console.log(response.data);
				actualizacionSatisfactoria();
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

	useEffect(() => {
		axios
			.get("perfil", {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				console.log(res.data);
				setEmail(res.data.email);
				setName(res.data.name);
			})
			.catch((err) => {
				console.error(err.res.data);
			});
	}, []);

	return (
		<div>
			<div className="main-perfil">
				<h1 className="h1-perfil">PERFIL DE USUARIO</h1>
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
						<label className="label-form">Contraseña actual:</label>
						<input
							className="input-form"
							type="password"
							placeholder="ingresar contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
						{errores.current_password && (
							<p className="input-error text-center text-danger">
								{errores.password[0]}
							</p>
						)}
					</div>
					<div className="div-form mt-2">
						<label className="label-form">Nueva contraseña:</label>
						<input
							className="input-form"
							type="password"
							placeholder="ingrese nueva contraseña"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						></input>
						{errores.password && (
							<p className="input-error text-center text-danger">
								{errores.password[0]}
							</p>
						)}
					</div>
					<div className="div-form mt-2">
						<label className="label-form mt-2">Confirmar contraseña:</label>
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
							<div className="spinner-border" role="status">
								<span className="visually-hidden">Loading...</span>
							</div>
						) : (
							"Modificar"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Perfil;
