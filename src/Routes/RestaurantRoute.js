const RestaurantController = require("../Controller/RestaurantController");
const express = require("express");
const router = express.Router();
const auth = require("../MiddleWares/Auth");

router.get("/", auth, RestaurantController.getRestaurants);
router.get("/:id", RestaurantController.getRestaurantById);
router.post("/", RestaurantController.createRestaurant);
router.get("/:id/branches", RestaurantController.getRestaurantBranches);
router.put("/:id", RestaurantController.updateRestaurant);
router.delete("/:id", RestaurantController.deleteRestaurant);

module.exports = router;
