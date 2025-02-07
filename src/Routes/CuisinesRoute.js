const express = require("express");
const CuisinesController = require("../Controller/CuisinesController");
const router = express.Router();

router.get("/", CuisinesController.getAllCuisines);
router.get("/:id", CuisinesController.getCuisineById);
router.post("/", CuisinesController.createCuisine);
router.put("/:id", CuisinesController.updateCuisine);
router.delete("/:id", CuisinesController.deleteCuisine);

module.exports = router;
