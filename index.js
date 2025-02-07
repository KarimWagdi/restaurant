const express = require("express");
const {AppDataSource} = require("./src/dbConfig/data-source")
const router = require("./src/Routes/index");
const app = express();

app.use(express.json());
const port = 3000;
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(port, (req, res) => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
app.use("/api", router);

