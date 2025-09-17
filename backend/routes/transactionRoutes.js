const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addTransaction, getTransactions } = require("../controllers/transactionController");

// Protected routes
router.post("/add", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);

module.exports = router;
