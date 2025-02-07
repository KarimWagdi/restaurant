const { AppDataSource } = require("../dbConfig/data-source");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "jwt-secret";
class UserController {
  static getUser = async (req, res) => {
    try {
      const userRepository = AppDataSource.getRepository("user");
      const users = await userRepository.find();
      if (!users.length) {
        return res.status(404).send("Users not found");
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static getUserById = async (req, res) => {
    try {
      const userRepository = AppDataSource.getRepository("user");
      const user = await userRepository.findOne({
        where: { id: req.params.id },
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static createUser = async (req, res) => {
    try {
      const userRepository = AppDataSource.getRepository("user");
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const users = await userRepository.save({
        ...req.body,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: users.id }, jwtSecret, { expiresIn: "1h" });
      users.token = token;
      await userRepository.save(users);
      return res.status(201).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  };

  static updateUser = async (req, res) => {
    try {
      const userRepository = AppDataSource.getRepository("user");
      const user = await userRepository.findOne({
        where: { id: req.params.id },
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      const updatedUser = await userRepository.save({ ...user, ...req.body });
      return res.status(203).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const userRepository = AppDataSource.getRepository("user");
      const user = await userRepository.findOne({
        where: { id: req.params.id },
      });
      if (!user) {
        return res.status(404).send("User not found");
      }
      await userRepository.remove(user);
      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  };
  static login = async (req, res) => {
    try {
      const userRepository = AppDataSource.getRepository("user");
      const user = await userRepository.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        return res.status(401).send("Invalid email");
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).send("Invalid password");
      }
      const token = jwt.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      return res.status(200).json({ accessToken: token, user: user });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
}

module.exports = UserController;
