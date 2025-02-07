const express = require("express");
const UserRoute = require("./UserRoute");
const RestaurantRouter = require("./RestaurantRoute");
const BranchesRouter = require("./BranchesRoute");
const AddonsRouter = require("./AddonsRoute");
const BranchesCuisinesRouter = require("./Branches_CuisinesRoute");
const CategoriesRouter = require("./CategoriesRoute");
const CuisinesRouter = require("./CuisinesRoute");
const ItemRouter = require("./ItemRoute");
const MenuCategoryRouter = require("./Menu_CategoryRoute");
const MenuRouter = require("./MenuRoute");
const OpenHoursRouter = require("./Open_HoursRoute");
const LandingPageRoute  = require("./LandingPageRoute");




const router = express.Router();
router.use("/addons", AddonsRouter);
router.use("/branches-cuisines", BranchesCuisinesRouter);
router.use("/categories", CategoriesRouter);
router.use("/cuisines", CuisinesRouter);
router.use("/items", ItemRouter);
router.use("/menu-categories", MenuCategoryRouter);
router.use("/menus", MenuRouter);
router.use("/open-hours", OpenHoursRouter);

router.use("/landingPage", LandingPageRoute);
router.use("/users", UserRoute);
router.use("/restaurants", RestaurantRouter);
router.use( "/branches", BranchesRouter);

module.exports = router;
