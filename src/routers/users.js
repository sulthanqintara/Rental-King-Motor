// SUB-RUTE UNTUK USER
const userRouter = require("express").Router();
const upload = require("../middlewares/upload");
const userHandler = require("../handlers/users");
const authMiddleware = require("../middlewares/auth");
const validation = require("../middlewares/uploadValidation");

userRouter.patch(
  "/password/:id",
  authMiddleware.checkToken,
  userHandler.updatePassword
);
userRouter.patch(
  "/:id",
  authMiddleware.checkToken,
  upload.uploadImage.single("photo"),
  validation,
  userHandler.editUser
);

module.exports = userRouter;
