const BranchesController = require("../Controller/BranchesController");
const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/", BranchesController.getBranches);
router.get("/:branchId", BranchesController.getBranchById);
router.post("/", BranchesController.createBranch);
router.put("/:branchId", BranchesController.updateBranch);
router.delete("/:branchId", BranchesController.deleteBranch);

module.exports = router;
