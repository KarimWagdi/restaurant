const express = require("express");
const Menu_CategoryController = require("../Controller/Menu_CategoryController");
const router = express.Router();

router.get("/", Menu_CategoryController.getAllMenuCategories);
router.get("/:id", Menu_CategoryController.getMenuCategoryById);
router.post("/", Menu_CategoryController.createMenuCategory);
router.put("/:id", Menu_CategoryController.updateMenuCategory);
router.delete("/:id", Menu_CategoryController.deleteMenuCategory);

module.exports = router;
