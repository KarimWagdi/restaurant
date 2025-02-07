const express = require("express");
const CategoriesController = require("../Controller/CategoriesController");
const router = express.Router();

router.get("/", CategoriesController.getAllCategories);
router.get("/:id", CategoriesController.getCategoryById);
router.post("/", CategoriesController.createCategory);
router.put("/:id", CategoriesController.updateCategory);
router.delete("/:id", CategoriesController.deleteCategory);

module.exports = router;
