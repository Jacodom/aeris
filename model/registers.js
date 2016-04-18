const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EsquemaRegisters = new Schema({
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
        catarro: {
            type: Number,
            required: true
        }
    }],
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Persons',
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
})

// Guarda cuando fue creado y cuando fue actualizado 
EsquemaRegisters.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});





module.exports = mongoose.model('Registers', EsquemaRegisters);