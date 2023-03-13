const express = require('express');
const { model } = require('mongoose');
const router = express.Router();

//import the model Thing
const Thing = require('../models/thing');

//POST Request (add stuff)
router.post('/', (req, res, next) => {
    const thing = new Thing({
        title : req.body.title,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        price : req.body.price,
        userId : req.body.userId
    });
    thing.save()
    .then(() => {
        res.status(201).json({
            message : 'Stuff added successfully!'
        });
    })
    .catch((error) => {
        res.status(400).json({
            error : error
        });
    }); 
});
//Get Request (Get stuffs)
router.get('/', (req, res, next) => {
   Thing.find()
   .then((things) => {
        res.status(200).json(things);
    })
    .catch((error) => {
        res.status(400).json({
            error : error
        });
    }); 
});
//Retrieve a Specific object
router.get('/:id', (req, res, next) => {
    Thing.findOne({_id : req.params.id})
    .then((thing) => {
         res.status(200).json(thing);
     })
     .catch((error) => {
         res.status(404).json({
             error : error
         });
     }); 
 });
// Update an existing thing object
router.put('/:id', (req, res, next) => {
    const thing = new Thing({
        _id : req.params.id,
        title : req.body.title,
        description : req.body.description,
        imageUrl : req.body.imageUrl,
        price : req.body.price,
        userId : req.body.userId
    });
    Thing.updateOne({_id: req.params.id}, thing)
    .then(() => {
        res.status(201).json({
            message : 'Stuff updated successfully!'
        }); 
    })
    .catch((error) => {
        res.status(400).json({
            error : error
        });
    }); 
});
// Delete an existing thing object
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({_id : req.params.id})
    .then(() => {
        res.status(201).json({
            message : 'Stuff deleted successfully!'
        }); 
    })
    .catch((error) => {
        res.status(400).json({
            error : error
        });
    }); 
});

module.exports = router;