const Transaction = require("../models/Transaction");

// Add a transaction
const addTransaction = async (req, res) => {
  try {
    const { amount, category, type } = req.body;
    const newTransaction = new Transaction({
      amount,
      category,
      type,
      user: req.user.id
    });
    await newTransaction.save();
    res.json({ message: "Transaction added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all transactions for logged-in user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addTransaction, getTransactions };
