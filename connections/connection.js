const mongoose = require("mongoose");
function mongoDbConnection(URL) {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("mongoDb connected succesfully");
    })
    .catch((err) => {
      console.log("error in connecting database", err);
    });
}

module.exports = { mongoDbConnection };
