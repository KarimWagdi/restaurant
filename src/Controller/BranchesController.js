const {AppDataSource} = require("../dbConfig/data-source");

class BranchesController {
  static getBranches = async (req, res) => {
    try {
      const branchRepository = AppDataSource.getRepository("branches");
      const allBranches = await branchRepository.find({
        relations: ["restaurant"],
      });
      res.status(200).json(allBranches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving branches" });
    }
  };

  static getBranchById = async (req, res) => {
    try {
      const branchRepository = AppDataSource.getRepository("branches");
      const branch = await branchRepository.findOne({
        where: { id: parseInt(req.params.branchId, 10) },
        relations: ["restaurant"],
      });
      res.status(200).json(branch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving branch" });
    }
  };

  static createBranch = async (req, res) => {
    try {
      const branchRepository = AppDataSource.getRepository("branches");
      const restaurantRepository = AppDataSource.getRepository("restaurant");

      const restaurant = await restaurantRepository.findOne({
        where: { id: req.body.restaurant_id },
      });

      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }

      const newBranch = branchRepository.create({
        ...req.body,
      });

      const savedBranch = await branchRepository.save(newBranch);
      res.status(201).json(savedBranch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating branch" });
    }
  };

  static updateBranch = async (req, res) => {
    try {
      const branchRepository = AppDataSource.getRepository("branches");
      const existingBranch = await branchRepository.findOne({
        where: {
          id: parseInt(req.params.branchId, 10),
        },
      });
      if (!existingBranch) {
        return res.status(404).json({ message: "Branch not found" });
      }
      branchRepository.merge(existingBranch, req.body);
      const updatedBranch = await branchRepository.save(existingBranch);
      res.status(200).json(updatedBranch);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating branch" });
    }
  };

  static deleteBranch = async (req, res) => {
    try {
      const branchRepository = AppDataSource.getRepository("branches");
      const result = await branchRepository.delete({
        id: parseInt(req.params.branchId, 10),
      });
      if (result.affected === 0) {
        return res.status(404).json({ message: "Branch not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting branch" });
    }
  };
}

module.exports = BranchesController;
