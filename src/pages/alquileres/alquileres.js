import { React, useEffect, useState } from "react";
import "./alquileres.css";
// import Navbar from "../../components/navbar/navbar";
import MisAlquileres from "../../components/misAlquileres/misAlquileres";
import axios from "axios";
import Pagination from "react-js-pagination";

function Alquileres() {
	const [alquileres, setAlquileres] = useState(null);
	const [idAlquilerCargando, setIdAlquilerCargando] = useState(null);
    const [activePage, setActivePage] = useState(1);
	const [paginationInfo, setPaginationInfo] = useState(null);

	useEffect(() => {
		axios
			.get("alquileres?page="+activePage, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				console.log(res);
				setAlquileres(res.data.data);
                setPaginationInfo(res.data.meta);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [activePage]);

	const finalizarAlquiler = (id) => {
		setIdAlquilerCargando(id);
		axios
			.put("alquileres/finalizar/" + id, null, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token"),
				},
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => {
				setIdAlquilerCargando(null);

				window.location.reload();
			});
	};

    const handlePageChange = (pageNumber) => {
		setActivePage(pageNumber);
	};

	return (
		<div className="container">
			<h1 className="display-5 text-center my-5">MIS ALQUILERES</h1>
			<div className="row align-items-stretch row-gap-3 my-4">
				{!alquileres && (
					<div class="d-flex justify-content-center">
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					</div>
				)}
				{alquileres &&
					alquileres.map((alquiler, index) => {
						return (
							<MisAlquileres
								key={index}
								horaComienzo={alquiler.hora_comienzo}
								horaFinal={alquiler.hora_final}
								bicicleta={alquiler.bicicleta}
								id={alquiler.id}
								precioFinal={alquiler.precio_total}
								idAlquilerCargando={idAlquilerCargando}
								finalizarAlquiler={finalizarAlquiler}
							/>
						);
					})}
                <div className="my-5">
					<nav aria-label="Page navigation my-5 d-block">
						{paginationInfo && (
							<Pagination
								activePage={activePage}
								itemsCountPerPage={paginationInfo.per_page}
								totalItemsCount={paginationInfo.total}
								onChange={handlePageChange}
								itemClass="page-item"
								linkClass="page-link"
								innerClass="pagination justify-content-center"
							/>
						)}
					</nav>
				</div>
			</div>
		</div>
	);
}

export default Alquileres;
