const express = require("express");
const router = express.Router();

router.post("/resetpassword", (req, res) => {
  res.end();
});

module.exports = router;
