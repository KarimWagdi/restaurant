const UserController = require("../Controller/UserController");
const express = require("express");
const router = express.Router();

router.get("/", UserController.getUser);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
