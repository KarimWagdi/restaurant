const jwt = require("jsonwebtoken");
const jwtSecret = "jwt-secret";
const { AppDataSource } = require("../dbConfig/data-source");

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization.split(" ")[1];
    console.log("Authorization Header:", authorization);

    if (!authorization) {
      console.log("No token provided");
      return res.status(401).send({ error: "No Token Provided" });
    }

    const data = jwt.verify(authorization, jwtSecret);
    if (!data) {
      console.log("Invalid token");
      return res.status(401).send({ error: "Invalid Token" });
    }

    const userRepository = AppDataSource.getRepository("user");
    const user = await userRepository.findOne({
      where: { id: data.userId },
    });

    if (!user) {
      console.log("User not found");
      return res.status(401).send({ error: "User not found" });
    }

    req.user = user;
    console.log("Authenticated user:", user);
    next();
  } catch (error) {
    console.log("Authentication error:", error.message);
    return res.status(401).json({ error: "failed to authenticate token" });
  }
};

module.exports = auth;
