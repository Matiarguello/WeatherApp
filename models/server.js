const express = require("express");
const cors = require("cors");
const hbs = require("hbs");
const app = express();
const dir = __dirname;
const app_port = process.env.PORT || 8080;
const path = require("path")

class Server {
	constructor() {
		this.app = express();
		this.port = app_port;

		//Rutas

		this.climaPath = "/search";
		this.locationPath = "/location";
		this.aboutPath = "/about";
		this.helpPath = "/help";
		this.partials = hbs;

		// Midlewares
		this.middlewares();

		// Controladores
		this.routes();
		this.errorHandlers();
	}

	async middlewares() {
		//Cors: Proteger la app de una peticion de otro dominio
		this.app.use(cors());

		//Directorio público

		this.app.set("views", (path.join( dir ,"../", "/public")));

		this.app.use(express.static((path.join( dir ,"../", "/public")))); //! Esto es para cargar los css y staticos
		this.app.set("view engine", "hbs");

		// this.partials.registerPartials('./../public/partials');
		this.partials.registerPartials(path.join(__dirname, "../", "/public/partials"));

		//Lectura y parseo del body. Cualquier info que venga en post, delete, la intentara serializar a json.
		this.app.use(express.json());
	}

	routes() {
		this.app.get("/", (req, res) => {
			res.render("index", {
				logo: "./static/logo.png",
			});
		});

		this.app.get(this.climaPath, require("./../routes/clima.routes"));
		this.app.get(this.locationPath, require("./../routes/location.routes"));
		this.app.get(this.aboutPath, (req, res) => {res.render("about")});
		this.app.get(this.helpPath, (req, res) => {res.render("help")});
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("App iniciada en el app_port " + this.port);
		});
	}

	errorHandlers() {
		// Middleware para manejar errores 404 (No encontrado)

    this.app.use((req, res) => {
      res.status(404).render("error",{
		logo: "./static/no_results.png",
		msg: "Error 404 - El servidor no pudo encontrar el contenido solicitado..¿donde entraste?"
	  }); // Renderiza la página "error404.hbs" o cualquier otra página de error que desees
    });		
	
		// Middleware para manejar errores 500 (Error interno del servidor)
		this.app.use((err, req, res, next) => {
			console.error(err.stack); 
			res.status(500).render("error",{
				logo: "./static/no_results.png",
				msg: "Error 505 - Algo salió mal"
			}); 
		});
	}
}

module.exports = Server;
