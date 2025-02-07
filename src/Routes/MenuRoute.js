const express = require("express");
const MenuController = require("../Controller/MenuController");
const router = express.Router();

router.get("/", MenuController.getAllMenus);
router.get("/:id", MenuController.getMenuById);
router.post("/", MenuController.createMenu);
router.put("/:id", MenuController.updateMenu);
router.delete("/:id", MenuController.deleteMenu);

module.exports = router;
