require("dotenv").config();
const colors = require("colors");
const app = require("./server/app");
const { staticConfig } = require("./server/config/static.config");
const { databaseConnection } = require("./server/config/database.config");
const PORT = process.env.PORT || 9090;

//configurations
databaseConnection();
staticConfig();

app.listen(PORT, () => {
  console.log(
    `server is listening on port http://localhost:${PORT}`.bgYellow.white.bold
  );
});
