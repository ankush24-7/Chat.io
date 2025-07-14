const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.post("/request-send/:receiverId", contactController.sendRequest);
router.delete("/request-cancel/:receiverId", contactController.cancelRequest);
router.post("/request-accept/:senderId", contactController.acceptRequest);
router.delete("/request-dismiss/:senderId", contactController.dismissRequest);

module.exports = router;
