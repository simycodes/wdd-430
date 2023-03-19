var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');


router.get('/', (req, res, next) => {
    Message.find().then(messages => {
      res.status(200).json(messages);
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  // get a unique value to assign to the messages id property
  const maxMessageId = sequenceGenerator.nextId("messages");
  // CREATE NEW MESSAGE
  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });
  // SAVE THE NEW DOCUMENT
  message.save().then(createdMessage => {
      res.status(201).json({
        message: 'Document added successfully',
        message: createdMessage
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
  // get the value of the id request parameter from the HTTP request and then call 
  // the mongoose findOne() method on the documents collection
  Message.findOne({ id: req.params.id }).then(message => {
    message.subject = req.body.subject,
    message.msgText = req.body.msgText,
      // UPDATE THE MESSAGE
      Message.updateOne({ id: req.params.id }, message).then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
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
        message: 'Message not found.',
        error: { document: 'Message not found'}
      });
    });
});


router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      Message.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
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
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});

module.exports = router;