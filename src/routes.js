const express = require("express");
const auth = require("./auth");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

const routes = express.Router();
const AtletasController = require("./controllers/AtletaControllers");
const ObservadoresController = require("./controllers/ObservadorController");
//const ObssController = require("./controllers/ComerciosControllers");
const NotificacoesController = require("./controllers/NotificacoesControllers")

routes.post("/aut", AtletasController.aut);
routes.post("/observador", ObservadoresController.store);
//routes.use(auth);
routes.get("/observador",ObservadoresController.list);
routes.post("/atleta", AtletasController.store);
//routes.use(auth);
routes.get("/atleta", AtletasController.list);
routes.get("/atleta/:email", AtletasController.index);
routes.put("/atleta/:email", AtletasController.update);
routes.delete("/atleta/:email", AtletasController.destroy);
/*
routes.post("/obs", ObssController.store);
routes.get("/obs", ObssController.list);
routes.get("/obs/:cnpj", ObssController.index);
routes.put("/obs/:cnpj", ObssController.update);
routes.delete("/obs/:cnpj", ObssController.destroy);
*/
routes.post("/notificacoes", NotificacoesController.store);

routes.delete("/notificacoes/:id", NotificacoesController.notificacaolida);
routes.get("/notificacoes", NotificacoesController.list);
routes.get("/notificacoes/:id", NotificacoesController.index);/*
routes.put("/notificacoes/:id", NotificacoesController.update);
routes.delete("/notificacoes/:id", NotificacoesController.destroy);*/


routes.post("/atleta/:atletaId/likes", LikeController.store);
routes.post("/atleta/:atletaId/deslikes", DislikeController.store);

module.exports = routes;
