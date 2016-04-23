'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Register Schema
 */
var EsquemaRegisters = new Schema({
  sintomas: [{
    tos: {
      type: Number,
      required: true
    },
    dificultadRespiratoria: {
      type: Number,
      required: true
    },
    estornudos: {
      type: Number,
      required: true
    },
    sibilancia: {
      type: Number,
      required: true
    },
    obstruccionNasal: {
      type: Number,
      required: true
    },
    ardorOjos: {
      type: Number,
      required: true
    },
    catarro: {
      type: Number,
      required: true
    },
    mucosidad: {
      type: Number,
      required: true
    }
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
});

 // Guarda cuando fue creado y cuando fue actualizado
EsquemaRegisters.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

mongoose.model('Register', EsquemaRegisters);

//module.exports = mongoose.model('Registers', EsquemaRegisters);
