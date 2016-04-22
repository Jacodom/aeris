'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
 // Map = mongoose.model('Map'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Map
 */
exports.create = function(req, res) {
  var map = new Map(req.body);
  map.user = req.user;

  map.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(map);
    }
  });
};

/**
 * Show the current Map
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var map = req.map ? req.map.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  map.isCurrentUserOwner = req.user && map.user && map.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(map);
};

/**
 * Update a Map
 */
exports.update = function(req, res) {
  var map = req.map ;

  map = _.extend(map , req.body);

  map.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(map);
    }
  });
};

/**
 * Delete an Map
 */
exports.delete = function(req, res) {
  var map = req.map ;

  map.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(map);
    }
  });
};

/**
 * List of Maps
 */
exports.list = function(req, res) { 
  Map.find().sort('-created').populate('user', 'displayName').exec(function(err, maps) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(maps);
    }
  });
};

/**
 * Map middleware
 */
exports.mapByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Map is invalid'
    });
  }

  Map.findById(id).populate('user', 'displayName').exec(function (err, map) {
    if (err) {
      return next(err);
    } else if (!map) {
      return res.status(404).send({
        message: 'No Map with that identifier has been found'
      });
    }
    req.map = map;
    next();
  });
};
