const User = require('../models/User');
var path    = require("path");

/**
 * GET /
 * Home page.
 */
exports.payments = (req, res) => {
  function addPaymentMethod(){
    User.findById(req.user.id, (err, user) => {
      if (err) { return next(err); }
      user.paymentMethods = [];
      user.save((err) => {
        if (err) {
          if (err.code === 11000) {
            req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
            // return res.redirect('/payments');
          }
          return next(err);
        }
        req.flash('success', { msg: 'Payment Method has been updated.' });
        // res.redirect('/payments');
      });
    });
  };
  // addPaymentMethod();
  // res.render('payments', {
  //   title: 'Payments'
  // });
  res.sendFile(path.join(__dirname+'/views/payments.html'));
};

exports.addPaymentMethod = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.paymentMethods.push(req.body);
    // user.paymentMethods = [];
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          // return res.redirect('/payments');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Payment Method has been updated.' });
      // res.redirect('/payments');
      res.json(user.paymentMethods);
    });
  });
};

exports.getCards = (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    res.json(user.paymentMethods);
  });
};

exports.makePayment = (req, res) => {
  res.sendFile(path.join(__dirname+'/views/make-payments.html'));
};