const express = require("express");
const AddonsController = require("../Controller/AddonsController");
const router = express.Router();

router.get("/", AddonsController.getAllAddons);
router.get("/:id", AddonsController.getAddonById);
router.post("/", AddonsController.createAddon);
router.put("/:id", AddonsController.updateAddon);
router.delete("/:id", AddonsController.deleteAddon);

module.exports = router;
