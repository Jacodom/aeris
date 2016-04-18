const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EsquemaPerson = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nombre: {
        type: String
    },
    direccion:{
        type: String
    },
    sexo: {
        type: String,
        enum: ['hombre', 'mujer', 'otro']
    },
    enfermedadesCronicas: {
        type: String,
        enum: ['asma', 'epoc', 'broncoespasmo']
    },
    fuma: {
        type: Boolean,
        default: false
    },
    alergico: {
        type: Boolean,
        default: false
    },
    trabajoPeligroso: {
        type: Boolean,
        default: false
    },
    hipertiroides: {
        type: Boolean,
        default: false
    },
    celiaco: {
        type: Boolean,
        default: false
    },
    diabetes: {
        tiene: {
            type: Boolean,
            default: false
        },
        tipo: {
            type: Number,
            enum: [1,2,3]
        }
    },
    avatar: {
        type: String,
        default: 'https://api.adorable.io/avatars/120/crazy@adorable.png'
    },
    pos: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        }
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})


EsquemaPerson.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

EsquemaPerson.statics.newUser = function (user, cb)  {
    const newUser = new this(user);
    newUser.save(cb)
}


module.exports = mongoose.model('Persons', EsquemaPerson);
debug('Load')