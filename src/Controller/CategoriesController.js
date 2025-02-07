const { AppDataSource } = require("../dbConfig/data-source");
const Category = require("../entity/categories");

class CategoriesController {
    static getAllCategories = async (req, res) => {
        try {
            const categoryRepository = AppDataSource.getRepository("categories");
            const categories = await categoryRepository.find({ relations: ["menu_category"] });
            if (!categories.length) {
                return res.status(404).json({ message: "Categories not found" });
            }
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static getCategoryById = async (req, res) => {
        try {
            const categoryRepository = AppDataSource.getRepository("categories");
            const category = await categoryRepository.findOne({ 
                where: { id: parseInt(req.params.id, 10) },
                relations: ["menu_category"]
            });
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static createCategory = async (req, res) => {
        try {
            const categoryRepository = AppDataSource.getRepository("categories");
            const newCategory = categoryRepository.create(req.body);
            const savedCategory = await categoryRepository.save(newCategory);
            return res.status(201).json(savedCategory);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static updateCategory = async (req, res) => {
        try {
            const categoryRepository = AppDataSource.getRepository("categories");
            const existingCategory = await categoryRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!existingCategory) {
                return res.status(404).json({ message: "Category not found" });
            }
            categoryRepository.merge(existingCategory, req.body);
            const updatedCategory = await categoryRepository.save(existingCategory);
            return res.status(203).json(updatedCategory);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static deleteCategory = async (req, res) => {
        try {
            const categoryRepository = AppDataSource.getRepository("categories");
            const deleteResult = await categoryRepository.delete(req.params.id);
            if (deleteResult.affected === 0) {
                return res.status(404).json({ message: "Category not found" });
            }
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = CategoriesController;
