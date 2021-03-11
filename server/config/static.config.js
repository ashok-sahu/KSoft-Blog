const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = require("../app");

exports.staticConfig = () => {
  if (process.env.NODE_ENV === "production") {
    app.use(cors());
    app.options("*", cors());
    app.use(express.static(path.join(__dirname, "../../client/build")));
    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "../../client", "build", "index.html")
      );
    });
  } else {
    app.use(
      cors({
        origin: process.env.BASE_CLIENT_URL,
      })
    );
    app.use(morgan("dev"));
    app.use(express.static(path.join(__dirname, "../../client/build")));
    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "../../client", "build", "index.html")
      );
    });
  }
};
