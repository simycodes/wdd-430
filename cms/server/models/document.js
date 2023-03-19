const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: {
     type: String,
     required: true 
   },
   name: { 
    type: String,
    required: true
   },
   description: { 
    type: String
   },
   url: { 
    type: String,
    required: true 
   },
   children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
   // The children property in the documents collection is an array of child documents
   // that are related to the document.
});

module.exports = mongoose.model('Document', documentSchema);