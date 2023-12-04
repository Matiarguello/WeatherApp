const{ response } = require('express');
const Busquedas = require('./../models/busquedas');
const busquedas = new Busquedas();


let obj = [
  {
    id: 'country.8940',
    nombre: 'Estados Unidos',
    longitud: -97.9222112121185,
    latitud: 39.3812661305678
  },
  {
    id: 'address.6862238713243294',
    nombre: 'Rua Estados Unidos, Sucupira, Jaboatão dos Guararapes - Pernambuco, 51346, Brasil',
    longitud: -34.9628437,
    latitud: -8.1062494
  },
  {
    id: 'address.7507711973663642',
    nombre: 'Rua Estados Unidos São Lourenço da Mata - Pernambuco, 54745-055, Brasil',
    longitud: -35.0317867,
    latitud: -7.9910735
  },
  {
    id: 'address.2757632882043064',
    nombre: 'Rua Estados Unidos Parnamirim - Río Grande del Norte, Brasil',
    longitud: -35.2008864,
    latitud: -5.9245839
  },
  {
    id: 'address.5888198092358780',
    nombre: 'Rua Estados Unidos, América, Aracaju - Sergipe, 49067, Brasil',
    longitud: -37.080216,
    latitud: -10.9171355
  },
   {
    id: 'country.8940',
    nombre: 'Estados Unidos',
    longitud: -97.9222112121185,
    latitud: 39.3812661305678
  },
  {
    id: 'address.6862238713243294',
    nombre: 'Rua Estados Unidos, Sucupira, Jaboatão dos Guararapes - Pernambuco, 51346, Brasil',
    longitud: -34.9628437,
    latitud: -8.1062494
  },
  {
    id: 'address.7507711973663642',
    nombre: 'Rua Estados Unidos São Lourenço da Mata - Pernambuco, 54745-055, Brasil',
    longitud: -35.0317867,
    latitud: -7.9910735
  },
  {
    id: 'address.2757632882043064',
    nombre: 'Rua Estados Unidos Parnamirim - Río Grande del Norte, Brasil',
    longitud: -35.2008864,
    latitud: -5.9245839
  },
  {
    id: 'address.5888198092358780',
    nombre: 'Rua Estados Unidos, América, Aracaju - Sergipe, 49067, Brasil',
    longitud: -37.080216,
    latitud: -10.9171355
  },
   {
    id: 'country.8940',
    nombre: 'Estados Unidos',
    longitud: -97.9222112121185,
    latitud: 39.3812661305678
  },
  {
    id: 'address.6862238713243294',
    nombre: 'Rua Estados Unidos, Sucupira, Jaboatão dos Guararapes - Pernambuco, 51346, Brasil',
    longitud: -34.9628437,
    latitud: -8.1062494
  },
  {
    id: 'address.7507711973663642',
    nombre: 'Rua Estados Unidos São Lourenço da Mata - Pernambuco, 54745-055, Brasil',
    longitud: -35.0317867,
    latitud: -7.9910735
  },
  {
    id: 'address.2757632882043064',
    nombre: 'Rua Estados Unidos Parnamirim - Río Grande del Norte, Brasil',
    longitud: -35.2008864,
    latitud: -5.9245839
  },
  {
    id: 'address.5888198092358780',
    nombre: 'Rua Estados Unidos, América, Aracaju - Sergipe, 49067, Brasil',
    longitud: -37.080216,
    latitud: -10.9171355
  },
   {
    id: 'country.8940',
    nombre: 'Estados Unidos',
    longitud: -97.9222112121185,
    latitud: 39.3812661305678
  },
  {
    id: 'address.6862238713243294',
    nombre: 'Rua Estados Unidos, Sucupira, Jaboatão dos Guararapes - Pernambuco, 51346, Brasil',
    longitud: -34.9628437,
    latitud: -8.1062494
  },
  {
    id: 'address.7507711973663642',
    nombre: 'Rua Estados Unidos São Lourenço da Mata - Pernambuco, 54745-055, Brasil',
    longitud: -35.0317867,
    latitud: -7.9910735
  },
  {
    id: 'address.2757632882043064',
    nombre: 'Rua Estados Unidos Parnamirim - Río Grande del Norte, Brasil',
    longitud: -35.2008864,
    latitud: -5.9245839
  },
  {
    id: 'address.5888198092358780',
    nombre: 'Rua Estados Unidos, América, Aracaju - Sergipe, 49067, Brasil',
    longitud: -37.080216,
    latitud: -10.9171355
  }   
]

const ClimaPut = async (req, res = response) => {

	let name = req.query.name
	let logo;
	let msg;

	const search = await busquedas.ciudad( name );

	// console.log(search)

	// const search = obj;

	if(search.length == 0){
		logo = "./static/no_results.png"
		msg = "No se encontraron resultados"
		console.log("[ ClimaPut ] No se encontraron resultados");
	}

	else{
		logo = "./static/results.png"
	}

	const datos = search
	


	res.render("index", {
		logo,
		msg,
		datos
	});
}


module.exports = {
    ClimaPut
}