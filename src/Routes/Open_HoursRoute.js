const express = require("express");
const Open_HoursController = require("../Controller/Open_HoursController");
const router = express.Router();

router.get("/", Open_HoursController.getAllOpenHours);
router.get("/:id", Open_HoursController.getOpenHourById);
router.post("/", Open_HoursController.createOpenHour);
router.put("/:id", Open_HoursController.updateOpenHour);
router.delete("/:id", Open_HoursController.deleteOpenHour);

module.exports = router;
