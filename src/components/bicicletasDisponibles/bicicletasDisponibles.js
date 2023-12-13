import { React } from "react";
import "./bicicletasDisponibles.css";

function BicicletasDisponibles({
	alquilada,
	foto_url,
	id,
	marca,
	modelo,
	precio_por_hora,
	alquilarBicicleta,
	idBicicletaCargando,
}) {
	return (
		<div className="col-sm-6 col-md-4 col-lg-3">
			<div className="card h-100">
				<img
					className="card-img-top"
					src={`http://bicicletas-api-clone.test/${foto_url}`}
					alt="Bicicleta"
				></img>
				<div className="card-body">
					<h5 className="card-title">{modelo}</h5>
					<ul>
						<li>Marca: {marca}</li>
						<li>Precio por Hora: ${precio_por_hora}</li>
					</ul>
				</div>
				<div className="card-footer">
					{idBicicletaCargando === id ? (
						<button className="btn btn-success" disabled>
							<span
								className="spinner-grow spinner-grow-sm"
								aria-hidden="true"
							></span>
							<span role="status">Alquilando...</span>
						</button>
					) : (
						<button
							className="btn btn-success"
							disabled={alquilada}
							onClick={() => alquilarBicicleta(id)}
						>
							{alquilada ? "Alquilada" : "Alquilar"}
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default BicicletasDisponibles;
