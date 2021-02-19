const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Fav = mongoose.model("Favourites");
router.post("/fav", (req, res) => {
  const body = req.body;
  try {
    const fav = new Fav(body);
    fav.save().then((result) => {
      res.json({ post: result });
    });
  } catch (error) {
    res.json({ message: "post unsuccessfull" });
  }
});
router.get("/fav", async (req, res) => {
  try {
    const fav = await Fav.find();
    res.json(fav);
  } catch (error) {
    res.json({ message: "post unsuccessfull" });
  }
});

module.exports = router;
