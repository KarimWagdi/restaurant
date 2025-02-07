const { AppDataSource } = require("../dbConfig/data-source");
const BranchesCuisine = require("../entity/branches_cuisines");

class BranchesCuisinesController {
    static getAllBranchesCuisines = async (req, res) => {
        try {
            const branchesCuisineRepository = AppDataSource.getRepository("branches_cuisines");
            const branchesCuisines = await branchesCuisineRepository.find({ relations: ["branches", "cuisines"] });
            if (!branchesCuisines.length) {
                return res.status(404).json({ message: "Branches Cuisines not found" });
            }
            return res.status(200).json(branchesCuisines);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static getBranchesCuisineById = async (req, res) => {
        try {
            const branchesCuisineRepository = AppDataSource.getRepository("branches_cuisines");
            const branchesCuisine = await branchesCuisineRepository.findOne({ 
                where: { id: parseInt(req.params.id, 10) },
                relations: ["branches", "cuisines"]
            });
            if (!branchesCuisine) {
                return res.status(404).json({ message: "Branches Cuisine not found" });
            }
            return res.status(200).json(branchesCuisine);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static createBranchesCuisine = async (req, res) => {
        try {
            const branchesCuisineRepository = AppDataSource.getRepository("branches_cuisines");
            const newBranchesCuisine = branchesCuisineRepository.create(req.body);
            const savedBranchesCuisine = await branchesCuisineRepository.save(newBranchesCuisine);
            return res.status(201).json(savedBranchesCuisine);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static updateBranchesCuisine = async (req, res) => {
        try {
            const branchesCuisineRepository = AppDataSource.getRepository("branches_cuisines");
            const existingBranchesCuisine = await branchesCuisineRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!existingBranchesCuisine) {
                return res.status(404).json({ message: "Branches Cuisine not found" });
            }
            branchesCuisineRepository.merge(existingBranchesCuisine, req.body);
            const updatedBranchesCuisine = await branchesCuisineRepository.save(existingBranchesCuisine);
            return res.status(203).json(updatedBranchesCuisine);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static deleteBranchesCuisine = async (req, res) => {
        try {
            const branchesCuisineRepository = AppDataSource.getRepository("branches_cuisines");
            const deleteResult = await branchesCuisineRepository.delete(req.params.id);
            if (deleteResult.affected === 0) {
                return res.status(404).json({ message: "Branches Cuisine not found" });
            }
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = BranchesCuisinesController;
