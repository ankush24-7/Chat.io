const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const messageController = require("../controllers/messageController");

router.route("/:id")
  .get(messageController.getMessages)
  .post(upload.single("image"), messageController.sendMessage)
  .delete(messageController.deleteMessage);

module.exports = router;
