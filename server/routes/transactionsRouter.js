const express = require('express');
const transactionsController = require('../controllers/transactionsController');
const categoryController = require('../controllers/categoryController');
const accountsController = require('../controllers/accountsController');
const authController = require('../controllers/authController');
const router = express.Router();

//post

router.post(
  '/post',
  categoryController.getCategoryId,
  // accountsController.getAccountId,
  // transactionsController.postTransactions,

  (req, res) => {
    res.status(200).json(req.body);
  }
);

router.post(
  '/getAll',
  // authController.verifyToken,
  accountsController.getAccountId,
  transactionsController.getAllTransactions,

  (req, res) => {
    res.status(200).json(res.locals.transactions);
  }
);

module.exports = router;
