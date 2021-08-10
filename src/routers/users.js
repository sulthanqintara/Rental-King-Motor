// SUB-RUTE UNTUK USER
const userRouter = require("express").Router();
const upload = require("../middlewares/upload");
const userHandler = require("../handlers/users");
const validation = require("../middlewares/uploadValidation");

userRouter.patch("/password/:id", userHandler.updatePassword);
userRouter.patch(
  "/:id",
  upload.uploadImage.single("photo"),
  validation,
  userHandler.editUser
);

module.exports = userRouter;
