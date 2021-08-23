// RUTE MENUJU TABEL VEHICLES
const vehiclesRouter = require("express").Router();
const upload = require("../middlewares/upload");
const vehicleHandler = require("../handlers/vehicles");
const authMiddleware = require("../middlewares/auth");
const fileValidation = require("../middlewares/uploadValidation");

// localhost:8000/vehicles
vehiclesRouter.get("/", vehicleHandler.getVehicles);

vehiclesRouter.post(
  "/",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  upload.uploadImage.array("picture", 5),
  fileValidation,
  vehicleHandler.addNewVehicles
);

vehiclesRouter.delete(
  "/",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  vehicleHandler.deleteVehicles
);

vehiclesRouter.patch(
  "/:id",
  authMiddleware.checkToken,
  authMiddleware.authSeller,
  upload.uploadImage.array("picture", 5),
  fileValidation,
  vehicleHandler.patchByID
);

vehiclesRouter.patch(
  "/popularity/:id",
  authMiddleware.checkToken,
  authMiddleware.authAdmin,
  vehicleHandler.popularVehicles
);

module.exports = vehiclesRouter;
