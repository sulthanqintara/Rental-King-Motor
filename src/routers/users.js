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
  upload.uploadImage.single("profile_picture"),
  validation,
  userHandler.editUser
);
userRouter.post("/forgot_password", userHandler.forgotPassword);
userRouter.get("/forgot_password/check", userHandler.checkForgotPassword);
userRouter.patch("/forgot_password/change", userHandler.changePassword);

module.exports = userRouter;
