const mongoose = require("mongoose");
const Users = mongoose.Schema({
  _id: String,
  username: String,
  password: String,
  email: String,
  inbox: [
    {
      fromname: String,
      frommail: String,
      subject: String,
      messagebox: String,
      userid: String,
      timestamp: String
    }
  ],
  sentbox: [
    {
      toname: String,
      tomail: String,
      subject: String,
      messagebox: String,
      userid: String,
      timestamp: String
    }
  ]
});
mongoose.model("Users", Users);
