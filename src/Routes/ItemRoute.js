const express = require("express");
const ItemController = require("../Controller/ItemController");
const router = express.Router();

router.get("/", ItemController.getAllItems);
router.get("/:id", ItemController.getItemById);
router.post("/", ItemController.createItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);

module.exports = router;
