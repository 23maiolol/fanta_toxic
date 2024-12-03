const express = require('express');
const playersRouter = express.Router();
const PlayersController = require('../controller/playersController')

playersRouter.post("/new", PlayersController.createPlayer)

playersRouter.get("/list", PlayersController.retrieveAllPlayers)

module.exports = playersRouter;