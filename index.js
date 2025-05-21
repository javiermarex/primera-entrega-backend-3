import "dotenv/config.js";
import express from "express";
import dbConnect from "./src/helpers/db_Connect.helper.js";
import indexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

/*Configuración del servidor*/
const server = express();
const port = process.env.PORT || 2525;
const ready = async () => {
  console.log("Servidor conectado en el puerto " + port);
  await dbConnect(process.env.LINK_DB);
};

server.listen(port, ready);

/*Configuración de middlewares*/
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

/*Configuración del router*/

server.use("/", indexRouter);
server.use(pathHandler);
