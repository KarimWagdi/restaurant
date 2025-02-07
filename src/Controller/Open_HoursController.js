const { AppDataSource } = require("../dbConfig/data-source");
const OpenHour = require("../entity/open_hours");

class Open_HoursController {
  static getAllOpenHours = async (req, res) => {
    try {
      const openHourRepository = AppDataSource.getRepository("open_hours");
      const openHours = await openHourRepository.find({
        relations: ["branchOpenHour"],
      });
      if (!openHours.length) {
        return res.status(404).json({ message: "Open Hours not found" });
      }
      return res.status(200).json(openHours);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static getOpenHourById = async (req, res) => {
    try {
      const openHourRepository = AppDataSource.getRepository("open_hours");
      const openHour = await openHourRepository.findOne({
        where: { id: parseInt(req.params.id, 10) },
        relations: ["branchOpenHour"],
      });
      if (!openHour) {
        return res.status(404).json({ message: "Open Hour not found" });
      }
      return res.status(200).json(openHour);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static createOpenHour = async (req, res) => {
    try {
      const openHourRepository = AppDataSource.getRepository("open_hours");
      const newOpenHour = openHourRepository.create(req.body);
      const savedOpenHour = await openHourRepository.save(newOpenHour);
      return res.status(201).json(savedOpenHour);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static updateOpenHour = async (req, res) => {
    try {
      const openHourRepository = AppDataSource.getRepository("open_hours");
      const existingOpenHour = await openHourRepository.findOneBy({
        id: parseInt(req.params.id, 10),
      });
      if (!existingOpenHour) {
        return res.status(404).json({ message: "Open Hour not found" });
      }
      openHourRepository.merge(existingOpenHour, req.body);
      const updatedOpenHour = await openHourRepository.save(existingOpenHour);
      return res.status(203).json(updatedOpenHour);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static deleteOpenHour = async (req, res) => {
    try {
      const openHourRepository = AppDataSource.getRepository("open_hours");
      const deleteResult = await openHourRepository.delete(req.params.id);
      if (deleteResult.affected === 0) {
        return res.status(404).json({ message: "Open Hour not found" });
      }
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
}

module.exports = Open_HoursController;
