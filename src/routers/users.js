// SUB-RUTE UNTUK USER
const userRouter = require("express").Router();
const upload = require("../middlewares/upload");
const userHandler = require("../handlers/users");
const responseHelper = require("../helper/response");

userRouter.patch("/password/:id", userHandler.updatePassword);
userRouter.patch(
  "/:id",
  upload.uploadImage.single("photo"),
  (req, res, next) => {
    if (req.fileValidationError) {
      return responseHelper.error(res, 400, req.fileValidationError);
    }
    next();
  },
  userHandler.editUser
);

module.exports = userRouter;
