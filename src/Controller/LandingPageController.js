const { AppDataSource } = require("../dbConfig/data-source");

class LandingPageController {
  static getRestaurants = async (req, res) => {
    try {
      const restaurantRepository = AppDataSource.getRepository("restaurant");
      const restaurants = await restaurantRepository.find({
        relations: ["branches", "branches.menu"],
      });
      if (!restaurants.length) {
        return res.status(404).json({ message: "Restaurants not found" });
      }
      return res.status(200).json(restaurants);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

}

module.exports = LandingPageController;
