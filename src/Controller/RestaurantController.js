const { AppDataSource } = require("../dbConfig/data-source");

class RestaurantController {
  static getRestaurants = async (req, res) => {
    try {
      const restaurantRepository = AppDataSource.getRepository("restaurant");
      const restaurants = await restaurantRepository.find({
        relations: ["branches"],
      });
      if (!restaurants.length) {
        return res.status(404).json({ message: "Restaurants not found" });
      }
      return res.status(200).json(restaurants);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static getRestaurantById = async (req, res) => {
    try {
      const restaurantRepository = AppDataSource.getRepository("restaurant");
      const allRestaurants = await restaurantRepository.findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: ["branches"],
      });
      if (!allRestaurants) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      return res.status(200).json(allRestaurants);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static getRestaurantBranches = async (req, res) => {
    try {
      const restaurantRepository = AppDataSource.getRepository("restaurant");
      const restaurantId = parseInt(req.params.id, 10);
      const existingRestaurant = await restaurantRepository.findOne({
        where: { id: restaurantId },
        relations: ["branches"],
      });

      if (!existingRestaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      return res.status(200).json(existingRestaurant.branches);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static createRestaurant = async (req, res) => {
    try {
      const restaurantRepository = AppDataSource.getRepository("restaurant");
      const newRestaurant = restaurantRepository.create(req.body);
      const savedRestaurant = await restaurantRepository.save(newRestaurant);
      return res.status(201).json(savedRestaurant);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static updateRestaurant = async (req, res) => {
    try {
      const restaurantRepository = AppDataSource.getRepository("restaurant");
      const existingRestaurant = await restaurantRepository.findOneBy({
        id: parseInt(req.params.id, 10),
      });
      if (!existingRestaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      restaurantRepository.merge(existingRestaurant, req.body);
      const updatedRestaurant = await restaurantRepository.save(
        existingRestaurant
      );
      return res.status(203).json(updatedRestaurant);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static deleteRestaurant = async (req, res) => {
    try {
      const restaurantRepository = AppDataSource.getRepository("restaurant");
      const deleteResult = await restaurantRepository.delete(req.params.id);
      if (deleteResult.affected === 0) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
}

module.exports = RestaurantController;
