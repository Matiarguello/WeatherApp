const express = require("express");

const axios = require("axios");

require('dotenv').config();


/* Para las rutas http */

const Server = require("./models/server");

console.log( "[ Iniciando Servidor ] WebApp Clima Node JS." );

//Creamos el servidor

const server = new Server();
server.listen();



const Busquedas = require('./models/busquedas');

const busquedas = new Busquedas();


const main = async () => {

    // * Busca una ciudad escrita en input y devuelve los resultados en un arreglo con objetos.
	const search = await busquedas.ciudad( "argentina" );
				
	if(search.length == 0){
		console.log("No se encontraron resultados");
	}

	const paises = search.map( pais => pais.nombre );

	console.log( paises )
	console.log( search[0] )
	console.log( search[0].latitud )
	console.log( search[0].longitud )


	// const weather_data = await busquedas.clima( search[0].latitud, search[0].longitud );

	// if(weather_data.length == 0){
	// 	console.log("No se encontraron resultados");
	// }

	// console.log( weather_data )



}

// main();