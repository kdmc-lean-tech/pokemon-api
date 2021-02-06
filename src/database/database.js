const mongoose = require('mongoose');

class Database {
  connect(url) {
    mongoose.connect(url, {
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }).then(() => console.log(`Databse Online`))
      .catch(err => console.log(`Databse Error -> ${ err }`));
  }
}

module.exports = {
  Database
}
