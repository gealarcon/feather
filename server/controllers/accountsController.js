const db = require('../config/pg-config');
const { v4: uuidv4 } = require('uuid');
const account_types_id = require('../constants/account_types_id');

const accountsController = {};

accountsController.createAccount = (req, res, next) => {
  const account_id = uuidv4();

  const { type, description, balance, rate } = req.body;

  const createAccountQueryString = `INSERT INTO "public"."Accounts" VALUES (
    '${account_id}',
    '${res.locals.user._id}',
    '${account_types_id[type]}',
    '${description}',
    '${balance}',
    '${rate}'
  );`;

  db.query(createAccountQueryString)
    .then(results => {
      console.log(`Response from Creating Account `, results);
      return next();
    })
    .catch(err => {
      console.log('Error caught in accountsController.createAccount', err);
      return next({
        error_message: {error_message: 'Cannot create account! Check server log for details.'},
        error: err,
      });
    });
};

accountsController.getAccountId = (req, res, next) => {
  const {
    user_id, //id of the user logged in. Use id to reference which account id to use
    type, //account associate with transaction LET FRONT END KNOW TO INCLUDE!!!
  } = req.body;

  const getAccountIdQueryString = `
    SELECT description, _id 
    FROM "public"."Accounts" 
    WHERE account_types_id = '${account_types_id[type]}' AND user_id = '${user_id}';`;

  db.query(getAccountIdQueryString)
    .then(results => {
      res.locals.account_id = results.rows[0]._id;
      return next();
    })
    .catch(err => {
      console.log('Error caught in accountsController.getAccountId', err);
      return next({
        error_message: {error_message: 'Cannot create account! Check server log for details.'},
        error: err,
      });
    });
};

module.exports = accountsController;
