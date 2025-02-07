const { AppDataSource } = require("../dbConfig/data-source");
const Item = require("../entity/item");

class ItemController {
    static getAllItems = async (req, res) => {
        try {
            const itemRepository = AppDataSource.getRepository("item");
            const items = await itemRepository.find({ relations: ["menu_category", "cuisines"] });
            if (!items.length) {
                return res.status(404).json({ message: "Items not found" });
            }
            return res.status(200).json(items);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static getItemById = async (req, res) => {
        try {
            const itemRepository = AppDataSource.getRepository("item");
            const item = await itemRepository.findOne({ 
                where: { id: parseInt(req.params.id, 10) },
                relations: ["menu_category", "cuisines"]
            });
            if (!item) {
                return res.status(404).json({ message: "Item not found" });
            }
            return res.status(200).json(item);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static createItem = async (req, res) => {
        try {
            const itemRepository = AppDataSource.getRepository("item");
            const newItem = itemRepository.create(req.body);
            const savedItem = await itemRepository.save(newItem);
            return res.status(201).json(savedItem);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static updateItem = async (req, res) => {
        try {
            const itemRepository = AppDataSource.getRepository("item");
            const existingItem = await itemRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!existingItem) {
                return res.status(404).json({ message: "Item not found" });
            }
            itemRepository.merge(existingItem, req.body);
            const updatedItem = await itemRepository.save(existingItem);
            return res.status(203).json(updatedItem);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static deleteItem = async (req, res) => {
        try {
            const itemRepository = AppDataSource.getRepository("item");
            const deleteResult = await itemRepository.delete(req.params.id);
            if (deleteResult.affected === 0) {
                return res.status(404).json({ message: "Item not found" });
            }
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = ItemController;
