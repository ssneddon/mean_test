var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var personaSchema = new Schema({

    personaDetails: {
        type: Object
    }
});

module.exports = personaSchema;
