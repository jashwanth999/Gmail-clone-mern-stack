const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("./models/User");
require("./models/favouritemode");
app.use(require("./routes/userroute"));
app.use(require("./routes/favourite"));
mongoose
  .connect(
    "mongodb+srv://jash:jash@cluster0.l1lts.mongodb.net/todo?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then((res) => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("server is runnnig");
});
