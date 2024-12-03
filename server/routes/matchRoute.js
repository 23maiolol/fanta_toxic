const express = require('express');
const matchRouter = express.Router();
const matchesController = require('../controller/matchesController')

matchRouter.post("/new", matchesController.createMatch)

matchRouter.get("/list", matchesController.retrieveAllMatches)

module.exports = matchRouter;