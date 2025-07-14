const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const userController = require("../controllers/userController");

router.route("/dp")
  .post(upload.single("displayPicture"), userController.postDisplayPicture)
  .delete(userController.deleteDisplayPicture);

router.route("/")
  .get(userController.getUser)
  .put(userController.updateUser);

router.route("/search")
  .get(userController.searchUsers);

module.exports = router;
