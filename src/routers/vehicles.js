// RUTE MENUJU TABEL VEHICLES
const vehiclesRouter = require("express").Router();

const vehicleHandler = require("../handlers/vehicles");

// localhost:8000/vehicles
vehiclesRouter.get("/", vehicleHandler.getVehicles);
vehiclesRouter.post("/", vehicleHandler.addNewVehicles);
vehiclesRouter.delete("/", vehicleHandler.deleteVehicles);
vehiclesRouter.patch("/:id", vehicleHandler.patchByID);

module.exports = vehiclesRouter;
