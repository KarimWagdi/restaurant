const { AppDataSource } = require("../dbConfig/data-source");
const Menu = require("../entity/menu");

class MenuController {
    static getAllMenus = async (req, res) => {
        try {
            const menuRepository = AppDataSource.getRepository("menu");
            const menus = await menuRepository.find({ relations: ["branch", "menu_category"] });
            if (!menus.length) {
                return res.status(404).json({ message: "Menus not found" });
            }
            return res.status(200).json(menus);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static getMenuById = async (req, res) => {
        try {
            const menuRepository = AppDataSource.getRepository("menu");
            const menu = await menuRepository.findOne({ 
                where: { id: parseInt(req.params.id, 10) },
                relations: ["branch", "menu_category"]
            });
            if (!menu) {
                return res.status(404).json({ message: "Menu not found" });
            }
            return res.status(200).json(menu);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static createMenu = async (req, res) => {
        try {
            const menuRepository = AppDataSource.getRepository("menu");
            const newMenu = menuRepository.create(req.body);
            const savedMenu = await menuRepository.save(newMenu);
            return res.status(201).json(savedMenu);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static updateMenu = async (req, res) => {
        try {
            const menuRepository = AppDataSource.getRepository("menu");
            const existingMenu = await menuRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!existingMenu) {
                return res.status(404).json({ message: "Menu not found" });
            }
            menuRepository.merge(existingMenu, req.body);
            const updatedMenu = await menuRepository.save(existingMenu);
            return res.status(203).json(updatedMenu);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static deleteMenu = async (req, res) => {
        try {
            const menuRepository = AppDataSource.getRepository("menu");
            const deleteResult = await menuRepository.delete(req.params.id);
            if (deleteResult.affected === 0) {
                return res.status(404).json({ message: "Menu not found" });
            }
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = MenuController;
