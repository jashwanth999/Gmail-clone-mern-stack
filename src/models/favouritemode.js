const mongoose = require("mongoose");
const Fav = mongoose.Schema({
  _id: String,
  fromname: String,
  subject: String,
  message: String,
  userid: String
});
mongoose.model("Favourites", Fav);
