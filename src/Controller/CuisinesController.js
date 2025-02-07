const { AppDataSource } = require("../dbConfig/data-source");
const Cuisine = require("../entity/cuisines");

class CuisinesController {
    static getAllCuisines = async (req, res) => {
        try {
            const cuisineRepository = AppDataSource.getRepository("cuisines");
            const cuisines = await cuisineRepository.find();
            if (!cuisines.length) {
                return res.status(404).json({ message: "Cuisines not found" });
            }
            return res.status(200).json(cuisines);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static getCuisineById = async (req, res) => {
        try {
            const cuisineRepository = AppDataSource.getRepository("cuisines");
            const cuisine = await cuisineRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!cuisine) {
                return res.status(404).json({ message: "Cuisine not found" });
            }
            return res.status(200).json(cuisine);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static createCuisine = async (req, res) => {
        try {
            const cuisineRepository = AppDataSource.getRepository("cuisines");
            const newCuisine = cuisineRepository.create(req.body);
            const savedCuisine = await cuisineRepository.save(newCuisine);
            return res.status(201).json(savedCuisine);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static updateCuisine = async (req, res) => {
        try {
            const cuisineRepository = AppDataSource.getRepository("cuisines");
            const existingCuisine = await cuisineRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!existingCuisine) {
                return res.status(404).json({ message: "Cuisine not found" });
            }
            cuisineRepository.merge(existingCuisine, req.body);
            const updatedCuisine = await cuisineRepository.save(existingCuisine);
            return res.status(203).json(updatedCuisine);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static deleteCuisine = async (req, res) => {
        try {
            const cuisineRepository = AppDataSource.getRepository("cuisines");
            const deleteResult = await cuisineRepository.delete(req.params.id);
            if (deleteResult.affected === 0) {
                return res.status(404).json({ message: "Cuisine not found" });
            }
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = CuisinesController;
