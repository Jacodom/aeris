'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Register = mongoose.model('Register'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Register
 */
exports.create = function(req, res) {
  var register = new Register(req.body);
  register.user = req.user;

  register.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(register);
    }
  });
};

/**
 * Show the current Register
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var register = req.register ? req.register.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  register.isCurrentUserOwner = req.user && register.user && register.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(register);
};

/**
 * Update a Register
 */
exports.update = function(req, res) {
  var register = req.register ;

  register = _.extend(register , req.body);

  register.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(register);
    }
  });
};

/**
 * Delete an Register
 */
exports.delete = function(req, res) {
  var register = req.register ;

  register.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(register);
    }
  });
};

/**
 * List of Registers
 */
exports.list = function(req, res) {
  Register.find().sort('-created').populate('user', 'displayName').exec(function(err, registers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(registers);
    }
  });
};

/**
 * Register middleware
 */
exports.registerByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Register is invalid'
    });
  }

  Register.findById(id).populate('user', 'displayName').exec(function (err, register) {
    if (err) {
      return next(err);
    } else if (!register) {
      return res.status(404).send({
        message: 'No Register with that identifier has been found'
      });
    }
    req.register = register;
    next();
  });
};
