import { React } from "react";
import "./misAlquileres.css";

function MisAlquileres({
	bicicleta,
	id,
	horaComienzo,
	horaFinal,
	precioFinal,
	idAlquilerCargando,
	finalizarAlquiler,
}) {
	return (
		<div className="col-sm-6 col-md-4 col-lg-3">
			<div className="card h-100">
				<img
					className="card-img-top"
					src={`http://bicicletas-api-clone.test/${bicicleta.foto_url}`}
					alt="Bicicleta"
				></img>
				<div className="card-body">
					<h5 className="card-title">{bicicleta.modelo}</h5>
					<ul>
						<li>Marca: {bicicleta.marca}</li>
						<li>Precio por Hora: ${bicicleta.precio_por_hora}</li>
						<li>Hora comienzo: ${horaComienzo}</li>
						<li>Hora final: ${horaFinal}</li>
						<li>Precio final: ${precioFinal}</li>
					</ul>
				</div>
				<div className="card-footer">
					{idAlquilerCargando === id ? (
						<button className="btn btn-success" disabled>
							<span
								className="spinner-grow spinner-grow-sm"
								aria-hidden="true"
							></span>
							<span role="status">Finalizando...</span>
						</button>
					) : (
						<button
							className="btn btn-success"
							disabled={horaFinal}
							onClick={() => finalizarAlquiler(id)}
						>
							{horaFinal ? "Finalizado" : "Finalizar"}
						</button>
					)}
				</div>
			</div>
		</div>
		// <div className="bic-disp-container">
		//     <h4>{hora_comienzo}</h4>
		//     <h4>{hora_final}</h4>
		//     <button className="bici-disp-button">FINALIZAR</button>
		// </div>
	);
}

export default MisAlquileres;
