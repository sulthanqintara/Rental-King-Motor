const authRouter = require("express").Router();
const upload = require("../middlewares/upload");
const authHandler = require("../handlers/auth");

authRouter.post("/login", authHandler.login);
authRouter.post(
  "/register",
  upload.uploadImage.single("photo"),
  authHandler.register
);
authRouter.delete("/logout", authHandler.logout);

module.exports = authRouter;
