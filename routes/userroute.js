const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Users = mongoose.model("Users");
router.get("/", (req, res) => {
  res.send("Api is Running");
});
router.post("/users", (req, res) => {
  const body = req.body;
  try {
    const user = new Users(body);
    user.save().then((result) => {
      res.json({ post: result });
    });
  } catch (error) {
    res.json({ message: "post unsuccessfull" });
  }
});
router.get("/users", async (req, res) => {
  try {
    const user = await Users.find();
    res.json(user);
  } catch (error) {
    res.json({ message: "post unsuccessfull" });
  }
});
router.get("/users/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.put("/inbox", async (req, res) => {
  const _id = req.body._id;
  const inbox = req.body.inbox;
  try {
    await Users.findByIdAndUpdate(_id, {
      $push: {
        inbox: inbox
      }
    }).then((result) => res.json({ result: result }));
  } catch (err) {
    res.json({ err: err.message });
  }
});
router.put("/sentbox", async (req, res) => {
  const _id = req.body._id;
  const sentbox = req.body.sentbox;
  try {
    await Users.findByIdAndUpdate(_id, {
      $push: {
        sentbox: sentbox
      }
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
