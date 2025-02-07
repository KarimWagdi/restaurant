const { AppDataSource } = require("../dbConfig/data-source");
const Addon = require("../entity/addons");

class AddonsController {
    static getAllAddons = async (req, res) => {
        try {
            const addonRepository = AppDataSource.getRepository("addons");
            const addons = await addonRepository.find();
            if (!addons.length) {
                return res.status(404).json({ message: "Addons not found" });
            }
            return res.status(200).json(addons);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static getAddonById = async (req, res) => {
        try {
            const addonRepository = AppDataSource.getRepository("addons");
            const addon = await addonRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!addon) {
                return res.status(404).json({ message: "Addon not found" });
            }
            return res.status(200).json(addon);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static createAddon = async (req, res) => {
        try {
            const addonRepository = AppDataSource.getRepository("addons");
            const newAddon = addonRepository.create(req.body);
            const savedAddon = await addonRepository.save(newAddon);
            return res.status(201).json(savedAddon);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static updateAddon = async (req, res) => {
        try {
            const addonRepository = AppDataSource.getRepository("addons");
            const existingAddon = await addonRepository.findOneBy({ id: parseInt(req.params.id, 10) });
            if (!existingAddon) {
                return res.status(404).json({ message: "Addon not found" });
            }
            addonRepository.merge(existingAddon, req.body);
            const updatedAddon = await addonRepository.save(existingAddon);
            return res.status(203).json(updatedAddon);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };

    static deleteAddon = async (req, res) => {
        try {
            const addonRepository = AppDataSource.getRepository("addons");
            const deleteResult = await addonRepository.delete(req.params.id);
            if (deleteResult.affected === 0) {
                return res.status(404).json({ message: "Addon not found" });
            }
            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    };
}

module.exports = AddonsController;
