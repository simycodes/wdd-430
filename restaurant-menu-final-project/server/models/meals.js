const mongoose = require('mongoose');

const mealSchema = mongoose.Schema({
   id: { 
    type: String,
    required: true
   },
   name: { 
    type: String,
    required: true
   },
   price: { 
    type: String,
    required: true 
   },
   category: { 
    type: String,
   },
   imageUrl: { 
    type: String,
   },
   description: {
    type: String
   }
});

module.exports = mongoose.model('Meal', mealSchema);
