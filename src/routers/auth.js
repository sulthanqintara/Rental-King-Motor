const authRouter = require("express").Router();
const upload = require("../middlewares/upload");
const authHandler = require("../handlers/auth");
const fileValidation = require("../middlewares/uploadValidation");
const authMiddleware = require("../middlewares/auth");

authRouter.post("/login", authHandler.login);
authRouter.post(
  "/register",
  upload.uploadImage.single("profile_picture"),
  fileValidation,
  authHandler.register
);
authRouter.delete("/logout", authHandler.logout);

authRouter.delete(
  "/logout/clear",
  authMiddleware.checkToken,
  authMiddleware.authAdmin,
  authHandler.clear
);

authRouter.get("/check", authHandler.checkToken);

module.exports = authRouter;
