var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

// sequence generator generates unique id values each time a document, message, 
// and contact is added to a collection in the MongoDB database
// The SequenceGenerator() constructor function queries the Sequences collection in the
// database to get the maximum id generated value for the contacts, messages, and
// documents collections.
function SequenceGenerator() {
  Sequence.findOne().exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxDocumentId = sequence.maxDocumentId;
      maxMessageId = sequence.maxMessageId;
      maxContactId = sequence.maxContactId;
    });
}

// This function increments the maximum id for the specified collectionType and then
// updates the Sequence object in the sequences collection with the new maximum id value.
SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();
