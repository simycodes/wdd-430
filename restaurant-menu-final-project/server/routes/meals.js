var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Meal = require('../models/meals');

// GET ALL MEALS
router.get('/', (req, res, next) => {
  Meal.find().then(meals => {
      res.status(200).json(meals);
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  // get a unique value to assign to the meal id property
  const maxMealId = sequenceGenerator.nextId("meals");
  // CREATE NEW MEAL
  const meal = new Meal({
    id: maxMealId,
    name: req.body.name,
    price: req.body.price,
    category: req.body.phone,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
  });
  // SAVE THE NEW MEAL
  meal.save().then(createdMeal => {
      res.status(201).json({
        message: 'Meal added successfully',
        meal: createdMeal
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
  Meal.findOne({ id: req.params.id }).then(meal => {
    meal.name = req.body.name,
    meal.price = req.body.price,
    meal.category = req.body.phone,
    meal.imageUrl = req.body.imageUrl,
    meal.description = req.body.description,
      // UPDATE THE DOCUMENT
      Meal.updateOne({ id: req.params.id }, meal).then(result => {
          res.status(204).json({
            message: 'Meal updated successfully'
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
        message: 'Meal not found.',
        error: { meal: 'Meal not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  // console.log("delete api");
  Meal.findOne({ id: req.params.id }).then(meal => {
      Meal.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Meal deleted successfully"
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
        message: 'Meal not found.',
        error: { meal: 'Meal not found'}
      });
    });
});


module.exports = router;