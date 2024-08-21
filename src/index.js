const express = require("express");

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.express.use(express.json());
  }
  //Rotas da API
  routes() {
    this.express.get("/health/", (req, res) => {
      res.send({ status: "Sprint1" });
    });
  }
}

module.exports = new AppController().express;
