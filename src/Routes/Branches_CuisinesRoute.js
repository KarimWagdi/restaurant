const express = require("express");
const BranchesCuisinesController = require("../Controller/Branches_CuisinesController");
const router = express.Router();

router.get("/", BranchesCuisinesController.getAllBranchesCuisines);
router.get("/:id", BranchesCuisinesController.getBranchesCuisineById);
router.post("/", BranchesCuisinesController.createBranchesCuisine);
router.put("/:id", BranchesCuisinesController.updateBranchesCuisine);
router.delete("/:id", BranchesCuisinesController.deleteBranchesCuisine);

module.exports = router;
