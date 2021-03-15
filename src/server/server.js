const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const http = require('http');
const { keys } = require('../config/keys.config');
const { Database } = require('../database/database');
const { Sockets } = require('../shared/sockets/sockets');
const { init } = require('../routes/router');
const socketio = require('socket.io');
const path = require('path');
const { startCrons } = require('../shared/crons/index');

const origin = {
  origin: '*',
  credentials: true
};

class Server {
  constructor() {
    this.port = keys.get('PORT') || 3000;
    this.app = express();
    this.database = new Database();
    this.server = http.createServer(this.app);
    this.io = socketio(this.server, { /**/ });
    this.middlewares();
    this.initDatabse();
    this.initRoutes();
    this.initCrons();
  }

  initDatabse() {
    this.database.connect(keys.get('MONGO_URI'));
  }

  socketsConfiguration() {
    new Sockets(this.io);
  }

  initRoutes() {
    init(this.app);
  }

  initCrons() {
    startCrons();
  }

  middlewares() {
    this.app.use(cors(origin));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(fileUpload());
    this.app.use(express.static(path.resolve(__dirname, '../../public')));
  }

  execute(callback) {
    this.socketsConfiguration();
    this.server.listen(this.port, callback(this.port));
  }
}

module.exports = {
  Server
}
