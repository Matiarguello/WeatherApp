const { response } = require("express");
const Busquedas = require("../models/busquedas");
const busquedas = new Busquedas();

const locationPut = async (req, res = response) => {
	//La info enviada desde el el url

	const { lat, lon } = req.query;

	let logo;
	let msg;

	const infoLocation = await busquedas.clima(lat, lon);

	if (infoLocation.length == 0) {
		(logo = "./static/no_results.png"),
			(msg = "Error, no se encontraron datos de este lugar :(");
	} else {
		//Definimos el estado del logo

		const grados = infoLocation.temperatura;

		if (grados < 13.0) logo = "./static/frio.png";
		else if (grados > 13.0 && grados < 20.0) logo = "./static/normal1.png";
		else if (grados > 20.0 && grados < 30.0) logo = "./static/normal2.png";
		else if (grados > 30.0) logo = "./static/calor.png";
		else logo = "./static/normal1.png";
	}

	res.render("index", {
		logo,
		info: infoLocation,
		msg,
	});
};

module.exports = {
	locationPut,
};
