var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contacts');

router.get('/', (req, res, next) => {
// Daisy-chain the populate() method to the find() method as shown below. Mongoose 
// will automatically find the Contact objects in the database whose _id property 
// equals the value of the ObjectId values listed in the group property and replace
// the ObjectId values with the Contact objects found when this method is called.
  Contact.find().populate('group')
    .then(contacts => {
      res.status(200).json(contacts);
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  // get a unique value to assign to the contacts id property
  const maxContactId = sequenceGenerator.nextId("contacts");
  // CREATE NEW CONTACT
  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    groupsC: req.body.groupsC,
  });
  // SAVE THE NEW CONTACT
  contact.save().then(createdContact => {
      res.status(201).json({
        message: 'Contact added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
       res.status(500).json({
          message: 'An error occurred',
          error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id }).then(contact => {
    contact.name = req.body.name,
    contact.email = req.body.email,
    contact.phone = req.body.phone,
    contact.imageUrl = req.body.imageUrl,
    contact.groupsC = req.body.groupsC,
      // UPDATE THE DOCUMENT
      Contact.updateOne({ id: req.params.id }, contact).then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  console.log("delete api");
  Contact.findOne({ id: req.params.id }).then(contact => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found'}
      });
    });
});


module.exports = router;