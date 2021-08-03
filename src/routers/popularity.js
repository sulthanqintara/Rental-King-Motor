// SUB ROUTE UNTUK POPULARITY
const popularityRouter = require("express").Router();

const popularityHandler = require("../handlers/popularity");

popularityRouter.patch("/", popularityHandler.updateHistory);
popularityRouter.get("/", popularityHandler.viewPopularVehicles);
popularityRouter.post("/", popularityHandler.postNewPopularity);

module.exports = popularityRouter;
