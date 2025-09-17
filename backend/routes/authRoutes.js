const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authcontroller");

// ✅ Public routes — no middleware
router.post("/register", registerUser);
router.post("/login", loginUser);

// Optional test route
router.get("/test", (req, res) => res.send("Auth route working ✅"));

module.exports = router;
