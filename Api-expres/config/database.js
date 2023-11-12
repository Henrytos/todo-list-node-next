const mongoose = require("mongoose");

const url = "mongodb://localhost/todo-list-express";
mongoose.Promise = global.Promise;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conectado ao MongoDb");
  })
  .catch((err) => {
    console.log("erro ao conectar ao MongoDb: " + err);
  });
