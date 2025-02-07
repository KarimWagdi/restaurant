const { AppDataSource } = require("../dbConfig/data-source");
const MenuCategory = require("../entity/menu_category");

class Menu_CategoryController {
    static getAllMenuCategories = async (req, res) => {
        try {
            const menuCategoryRepository = AppDataSource.getRepository("menu_category");
            const menuCategories = await menuCategoryRepository.find({ relations: ["menu", "category"] });
            if (!menuCategories.length) {
                return res.status(404).json({ message: "Menu Categories not found" });
            }
            return res.status(200).json(menuCategories);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static getMenuCategoryById = async (req, res) => {
        try {
            const menuCategoryRepository = AppDataSource.getRepository("menu_category");
            const menuCategory = await menuCategoryRepository.findOne({ 
                where: { id: parseInt(req.params.id, 10) },
                relations: ["menu", "category"]
            });
            if (!menuCategory) {
                return res.status(404).json({ message: "Menu Category not found" });
            }
            return res.status(200).json(menuCategory);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static createMenuCategory = async (req, res) => {
        try {
            const menuCategoryRepository = AppDataSource.getRepository("menu_category");
            const newMenuCategory = menuCategoryRepository.create(req.body);
            const savedMenuCategory = await menuCategoryRepository.save(newMenuCategory);
            return res.status(201).json(savedMenuCategory);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static updateMenuCategory = async (req, res) => {
        try {
            const menuCategoryRepository = AppDataSource.getRepository("menu_category");
            const existingMenuCategory = await menuCategoryRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!existingMenuCategory) {
                return res.status(404).json({ message: "Menu Category not found" });
            }
            menuCategoryRepository.merge(existingMenuCategory, req.body);
            const updatedMenuCategory = await menuCategoryRepository.save(existingMenuCategory);
            return res.status(203).json(updatedMenuCategory);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static deleteMenuCategory = async (req, res) => {
        try {
            const menuCategoryRepository = AppDataSource.getRepository("menu_category");
            const deleteResult = await menuCategoryRepository.delete(req.params.id);
            if (deleteResult.affected === 0) {
                return res.status(404).json({ message: "Menu Category not found" });
            }
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = Menu_CategoryController;
