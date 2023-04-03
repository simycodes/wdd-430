const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
   maxMealId: { 
    type: String,
    required: true
   }
});

module.exports = mongoose.model('Sequence', sequenceSchema);