'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Register Schema
 */
var RegisterSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Register name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Register', RegisterSchema);
