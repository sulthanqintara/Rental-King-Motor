// RUTE MENUJU TABEL VEHICLES
const vehiclesRouter = require("express").Router();
const upload = require("../middlewares/upload");
const vehicleHandler = require("../handlers/vehicles");
const authMiddleware = require("../middlewares/auth");
const fileValidation = require("../middlewares/uploadValidation");

// localhost:8000/vehicles
vehiclesRouter.get("/", authMiddleware.checkToken, vehicleHandler.getVehicles);
vehiclesRouter.post(
  "/",
  authMiddleware.checkToken,
  upload.uploadImage.array("picture", 5),
  fileValidation,
  vehicleHandler.addNewVehicles
);
vehiclesRouter.delete("/", vehicleHandler.deleteVehicles);
vehiclesRouter.patch("/:id", vehicleHandler.patchByID);
vehiclesRouter.patch("/popularity/:id", vehicleHandler.popularVehicles);

module.exports = vehiclesRouter;
