import { createServer } from "http";
import express from "express";
import cors from "cors";
import { env } from "../modules/helper.js";
import { connect } from "mongoose";
import mainRouter from "../routes/mainRouter.js";

export default class App {
	constructor() {
		this.serverinit();
		this.loadPlugins();
		this.loadRoutes();
		// this.connectMongoDB(env("MONGO_ADDRESS"), env("MONGO_PORT"), env("MONGO_DATABASE"));
		this.startServer();
	}
	serverinit() {
		this.app = express();
		this.server = createServer(this.app);
		this.port = env("PORT") || 8000;
	}
	loadPlugins() {
		this.app.use(express.json());
		this.app.use(
			cors({
				origin: "*",
				optionsSuccessStatus: 200,
			})
		);
	}
	loadRoutes() {
		this.app.use("/", mainRouter);
	}
	startServer() {
		this.server.listen(this.port, () => {
			console.info(`[Server] : Running on http://localhost:${this.port}`);
		});
	}
	connectMongoDB(address = "mongodb://127.0.0.1", port = "27017", database = "datebase") {
		connect(`${address}:${port}/${database}`)
			.then(() => {
				console.info("MongoDB Connected");
			})
			.catch((e) => {
				console.error(e);
				this.server.close();
				console.info("Unable to connect database so Server is Closed");
			});
	}
}
