const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { keys } = require('../config/keys.config');
const { Database } = require('../database/database');
const { init } = require('../routes/router');

class Server {
  constructor() {
    this.port = keys.get('PORT') || 3000;
    this.app = express();
    this.database = new Database();
    this.initDatabse();
    this.middlewares();
    this.initRoutes();
  }

  initDatabse() {
    this.database.connect(keys.get('MONGO_URI'));
  }

  initRoutes() {
    init(this.app);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(fileUpload());
  }

  execute(callback) {
    this.app.listen(this.port, callback(this.port));
  }
}

module.exports = {
  Server
}
