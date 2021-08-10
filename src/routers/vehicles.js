// RUTE MENUJU TABEL VEHICLES
const vehiclesRouter = require("express").Router();

const vehicleHandler = require("../handlers/vehicles");
const authMiddleware = require("../middlewares/auth");

// localhost:8000/vehicles
vehiclesRouter.get("/", authMiddleware.checkToken, vehicleHandler.getVehicles);
vehiclesRouter.post("/", vehicleHandler.addNewVehicles);
vehiclesRouter.delete("/", vehicleHandler.deleteVehicles);
vehiclesRouter.patch("/:id", vehicleHandler.patchByID);

module.exports = vehiclesRouter;
