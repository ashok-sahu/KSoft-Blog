const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const app = express();

const header_middleware = require("./middlewares/Headers.middleware");
const routes = require("./routes/routes");

//all middlewares
app.enable("trust proxy");
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(compression());
app.use(header_middleware);
app.use(helmet());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(routes);

module.exports = app;
