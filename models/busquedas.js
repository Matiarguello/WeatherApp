const axios = require("axios");

// * Ese obj simula una respuesta por parte de la api del clima
let obj = {
	count: 1,
	data: [
		{
			app_temp: 12.8,
			aqi: 26,
			city_name: "25 de Mayo",
			clouds: 0,
			country_code: "UY",
			datetime: "2023-10-20:20",
			dewpt: 12.8,
			dhi: 86.19,
			dni: 735.29,
			elev_angle: 24.47,
			ghi: 384.1,
			gust: 9.515625,
			h_angle: 64.3,
			lat: -34.2823,
			lon: -56.2145,
			ob_time: "2023-10-20 20:32",
			pod: "d",
			precip: 0,
			pres: 1010,
			rh: 58,
			slp: 1015.4013,
			snow: 0,
			solar_rad: 384.1,
			sources: [Array],
			state_code: "07",
			station: "SUAA",
			sunrise: "08:55",
			sunset: "22:03",
			temp: 11.4,
			timezone: "America/Montevideo",
			ts: 1697833970,
			uv: 2.6302562,
			vis: 16,
			weather: [Object],
			wind_cdir: "NE",
			wind_cdir_full: "Noreste",
			wind_dir: 37,
			wind_spd: 6.9976563,
		},
	],
};

class Busquedas {
	busquedas = [];

	constructor() {
		this.busquedas = [];
	}

	get paramsMapBox() {
		return {
			access_token: process.env.MAPBOX_KEY,
			limit: 5,
			language: "es",
		};
	}
	get paramsWeatherBox() {
		return {
			key: process.env.NEW_WEATER_KEY,
			lang: "es",
			units: "m",
		};
	}

	async clima(lat, lon) {
		try {
			const instanceClima = axios.create({
				method: "get",
				baseURL: `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}`,
				timeout: 5000,
				params: this.paramsWeatherBox,
			});

			const response = await instanceClima.get();
			const data = response.data;

			if (data && data.data && data.data[0] && data.data[0].city_name) {
				return {
					lugar: data.data[0].city_name,
					temperatura: data.data[0].temp,
					hora: data.data[0].ob_time,
					zona_horaria: data.data[0].timezone,
					atardecer: data.data[0].sunset,
					amanecer: data.data[0].sunrise,
					nieve: data.data[0].snow,
					nubes: data.data[0].clouds,
				};
			} else {
				console.log("[ ERROR ] Respuesta inesperada del servidor");
				return [];
			}
		} catch (error) {
			console.log("[ ERROR ] Error de solicitud al servidor", error);
			return [];
		}
	}

	async ciudad(lugar = "") {
		// * Config API

		try {
			const instance = axios.create({
				baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
				params: this.paramsMapBox,
			});

			const resp = await instance.get();
			// console.log(resp.data.features)
			//! Llaves dentro del parentesis significa que returna un objeto.

			return resp.data.features.map((lugar) => ({
				id: lugar.id,
				nombre: lugar.place_name,
				longitud: lugar.center[0],
				latitud: lugar.center[1],
			}));
		} catch (error) {
			console.error("[ Error ] No se pudo conectar al api");
			return [];
		}
	}

	getBusquedas() {
		return this.busquedas;
	}

	getBusqueda(id) {
		return this.busquedas[id];
	}
}

module.exports = Busquedas;
