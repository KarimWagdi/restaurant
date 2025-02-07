const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Password@12345",
  database: "restaurant",
  synchronize: true,
  logging: false,
  entities: [__dirname + "/../entity/*.js"],
  migrations: [],
  subscribers: [],
});

module.exports = { AppDataSource };
